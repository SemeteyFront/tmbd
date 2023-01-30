import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

export const getDetails = createAsyncThunk(
  'details/getDetails',
  async function (id, { rejectWithValue }) {
    try {
      const res = await fetch(
        `${API_URL}/movie/${id}?api_key=${API_KEY}`,
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

export const getSimilar = createAsyncThunk(
  'details/getSimilar',
  async function (id, { rejectWithValue }) {
    try {
      const res = await fetch(
        `${API_URL}/movie/${id}/similar?api_key=${API_KEY}`,
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

export const getImages = createAsyncThunk(
  'details/getImages',
  async function (id, { rejectWithValue }) {
    try {
      const res = await fetch(
        `${API_URL}/movie/${id}/images?api_key=${API_KEY}`,
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

const Details = createSlice({
  name: 'details',
  initialState: {
    similar: null,
    ids: null,
    images: null,
    status: null,
    error: null,
  },
  extraReducers: {
    [getDetails.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [getDetails.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.ids = { ...action.payload };
    },
    [getDetails.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [getSimilar.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [getSimilar.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.similar = {...action.payload}
    },
    [getSimilar.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [getImages.pending]: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    [getImages.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.images = {...action.payload}
    },
    [getImages.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  },
});

export default Details.reducer;
