import { cities, type City } from "@/datasets/cities-dataset";
import { createContainerStore } from "./store-builder";

export const citiesStore = createContainerStore<City>(
  cities,
  (searchTerm) => (city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
);
