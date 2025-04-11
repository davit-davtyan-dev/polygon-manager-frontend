import { Polygon } from "../types";
import { handleResponse } from "./helpers";

const API_URL = import.meta.env.VITE_API_URL;

export async function createPolygonApi(data: Omit<Polygon, "_id">) {
  const response = await fetch(`${API_URL}/polygon`, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse<Polygon>(response);
}

export async function fetchPolygonsApi() {
  const response = await fetch(`${API_URL}/polygon`);

  return handleResponse<Array<Polygon>>(response);
}

export function deletePolygonApi(id: string) {
  return fetch(`${API_URL}/polygon/${id}`, { method: "delete" });
}
