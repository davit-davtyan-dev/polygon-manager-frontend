import { useEffect, useRef, useState } from "react";
import { DeleteButtonRect, Mode, Point } from "../types";
import { usePolygonContext } from "../contexts/PolygonContext";
import { draw, drawDeleteButton, isInsideRect } from "./polygonHelpers";
import {
  BACKGROUND_IMAGE_URL,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../constants";

export default function Canvas() {
  const {
    polygons,
    newPoints,
    addPoint,
    deleteButtons,
    mode,
    selectPolygonToDelete,
    setDeleteButtons,
  } = usePolygonContext();
  const ref = useRef<HTMLCanvasElement>(null);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const backgroundRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const context = ref.current?.getContext("2d");
    if (!context) {
      return;
    }
    const background = new Image();
    background.src = BACKGROUND_IMAGE_URL;

    backgroundRef.current = background;
    background.onload = function () {
      setBackgroundLoaded(true);
      context.drawImage(background, 0, 0);
    };
  }, []);

  useEffect(() => {
    const context = ref.current?.getContext("2d");
    if (!context || !backgroundLoaded) {
      return;
    }

    const newDeleteButtons: Array<DeleteButtonRect> = [];
    for (const polygon of polygons) {
      draw(context, polygon.points);
      if (mode === Mode.delete) {
        const buttonRect = drawDeleteButton(context, polygon);
        newDeleteButtons.push({ id: polygon._id, rect: buttonRect });
      }
    }
    setDeleteButtons(newDeleteButtons);

    if (mode === Mode.create) {
      draw(context, newPoints, "#00ff00");
    }

    return () => {
      context.lineWidth = 0;
      context.shadowColor = "none";
      context.strokeStyle = "none";
      context.shadowBlur = 0;

      if (backgroundRef.current) {
        context.drawImage(backgroundRef.current, 0, 0);
      }
    };
  }, [
    ref,
    polygons,
    backgroundLoaded,
    newPoints,
    backgroundRef,
    mode,
    setDeleteButtons,
  ]);

  const handleCanvasClick = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!backgroundLoaded) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const point: Point = [e.clientX - rect.left, e.clientY - rect.top];

    if (mode === Mode.delete) {
      const clickedButton = deleteButtons.find((item) =>
        isInsideRect(point, item.rect)
      );

      const polygon = polygons.find((p) => p._id === clickedButton?.id);
      if (polygon) {
        selectPolygonToDelete(polygon);
      }
      return;
    }

    addPoint(point);
  };

  return (
    <canvas
      ref={ref}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onClick={handleCanvasClick}
    />
  );
}
