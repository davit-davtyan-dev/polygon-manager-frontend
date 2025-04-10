import { useEffect, useRef } from "react";
import { Point } from "../types";

type PolygonCanvasProps = {
  points: Array<Point>;
};

export default function PolygonCanvas(props: PolygonCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = ref.current?.getContext("2d");
    if (!context) {
      return;
    }

    context.fillStyle = "#f00";
    context.beginPath();
    const [firstPoint, ...restPoints] = props.points;
    context.moveTo(firstPoint[0], firstPoint[1]);
    for (const point of restPoints) {
      context.lineTo(point[0], point[1]);
    }
    context.closePath();
    context.fill();
  }, [props.points]);

  return <canvas ref={ref} width={120} height={120} />;
}
