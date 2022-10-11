import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../Apis";

// export const userLogin = createAsyncThunk(
//   "userlogin",
//   async (userObj, thunkApi) => {
//     let response = await axios.post("/user/login", userObj);
//     let data = response.data;
//     if (data.message === "success") {
//       return data.userObj;
//     }
//     if (
//       data.message === "Incorrect Password" ||
//       data.message === "User not registered...please register"
//     ) {
//       return thunkApi.rejectWithValue(data);
//     }
//   }
// );

let loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    userObj: {},
    isSuccess: false,
    isLoading: false,
    isErr: false,
    errMsg: "",
  },
  reducers: {
    clearLoginStatus: (state) => {
      state.userObj = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.isErr = false;
      state.errMsg = "";
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.userObj = null;
      state.isSuccess = false;
      state.isLoading = true;
      state.isErr = false;
      state.errMsg = "";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.userObj = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.isErr = false;
      state.errMsg = "";
    },
    [userLogin.rejected]: (state, action) => {
      state.userObj = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.isErr = true;
      state.errMsg = action.payload.message;
    },
  },
});
export const { clearLoginStatus } = loginSlice.actions;
export default loginSlice.reducer;
