export type Point = [number, number];

export type Polygon = {
  _id: string;
  name: string;
  points: Array<Point>;
};
