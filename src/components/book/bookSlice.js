import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiService";
import { fetchBooks } from "./bookAPI";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  readinglist: [],
  bookDetail: null,
  status: null,
};

export const addToReadingList = createAsyncThunk(
  "book/addToReadingList",
  async (book) => {
    const response = await api.post(`/favorites`, book);
    return response.data;
  }
);

export const removeBook = createAsyncThunk(
  "book/removeBook",
  async (removedBookId) => {
    const response = await api.delete(`/favorites/${removedBookId}`);
    return response.data;
  }
);

export const getReadingList = createAsyncThunk(
  "book/getReadingList",
  async () => {
    const response = await api.get(`/favorites`);
    return response.data;
  }
);

export const getBookDetail = createAsyncThunk(
  "book/getBookDetail",
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);

export const getBooks = createAsyncThunk("book/getBooks", async (props) => {
  const response = await fetchBooks(props);
  return response.data;
});

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
      });
    builder
      .addCase(addToReadingList.fulfilled, (state, action) => {
        toast.success("The book has been added to the reading list!");
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        toast.error(action.error.message);
      });
    builder
      .addCase(getReadingList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = "idle";
        state.readinglist = action.payload;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = "failed";
      });
    builder
      .addCase(removeBook.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.status = "idle";
        toast.success("The book has been removed");
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.status = "Failed to remove book";
      });
    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "Failed to remove book";
      });
  },
});
