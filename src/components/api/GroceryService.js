import {apiClient} from "./ApiClient";

export const retrieveAllGroceryApi = () => apiClient.get("/grocery/all");
export const deleteGroceryByIdApi = (id) => apiClient.delete(`/grocery/${id}`)
export const createGroceryApi = (grocery) => apiClient.post("/grocery", grocery)
