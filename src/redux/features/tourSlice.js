import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

// create a thunk to fetch all tours
export const createTour = createAsyncThunk(
  'tour/createTour',
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/tour`, updatedTourData);
      toast.success('Tour created successfully');
      console.log(response.data, 'tour created');
      navigate('/dashboard');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all tours
export const getToursByUser = createAsyncThunk(
  `tour/getToursByUser`,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/tour/user/${userId}`);
      console.log(response.data, 'getToursByUser');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update tours
export const updateTour = createAsyncThunk(
  `tour/updateTour`,
  async ({ id, updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/tour/${id}`, updatedTourData);
      console.log(response.data, 'updateTour');
      toast.success(`Tour updated successfully`);
      navigate('/dashboard');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete tours
export const deleteTour = createAsyncThunk(
  `tour/deleteTour`,
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/tour/${id}`);
      console.log(response.data, 'deleteTour');
      toast.success(`Tour deleted successfully`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  tour: [],
  tours: [],
  usersTours: [],
  tagTours: [],
  relatedTours: [],
  currentPage: 1,
  numberOfPages: null,
  error: '',
  loading: false,
};
const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createTour.pending]: (state) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getToursByUser.pending]: (state) => {
      state.loading = true;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.usersTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateTour.pending]: (state) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map(
          (item) => {
            // eslint-disable-next-line no-unused-expressions
            item._id === id ? action.payload : item;
          },
          (state.tours = state.tours.map((item) => {
            // eslint-disable-next-line no-unused-expressions
            item._id === id ? action.payload : item;
          }))
        );
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteTour.pending]: (state) => {
      state.loading = true;
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id);
        state.tours = state.tours.filter((item) => item._id !== id);
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
