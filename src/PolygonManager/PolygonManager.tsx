import PolygonGrid from "../PolygonGrid/PolygonGrid";
import CreatePolygonModal from "../CreatePolygonModal/CreatePolygonModal";
import Loader from "../components/Loader";
import PlusIcon from "../assets/plus.svg?react";
import { usePolygonContext } from "../contexts/PolygonContext";
import "./PolygonManager.css";

const PolygonManager = () => {
  const { fetchLoading, openCreateModal } = usePolygonContext();

  return (
    <>
      <h1>Polygon Manager</h1>
      <button onClick={() => openCreateModal()}>
        <PlusIcon />
        Add polygon
      </button>
      {fetchLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <PolygonGrid />
      )}
      <CreatePolygonModal />
    </>
  );
};

export default PolygonManager;
