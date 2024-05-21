import { apiClient } from "./ApiClient";

export const retrieveAllCategoryApi = () => apiClient.get("/grocery/category/all")

export const deleteCategoryByIdApi = (id) => apiClient.delete(`/category/${id}`)

export const createCategoryApi = (category) => apiClient.post("/category", category)