import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL

export const getGenresList = createAsyncThunk(
  'genres/getGenresList',
  async function(_, {rejectWithValue}) {
    try {
      const res = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}`)

      if(!res.ok) throw new Error('Error get Genres')

      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getGenresById = createAsyncThunk(
  'genres/getGenresById',
  async function(id, {rejectWithValue}) {
    try {
      const res = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}`)
      
      if(!res.ok) throw new Error('Error get genres by Id')
      const data = res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const genres = createSlice({
  name: 'genres',
  initialState: {
    genres: [],
    genresList: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [getGenresList.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [getGenresList.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.status = 'fulfilled'
      state.genresList = [...action.payload.genres]
    },
    [getGenresList.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },

    [getGenresById.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [getGenresById.fulfilled]: (state, action) => {
      console.log(action.payload.results)
      state.status = 'fulfilled'
      state.genres = [...action.payload.results]
    },
    [getGenresById.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  }
})

export default genres.reducer