import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PolygonGrid from "./PolygonGrid/PolygonGrid";
import CreatePolygonModal from "./CreatePolygonModal/CreatePolygonModal";
import Loader from "./components/Loader";
import PlusIcon from "./assets/plus.svg?react";
import {
  createPolygonApi,
  deletePolygonApi,
  fetchPolygonsApi,
} from "./api/polygonApi";
import { Polygon } from "./types";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [polygons, setPolygons] = useState<Array<Polygon>>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const createPolygon = async (data: Omit<Polygon, "_id">) => {
    try {
      const newPolygon = await createPolygonApi(data);

      setPolygons((oldValue) => [...oldValue, newPolygon]);
      setCreateModalOpen(false);
      toast.success("New polygon created!", { autoClose: 2500 });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      throw err;
    }
  };

  const deletePolygon = async (id: string) => {
    await deletePolygonApi(id);

    setPolygons((oldValue) => oldValue.filter((polygon) => polygon._id !== id));
  };

  useEffect(() => {
    setLoading(true);
    fetchPolygonsApi()
      .then(setPolygons)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Polygon Manager</h1>
      <button onClick={() => setCreateModalOpen(true)}>
        <PlusIcon />
        Add polygon
      </button>
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <PolygonGrid polygons={polygons} onDelete={deletePolygon} />
      )}
      <CreatePolygonModal
        open={createModalOpen}
        onSave={createPolygon}
        onCancel={() => setCreateModalOpen(false)}
      />
      <ToastContainer hideProgressBar />
    </>
  );
}

export default App;
