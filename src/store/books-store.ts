import { books, type Book } from "../datasets/books-dataset";
import { createContainerStore } from "./store-builder";

export const booksStore = createContainerStore<Book>(
  books,
  (searchTerm) => (book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
);
