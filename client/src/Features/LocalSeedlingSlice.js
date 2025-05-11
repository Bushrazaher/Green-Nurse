// features/seedling/seedlingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for getting all local seedlings
export const getLocalSeedling = createAsyncThunk('localseedlings/getLocalSeedling',
    async (_, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getLocalSeedlings`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { msg: error.message });
      }
    }
);

// Async thunk for adding a local seedling
export const addLocalSeedling = createAsyncThunk('localseedlings/addLocalSeedling',
    async (Data, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/addLocalSeedling`, {
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

// Async thunk for getting a single seedling
export const getLocalSeedlingById = createAsyncThunk('localseedlings/getLocalSeedlingById',
    async (id, { rejectWithValue }) => {
      try {
        console.log('Fetching seedling with ID:', id);
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getLocalSeedling/${id}`);
        console.log('Server response:', res.data);
        return res.data;
      } catch (error) {
        console.error('Error fetching seedling:', error);
        return rejectWithValue(error.response?.data || { msg: error.message });
      }
    }
);
// Async thunk for updating a seedling
export const updateLocalSeedling = createAsyncThunk('localseedlings/updateLocalSeedling',
    async ({ id, Data }, { rejectWithValue }) => {
      try {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/updateLocalSeedling/${id}`, Data);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { msg: error.message });
      }
    }
);
//Delete
export const deleteLocalseedling = createAsyncThunk(
  "localseedling/deleteLocalseedling",
  async (Id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/deleteLocalseedling/${Id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: "Failed to delete seedling" });
    }
  }
);


// Initial state
const initialState = {
    localseedlings: [],
    currentLocalSeedling: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    msg: null
};

const localSeedlingSlice = createSlice({
  name: 'localseedlings',
  initialState,
  reducers: {
    clearCurrentLocalSeedling: (state) => {
          state.currentLocalSeedling = null;
        }
  },
  extraReducers(builder) {
    builder
      // Get Local Seedlings
      .addCase(getLocalSeedling.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLocalSeedling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.localseedlings = action.payload.localseedlings;
      })
      .addCase(getLocalSeedling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.msg || 'Failed to fetch local seedlings';
      })
      // Add Local Seedling
      .addCase(addLocalSeedling.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.msg = null;
      })
      .addCase(addLocalSeedling.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.localseedlings = [...state.localseedlings, action.payload.localseedlings];
        state.msg = action.payload.msg;
      })
      .addCase(addLocalSeedling.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.msg || 'Failed to add local seedling';
      })
       // Get Single Seedling
            .addCase(getLocalSeedlingById.pending, (state) => {
              state.status = 'loading';
            })
            .addCase(getLocalSeedlingById.fulfilled, (state, action) => {
              console.log('Redux received data:', action.payload);
              state.status = 'succeeded';
              state.currentLocalSeedling = action.payload.getLocalSeedling;
              console.log('Updated state:', state.currentLocalSeedling);
            })
            .addCase(getLocalSeedlingById.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.payload?.msg || 'Failed to fetch seedling';
            })
          // Update Seedling
                .addCase(updateLocalSeedling.pending, (state) => {
                  state.status = 'loading';
                  state.error = null;
                  state.msg = null;
                })
                .addCase(updateLocalSeedling.fulfilled, (state, action) => {
                  state.status = 'succeeded';
                  state.localseedlings = state.localseedlings.map(seedling => 
                    seedling._id === action.payload.seedling._id ? action.payload.seedling : seedling
                  );
                  state.currentLocalSeedling = action.payload.seedling;
                  state.msg = action.payload.msg;
                })
                .addCase(updateLocalSeedling.rejected, (state, action) => {
                  state.status = 'failed';
                  state.error = action.payload?.msg || 'Failed to update seedling';
                })
                 // Delete 
                  .addCase(deleteLocalseedling.pending, (state) => {
                    state.status = 'loading';
                  })
                  .addCase(deleteLocalseedling.fulfilled, (state, action) => {
                    state.status = 'success';
                    state.localseedlings = null;
                    state.msg = action.payload.msg;
                  })
                  .addCase(deleteLocalseedling.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload?.msg || 'Seedling deletion failed';
                  });
  }
});

export default localSeedlingSlice.reducer;