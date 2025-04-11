export async function handleResponse<D>(response: Response) {
  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";
    try {
      const errorResponse = await response.json();
      errorMessage = errorResponse?.message || errorMessage;
    } catch (err) {
      console.error(err);
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<D>;
}
