import { useState } from "react";
import Modal from "../components/Modal";
import PolygonCard from "../PolygonCard/PolygonCard";
import { Polygon } from "../types";
import "./PolygonGrid.css";

type PolygonGridProps = {
  polygons: Array<Polygon>;
  onDelete: (id: string) => void;
};

export default function PolygonGrid(props: PolygonGridProps) {
  const [polygonToDelete, setPolygonToDelete] = useState<Polygon | null>(null);

  const closeDeleteModal = () => {
    setPolygonToDelete(null);
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => {
                  props.onDelete(polygonToDelete._id);
                  closeDeleteModal();
                }}
                style={{ backgroundColor: "#c23b22" }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  closeDeleteModal();
                }}
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
