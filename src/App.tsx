import { useEffect, useState } from "react";
import PolygonGrid from "./PolygonGrid/PolygonGrid";
import PlusIcon from "./assets/plus.svg?react";
import { deletePolygonApi, fetchPolygonsApi } from "./api/polygonApi";
import { Polygon } from "./types";
import "./App.css";

function App() {
  const [polygons, setPolygons] = useState<Array<Polygon>>([]);

  const deletePolygon = (id: string) => {
    deletePolygonApi(id).then(() => {
      setPolygons((oldValue) =>
        oldValue.filter((polygon) => polygon._id !== id)
      );
    });
  };

  useEffect(() => {
    fetchPolygonsApi().then(setPolygons);
  }, []);

  return (
    <>
      <h1>Polygon Manager</h1>
      <button>
        <PlusIcon />
        Add polygon
      </button>
      <PolygonGrid polygons={polygons} onDelete={deletePolygon} />
    </>
  );
}

export default App;
