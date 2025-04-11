import Modal from "../components/Modal";
import Loader from "../components/Loader";
import PolygonCard from "../PolygonCard/PolygonCard";
import { usePolygonContext } from "../contexts/PolygonContext";
import "./PolygonGrid.css";

export default function PolygonGrid() {
  const {
    polygons,
    deletePolygon,
    selectPolygonToDelete,
    closeDeleteModal,
    polygonToDelete,
    deleteLoading,
  } = usePolygonContext();

  return (
    <>
      <div className="polygon-grid-container">
        {polygons.map((polygon) => (
          <PolygonCard
            key={polygon._id}
            polygon={polygon}
            onDelete={() => selectPolygonToDelete(polygon)}
          />
        ))}
      </div>
      <Modal open={!!polygonToDelete} onClose={closeDeleteModal}>
        {polygonToDelete && (
          <>
            <h3>Are you sure you want to delete {polygonToDelete.name}?</h3>
            <div className="delete-modal-actions-container">
              <button
                onClick={deletePolygon}
                className="confirm-delete-button"
                disabled={deleteLoading}
              >
                {deleteLoading && <Loader size={18} />}
                Yes
              </button>
              <button
                onClick={() => {
                  closeDeleteModal();
                }}
                disabled={deleteLoading}
              >
                No
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
