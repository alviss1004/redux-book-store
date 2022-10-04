import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../components/book/bookSlice.js";

const store = configureStore({
  reducer: { book: bookReducer },
});

export default store;
