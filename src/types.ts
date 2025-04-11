export type Point = [x: number, y: number];

export type Polygon = {
  _id: string;
  name: string;
  points: Array<Point>;
};
