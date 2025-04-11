import { useState } from "react";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import PolygonCanvas from "../PolygonCanvas/PolygonCanvas";
import SaveIcon from "../assets/save.svg?react";
import PlusIcon from "../assets/plus.svg?react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { Point, Polygon } from "../types";
import "./CreatePolygonModal.css";

type CreatePolygonModalProps = {
  open: boolean;
  onSave: (data: Omit<Polygon, "_id">) => Promise<void>;
  onCancel: () => void;
};

const CreatePolygonModal = (props: CreatePolygonModalProps) => {
  const [name, setName] = useState("");
  const [pointsWithIds, setPointsWithIds] = useState<
    Array<{ id: number; point: Point }>
  >([]);
  const [saveLoading, setSaveLoading] = useState(false);

  const handlePointAdd = (newPoint: Point = [0, 0]) => {
    setPointsWithIds((oldPoints) => [
      ...oldPoints,
      { id: Date.now(), point: newPoint },
    ]);
  };

  const handlePointRemove = (id: number) => {
    setPointsWithIds((oldValue) => oldValue.filter((item) => item.id !== id));
  };

  const handlePointEdit = (id: number, updatedValue: Point) => {
    setPointsWithIds((oldValue) =>
      oldValue.map((item) =>
        item.id === id ? { id, point: updatedValue } : item
      )
    );
  };

  const handleCancel = () => {
    props.onCancel();
    setPointsWithIds([]);
    setName("");
  };

  const handlePolygonSave = async () => {
    setSaveLoading(true);
    await props.onSave({ name, points });
    setPointsWithIds([]);
    setName("");
    setSaveLoading(false);
  };

  const points = pointsWithIds.map(({ point }) => point);

  return (
    <Modal open={props.open}>
      <input
        placeholder="Polygon name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="polygon-name-input"
      />
      <small>Add points manually or click anywhere in the canvas</small>
      <div
        className="create-points-container"
        style={{ minWidth: CANVAS_WIDTH + 160 }}
      >
        <div className="points" style={{ maxHeight: CANVAS_HEIGHT }}>
          {pointsWithIds.map(({ id, point }) => (
            <div key={id} className="point-editor">
              <input
                type="number"
                value={point[0]}
                onChange={(e) =>
                  handlePointEdit(id, [Number(e.currentTarget.value), point[1]])
                }
              />
              <input
                type="number"
                value={point[1]}
                onChange={(e) =>
                  handlePointEdit(id, [point[0], Number(e.currentTarget.value)])
                }
              />
              <button onClick={() => handlePointRemove(id)}>x</button>
            </div>
          ))}
          <button
            className="add-point-button"
            onClick={() => handlePointAdd([0, 0])}
          >
            <PlusIcon width={18} height={18} />
            Add point
          </button>
        </div>
        {props.open && (
          <PolygonCanvas
            points={points}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              handlePointAdd([e.clientX - rect.left, e.clientY - rect.top]);
            }}
          />
        )}
      </div>
      <div className="create-modal-actions-container">
        <button onClick={handlePolygonSave} className="save-polygon-button">
          {saveLoading ? (
            <Loader size={18} />
          ) : (
            <SaveIcon width={18} height={18} />
          )}
          Save
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Modal>
  );
};

export default CreatePolygonModal;
