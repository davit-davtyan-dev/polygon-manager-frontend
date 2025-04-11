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
import { DeleteButtonRect, Mode, Point, Polygon } from "../types";

type PolygonContextType = {
  polygons: Array<Polygon>;
  fetchLoading: boolean;
  createPolygon: () => Promise<void>;
  deletePolygon: () => Promise<void>;
  polygonToDelete: Polygon | null;
  selectPolygonToDelete: (polygon: Polygon) => void;
  closeDeleteModal: () => void;
  deleteLoading: boolean;
  newPolygonName: string;
  setNewPolygonName: (value: string) => void;
  saveLoading: boolean;
  addPoint: (newPoint: Point) => void;
  revertLatestPoint: () => void;
  newPoints: Array<Point>;
  deleteButtons: Array<DeleteButtonRect>;
  setDeleteButtons: (value: Array<DeleteButtonRect>) => void;
  mode: Mode;
  setMode: (value: Mode) => void;
};

const PolygonContext = createContext<PolygonContextType | undefined>(undefined);

export const PolygonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PolygonContextType["mode"]>(Mode.create);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [polygons, setPolygons] = useState<PolygonContextType["polygons"]>([]);
  const [polygonToDelete, setPolygonToDelete] =
    useState<PolygonContextType["polygonToDelete"]>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [newPolygonName, setNewPolygonName] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [newPoints, setNewPoints] = useState<PolygonContextType["newPoints"]>(
    []
  );
  const [deleteButtons, setDeleteButtons] = useState<
    PolygonContextType["deleteButtons"]
  >([]);

  const createPolygon = useCallback<
    PolygonContextType["createPolygon"]
  >(async () => {
    setSaveLoading(true);
    try {
      const newPolygon = await createPolygonApi({
        name: newPolygonName,
        points: newPoints,
      });

      setPolygons((oldValue) => [...oldValue, newPolygon]);
      toast.success("New polygon created!", { autoClose: 2500 });
      setNewPoints([]);
      setNewPolygonName("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
    setSaveLoading(false);
  }, [newPolygonName, newPoints]);

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

  const addPoint = useCallback<PolygonContextType["addPoint"]>((newPoint) => {
    setNewPoints((oldPoints) => {
      return [...oldPoints, newPoint];
    });
  }, []);

  useEffect(() => {
    setFetchLoading(true);
    fetchPolygonsApi()
      .then(setPolygons)
      .finally(() => setFetchLoading(false));
  }, []);

  const value = useMemo<PolygonContextType>(
    () => ({
      polygons,
      fetchLoading,
      createPolygon,
      deletePolygon,
      polygonToDelete,
      selectPolygonToDelete: setPolygonToDelete,
      closeDeleteModal,
      deleteLoading,
      newPolygonName,
      setNewPolygonName,
      newPoints,
      saveLoading,
      addPoint,
      deleteButtons,
      setDeleteButtons,
      mode,
      setMode,
      revertLatestPoint: () =>
        setNewPoints((oldValue) => {
          const newValue = [...oldValue];
          newValue.pop();
          return newValue;
        }),
    }),
    [
      polygons,
      fetchLoading,
      createPolygon,
      deletePolygon,
      polygonToDelete,
      closeDeleteModal,
      deleteLoading,
      newPolygonName,
      newPoints,
      saveLoading,
      addPoint,
      deleteButtons,
      mode,
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
