import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, createUser } from "../utils/auth";

export const loginUser = createAsyncThunk("login", async (credentials) => {
  const token = await login(credentials);
  return { token };
});

export const signUpUser = createAsyncThunk("signup", async (credentials) => {
  const token = await createUser(credentials);

  return { token };
});

export const getStorageToken = createAsyncThunk("getStorateItem", async () => {
  const token = await AsyncStorage.getItem("token");

  return { token };
});

const auth = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        // console.log(token);
        state.loading = false;
        state.token = payload.token;
        state.isAuthenticated = !!payload.token;
        AsyncStorage.setItem("token", payload.token);
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.token = "";
        state.isAuthenticated = false;
        AsyncStorage.removeItem("token");
      });

    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.isAuthenticated = !!payload.token;
        AsyncStorage.setItem("token", payload.token);
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false;
        state.token = "";
        state.isAuthenticated = false;
        AsyncStorage.removeItem("token");
      });

    builder
      .addCase(getStorageToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStorageToken.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isAuthenticated = !!payload.token;
        state.loading = false;
      })
      .addCase(getStorageToken.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logoutUser } = auth.actions;

export default auth.reducer;
