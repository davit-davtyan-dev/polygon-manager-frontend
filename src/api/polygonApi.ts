import { Polygon } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function createPolygonApi(data: Polygon) {
  const reponse = await fetch(`${API_URL}/polygon`, {
    method: "post",
    body: JSON.stringify(data),
  });

  return reponse.json() as Promise<Polygon>;
}

export async function fetchPolygonsApi() {
  const reponse = await fetch(`${API_URL}/polygon`);

  return reponse.json() as Promise<Array<Polygon>>;
}

export function deletePolygonApi(id: string) {
  return fetch(`${API_URL}/polygon/${id}`, { method: "delete" });
}
