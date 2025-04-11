import { Point, Polygon, Rect } from "../types";

export function isInsideRect(point: Point, rect: Rect) {
  return (
    point[0] > rect.x &&
    point[0] < rect.x + rect.width &&
    point[1] < rect.y + rect.height &&
    point[1] > rect.y
  );
}

export function drawOnePoint(
  context: CanvasRenderingContext2D,
  points: Array<Point>
) {
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
}

export function drawLine(
  context: CanvasRenderingContext2D,
  points: Array<Point>
) {
  const [firstPoint, secondPoint] = points;

  context.beginPath();
  context.moveTo(firstPoint[0], firstPoint[1]);
  context.lineTo(secondPoint[0], secondPoint[1]);
  context.stroke();
}

export function drawPolygon(
  context: CanvasRenderingContext2D,
  points: Array<Point>
) {
  const [firstPoint, ...restPoints] = points;
  context.beginPath();
  context.moveTo(firstPoint[0], firstPoint[1]);
  for (const point of restPoints) {
    context.lineTo(point[0], point[1]);
  }
  context.closePath();
  context.fill();
}

export function draw(
  context: CanvasRenderingContext2D,
  points: Array<Point>,
  fillStyle = "#ff0000"
) {
  if (!points.length) {
    return;
  }

  context.fillStyle = fillStyle;
  if (points.length === 1) {
    drawOnePoint(context, points);
    return;
  }
  if (points.length === 2) {
    drawLine(context, points);
    return;
  }

  drawPolygon(context, points);
}

export function drawDeleteButton(
  context: CanvasRenderingContext2D,
  polygon: Polygon
) {
  const [topRightPoint] = [...polygon.points].sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] < b[0] ? -1 : 1;
    }
    return a[1] < b[1] ? -1 : 1;
  });

  const buttonRect = {
    x: topRightPoint[0] + 12,
    y: topRightPoint[1] - 12,
    width: 24,
    height: 24,
  };

  context.beginPath();
  context.rect(buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height);
  context.fillStyle = "rgba(225,225,225,0.5)";
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = "#000000";
  context.stroke();
  context.closePath();
  context.font = "24px";
  context.fillStyle = "#000000";
  context.fillText("X", buttonRect.x + 9, buttonRect.y + 16);

  return buttonRect;
}
