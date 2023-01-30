import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

export const getPages = createAsyncThunk(
  'movies/getPages',
  async function (page, { rejectWithValue }) {
    try {
      const res = await fetch(
        `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page ? page : 1}`,
      );

      if (!res.ok) {
        throw new Error('Сервер error');
      }

      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const movies = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [getPages.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [getPages.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.movies = [...action.payload.results];
    },
    [getPages.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default movies.reducer;
