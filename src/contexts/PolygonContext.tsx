import React, {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import {
  createPolygonApi,
  deletePolygonApi,
  fetchPolygonsApi,
} from "../api/polygonApi";
import { Point, Polygon } from "../types";

type PolygonContextType = {
  polygons: Array<Polygon>;
  fetchLoading: boolean;
  createPolygon: () => Promise<void>;
  deletePolygon: () => Promise<void>;
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  polygonToDelete: Polygon | null;
  selectPolygonToDelete: (polygon: Polygon) => void;
  closeDeleteModal: () => void;
  deleteLoading: boolean;
  newPolygonName: string;
  setNewPolygonName: (value: string) => void;
  pointsWithIds: Array<{ id: number; point: Point }>;
  saveLoading: boolean;
  addPoint: (newPoint?: Point) => void;
  removePoint: (id: number) => void;
  editPoint: (id: number, updatedValue: Point) => void;
};

const PolygonContext = createContext<PolygonContextType | undefined>(undefined);

export const PolygonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [polygons, setPolygons] = useState<Array<Polygon>>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [polygonToDelete, setPolygonToDelete] = useState<Polygon | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [newPolygonName, setNewPolygonName] = useState("");
  const [pointsWithIds, setPointsWithIds] = useState<
    Array<{ id: number; point: Point }>
  >([]);
  const [saveLoading, setSaveLoading] = useState(false);

  const createPolygon = useCallback<
    PolygonContextType["createPolygon"]
  >(async () => {
    setSaveLoading(true);
    try {
      const newPolygon = await createPolygonApi({
        name: newPolygonName,
        points: pointsWithIds.map((item) => item.point),
      });

      setPolygons((oldValue) => [...oldValue, newPolygon]);
      setIsCreateModalOpen(false);
      toast.success("New polygon created!", { autoClose: 2500 });
      setPointsWithIds([]);
      setNewPolygonName("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
    setSaveLoading(false);
  }, [newPolygonName, pointsWithIds]);

  const closeDeleteModal = useCallback(() => setPolygonToDelete(null), []);

  const deletePolygon = useCallback<
    PolygonContextType["deletePolygon"]
  >(async () => {
    if (!polygonToDelete) {
      return;
    }
    try {
      setDeleteLoading(true);
      await deletePolygonApi(polygonToDelete._id);

      setPolygons((oldValue) =>
        oldValue.filter((polygon) => polygon._id !== polygonToDelete._id)
      );
      closeDeleteModal();
    } catch (err) {
      console.error(err);
    }
    setDeleteLoading(false);
  }, [polygonToDelete, closeDeleteModal]);

  const addPoint = useCallback<PolygonContextType["addPoint"]>(
    (newPoint = [0, 0]) => {
      setPointsWithIds((oldPoints) => [
        ...oldPoints,
        { id: Date.now(), point: newPoint },
      ]);
    },
    []
  );

  const removePoint = useCallback<PolygonContextType["removePoint"]>((id) => {
    setPointsWithIds((oldValue) => oldValue.filter((item) => item.id !== id));
  }, []);

  const editPoint = useCallback<PolygonContextType["editPoint"]>(
    (id, updatedValue) => {
      setPointsWithIds((oldValue) =>
        oldValue.map((item) =>
          item.id === id ? { id, point: updatedValue } : item
        )
      );
    },
    []
  );

  useEffect(() => {
    setFetchLoading(true);
    fetchPolygonsApi()
      .then(setPolygons)
      .finally(() => setFetchLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      polygons,
      fetchLoading,
      createPolygon,
      deletePolygon,
      isCreateModalOpen,
      openCreateModal: () => setIsCreateModalOpen(true),
      closeCreateModal: () => {
        setIsCreateModalOpen(false);
        setPointsWithIds([]);
        setNewPolygonName("");
      },
      polygonToDelete,
      selectPolygonToDelete: setPolygonToDelete,
      closeDeleteModal,
      deleteLoading,
      newPolygonName,
      setNewPolygonName,
      pointsWithIds,
      saveLoading,
      addPoint,
      removePoint,
      editPoint,
    }),
    [
      polygons,
      fetchLoading,
      createPolygon,
      deletePolygon,
      isCreateModalOpen,
      polygonToDelete,
      closeDeleteModal,
      deleteLoading,
      newPolygonName,
      pointsWithIds,
      saveLoading,
      addPoint,
      removePoint,
      editPoint,
    ]
  );

  return (
    <PolygonContext.Provider value={value}>{children}</PolygonContext.Provider>
  );
};

export function usePolygonContext() {
  const context = useContext(PolygonContext);
  if (!context) {
    throw new Error("usePolygonContext must be used within a PolygonProvider");
  }
  return context;
}
