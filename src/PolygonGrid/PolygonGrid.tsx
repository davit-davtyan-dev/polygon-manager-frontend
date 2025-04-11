import { useState } from "react";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import PolygonCard from "../PolygonCard/PolygonCard";
import { Polygon } from "../types";
import "./PolygonGrid.css";

type PolygonGridProps = {
  polygons: Array<Polygon>;
  onDelete: (id: string) => Promise<void>;
};

export default function PolygonGrid(props: PolygonGridProps) {
  const [polygonToDelete, setPolygonToDelete] = useState<Polygon | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const closeDeleteModal = () => {
    setPolygonToDelete(null);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleteLoading(true);
      await props.onDelete(id);
      closeDeleteModal();
    } catch (err) {
      console.error(err);
    }
    setDeleteLoading(false);
  };

  return (
    <>
      <div className="polygon-grid-container">
        {props.polygons.map((polygon) => (
          <PolygonCard
            key={polygon._id}
            polygon={polygon}
            onDelete={() => setPolygonToDelete(polygon)}
          />
        ))}
      </div>
      <Modal open={!!polygonToDelete} onClose={closeDeleteModal}>
        {polygonToDelete && (
          <>
            <h3>Are you sure you want to delete {polygonToDelete.name}?</h3>
            <div className="delete-modal-actions-container">
              <button
                onClick={() => handleDelete(polygonToDelete._id)}
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
