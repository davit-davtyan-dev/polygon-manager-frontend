import { useEffect, useRef } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { Point } from "../types";
import "./PolygonCanvas.css";

type PolygonCanvasProps = Omit<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  "width" | "height"
> & {
  points: Array<Point>;
};

export default function PolygonCanvas({
  points,
  ...canvasProps
}: PolygonCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = ref.current?.getContext("2d");
    const [firstPoint, ...restPoints] = points;
    if (!context || !firstPoint) {
      return;
    }

    context.fillStyle = "#ff0000";
    if (points.length < 3) {
      context.beginPath();
      for (const point of points) {
        context.moveTo(point[0], point[1]);
        context.arc(point[0], point[1], 4, 0, 2 * Math.PI, false);
      }
      context.fill();
      context.lineWidth = 2;
      context.shadowColor = "black";
      context.strokeStyle = `${context.fillStyle}88`;
      context.shadowBlur = 6;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;

      context.stroke();
    } else {
      context.beginPath();
      context.moveTo(firstPoint[0], firstPoint[1]);
      for (const point of restPoints) {
        context.lineTo(point[0], point[1]);
      }
      context.closePath();
      context.fill();
    }

    return () => {
      // NOTE: clear canvas before redrawing
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      context.lineWidth = 0;
      context.shadowColor = "none";
      context.strokeStyle = "none";
      context.shadowBlur = 0;
    };
  }, [ref, points]);

  return (
    <canvas
      ref={ref}
      className="canvas"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      {...canvasProps}
    />
  );
}
