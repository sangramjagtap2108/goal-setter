import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService';

// To get user from local storage(need to parse string to json)
// Initial value of user is extrcated from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// to call this - In Register.jsx - dispatch(register(userData))
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
      try {
        // when request is fulfilled
        return await authService.register(user)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) || error.message ||
          error.toString()
          // thunkAPI returns value as a payload for reducer
        //   when request is rejected
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const login = createAsyncThunk('auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  // For Async functions
  extraReducers: (builder) => {
    builder
    // we dont need to check these states(pending,fulfilled,pending)
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // action.payload - value returned in the try block
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // action.payload = message returned from catch block
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer;

