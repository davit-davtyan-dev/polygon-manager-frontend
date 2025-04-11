import Canvas from "./Canvas";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import LoadingOverlay from "../components/LoadingOverlay";
import RadioButtonGroup from "../components/RadioButtonGroup";
import SaveIcon from "../assets/save.svg?react";
import RevertIcon from "../assets/revert.svg?react";
import { usePolygonContext } from "../contexts/PolygonContext";
import { Mode } from "../types";
import "./PolygonManager.css";

const PolygonManager = () => {
  const {
    fetchLoading,
    newPolygonName,
    setNewPolygonName,
    newPoints,
    polygonToDelete,
    deleteLoading,
    closeDeleteModal,
    deletePolygon,
    createPolygon,
    saveLoading,
    mode,
    setMode,
    revertLatestPoint,
  } = usePolygonContext();

  return (
    <LoadingOverlay loading={fetchLoading}>
      <h1>Polygon Manager</h1>
      <div>
        <RadioButtonGroup
          options={[
            { label: "Create", value: Mode.create, bgColor: "#80b577" },
            { label: "Delete", value: Mode.delete, bgColor: "#c23b22" },
          ]}
          selected={mode}
          onChange={setMode}
          disabled={deleteLoading || saveLoading}
        />
        {mode === Mode.create && (
          <div className="create-polygon-container">
            <input
              placeholder="New polygon name"
              value={newPolygonName}
              onChange={(e) => setNewPolygonName(e.target.value)}
              className="polygon-name-input"
            />
            <button
              onClick={createPolygon}
              disabled={saveLoading || newPoints.length < 3 || !newPolygonName}
              className="save-polygon-button"
            >
              {saveLoading ? (
                <Loader size={18} />
              ) : (
                <SaveIcon width={18} height={18} />
              )}
              Save
            </button>
            <button
              disabled={!newPoints.length}
              onClick={() => revertLatestPoint()}
            >
              <RevertIcon width={18} height={18} />
              Revert
            </button>
          </div>
        )}
        <div style={{ height: "100%", width: 1, backgroundColor: "gray" }} />
        <Canvas />
      </div>
      <Modal open={!!polygonToDelete} onClose={closeDeleteModal}>
        {polygonToDelete && (
          <>
            <h3>
              Are you sure you want to delete polygon "{polygonToDelete.name}"?
            </h3>
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
    </LoadingOverlay>
  );
};

export default PolygonManager;
