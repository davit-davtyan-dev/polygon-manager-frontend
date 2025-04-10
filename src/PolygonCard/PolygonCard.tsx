import PolygonCanvas from "../PolygonCanvas/PolygonCanvas";
import TrashBinIcon from "../assets/trash-bin.svg?react";
import { Polygon } from "../types";
import "./PolygonCard.css";

type PolygonCardProps = {
  polygon: Polygon;
  onDelete: () => void;
};

export default function PolygonCard(props: PolygonCardProps) {
  return (
    <div className="card-container">
      <div className="card-header">
        {props.polygon.name}
        <button onClick={() => props.onDelete()}>
          <TrashBinIcon width={16} height={16} />
        </button>
      </div>
      <div className="canvas-container">
        <PolygonCanvas points={props.polygon.points} />
      </div>
    </div>
  );
}
