import * as yup  from 'yup'
import {createAsyncThunk, createSlice, isRejectedWithValue} from '@reduxjs/toolkit'
import axios from 'axios'

//__________________(THUNK FOR REGISTRATION)___________________________------
export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/registerUser`, {
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email,
                password: userData.password
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { msg: error.message });
        }
    }
);

export const logout = createAsyncThunk(
    "users/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { msg: error.message });
        }
    }
);

//____________________________________LOGIN THUNK__________________________________________
export const login = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {  // Receive userData parameter
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
        email: userData.email,    // Include email from userData
        password: userData.password  // Include password from userData
      });
      
      const user = res.data.user;
      const msg = res.data.msg;
      return { user, msg };
    } catch (error) {
      // Proper error handling with fallback
      const msg = error.response?.data?.msg || 'Login failed. Please try again.';
      return rejectWithValue({ msg });
    }
  }
);

const initialState = {
    user : null,
    status: 'idle',
    msg: null,
    isLogin: false,
    error: null
};

const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.user = null;
            state.status = 'idle';
            state.msg = null;
            state.isLogin = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload.users;
                state.msg = action.payload.msg;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.msg || 'Registration failed';
            })
            // Login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload.user;
                state.msg = action.payload.msg;
                state.isLogin = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.user = null;
                state.isLogin = false;
                state.error = action.payload?.msg || 'Login failed';
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'success';
                state.user = null;
                state.msg = 'Logout successful';
                state.isLogin = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.msg || 'Logout failed';
            });
    }
});

export default UserSlice.reducer;
export const { clearUser } = UserSlice.actions;
