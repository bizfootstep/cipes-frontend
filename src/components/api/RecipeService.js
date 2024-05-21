import {apiClient} from "./ApiClient";

export const retrieveAllRecipeApi = () => apiClient.get("/recipe/all?page=0&size=2")

export const retrievePublishedRecipeApi = () => apiClient.get("/recipe/all/published")

export const deleteRecipeByIdApi = (id) => apiClient.delete(`/recipe/${id}`)

export const createRecipeApi = (recipe) => apiClient.post("/recipe", recipe)

export const publishRecipeByIdApi = (id) => apiClient.put(`/recipe/publish/${id}`);

export const buyRecipeApi = (id) => apiClient.post(`/recipe/buy/${id}`);