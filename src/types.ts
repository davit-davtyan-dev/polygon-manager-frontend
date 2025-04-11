export type Point = [x: number, y: number];

export type Polygon = {
  _id: string;
  name: string;
  points: Array<Point>;
};

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DeleteButtonRect = {
  id: string;
  rect: Rect;
};

export enum Mode {
  create = "create",
  delete = "delete",
}
