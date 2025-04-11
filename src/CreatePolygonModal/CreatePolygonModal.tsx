import Modal from "../components/Modal";
import Loader from "../components/Loader";
import PolygonCanvas from "../PolygonCanvas/PolygonCanvas";
import SaveIcon from "../assets/save.svg?react";
import PlusIcon from "../assets/plus.svg?react";
import { usePolygonContext } from "../contexts/PolygonContext";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import "./CreatePolygonModal.css";

const CreatePolygonModal = () => {
  const {
    isCreateModalOpen,
    newPolygonName: name,
    setNewPolygonName: setName,
    pointsWithIds,
    addPoint,
    removePoint,
    editPoint,
    saveLoading,
    closeCreateModal,
    createPolygon,
  } = usePolygonContext();

  const points = pointsWithIds.map(({ point }) => point);

  return (
    <Modal open={isCreateModalOpen}>
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
                  editPoint(id, [Number(e.currentTarget.value), point[1]])
                }
              />
              <input
                type="number"
                value={point[1]}
                onChange={(e) =>
                  editPoint(id, [point[0], Number(e.currentTarget.value)])
                }
              />
              <button onClick={() => removePoint(id)}>x</button>
            </div>
          ))}
          <button className="add-point-button" onClick={() => addPoint([0, 0])}>
            <PlusIcon width={18} height={18} />
            Add point
          </button>
        </div>
        {isCreateModalOpen && (
          <PolygonCanvas
            points={points}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              addPoint([e.clientX - rect.left, e.clientY - rect.top]);
            }}
          />
        )}
      </div>
      <div className="create-modal-actions-container">
        <button onClick={createPolygon} className="save-polygon-button">
          {saveLoading ? (
            <Loader size={18} />
          ) : (
            <SaveIcon width={18} height={18} />
          )}
          Save
        </button>
        <button onClick={closeCreateModal}>Cancel</button>
      </div>
    </Modal>
  );
};

export default CreatePolygonModal;
