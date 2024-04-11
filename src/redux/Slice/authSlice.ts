import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  email: string;
  qrCode:string
}

const initialState: AuthState = {
  token: localStorage.getItem("access_token") || null,
  email: "",
  qrCode:""
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("access_token");
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setQrCode (state, action: PayloadAction<string>) {
      state.email = action.payload;
    },

  },
});

export const { setToken, clearToken, setEmail,setQrCode } = authSlice.actions;
export default authSlice.reducer;
