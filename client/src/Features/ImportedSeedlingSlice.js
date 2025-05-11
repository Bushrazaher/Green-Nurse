// features/seedling/seedlingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GrUpdate } from "react-icons/gr";

// Async thunk for getting all seedlings
export const getSeedling = createAsyncThunk('seedlings/getSeedling',
    async (_, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getSeedlings`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { msg: error.message });
      }
    }
);

// Async thunk for getting a single seedling
export const getSeedlingById = createAsyncThunk('seedlings/getSeedlingById',
    async (id, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getSeedling/${id}`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { msg: error.message });
      }
    }
);

// Async thunk for adding a seedling
export const addSeedling = createAsyncThunk('seedlings/addSeedling',
    async (Data, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/addSeedling`, {
          name: Data.name,
          type: Data.type,
          quantity: Number(Data.quantity),
          price: Number(Data.price),
          total: Number(Data.total)
        });
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { msg: error.message });
      }
    }
);

// Async thunk for updating a seedling
export const updateSeedling = createAsyncThunk('seedlings/updateSeedling',
    async ({ id, Data }, { rejectWithValue }) => {
      try {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/updateSeedling/${id}`, Data);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { msg: error.message });
      }
    }
);
//Delete
export const deleteseedling = createAsyncThunk(
  "seedling/deleteseedling",
  async (Id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/deleteseedling/${Id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: "Failed to delete seedling" });
    }
  }
);

// Initial state
const initialState = {
    seedlings: [],
    currentSeedling: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    msg: null
};

const seedlingSlice = createSlice({
  name: 'seedlings',
  initialState,
  reducers: {
    clearCurrentSeedling: (state) => {
      state.currentSeedling = null;
    }
  },
  extraReducers(builder) {
    builder
      // Get Seedlings
      .addCase(getSeedling.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSeedling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seedlings = action.payload.seedlings;
      })
      .addCase(getSeedling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.msg || 'Failed to fetch seedlings';
      })
      // Get Single Seedling
      .addCase(getSeedlingById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSeedlingById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSeedling = action.payload.seedling;
      })
      .addCase(getSeedlingById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.msg || 'Failed to fetch seedling';
      })
      // Add Seedling
      .addCase(addSeedling.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.msg = null;
      })
      .addCase(addSeedling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seedlings = [...state.seedlings, action.payload.seedling];
        state.msg = action.payload.msg;
      })
      .addCase(addSeedling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.msg || 'Failed to add seedling';
      })
      // Update Seedling
      .addCase(updateSeedling.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.msg = null;
      })
      .addCase(updateSeedling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seedlings = state.seedlings.map(seedling => 
          seedling._id === action.payload.seedling._id ? action.payload.seedling : seedling
        );
        state.currentSeedling = action.payload.seedling;
        state.msg = action.payload.msg;
      })
      .addCase(updateSeedling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.msg || 'Failed to update seedling';
      })

  
  // Delete 
  .addCase(deleteseedling.pending, (state) => {
    state.status = 'loading';
  })
  .addCase(deleteseedling.fulfilled, (state, action) => {
    state.status = 'success';
    state.seedlings = null;
    state.msg = action.payload.msg;
  })
  .addCase(deleteseedling.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload?.msg || 'Seedling deletion failed';
  });
  
  }}
)

export const { clearCurrentSeedling } = seedlingSlice.actions;
export default seedlingSlice.reducer;