import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegistration = async (userObj) => {
  const response = await axios
    .post("/user/register", userObj)
    .then((res) => res.data);
  return response;
};

export const userLogin = createAsyncThunk(
  "userlogin",
  async (userObj, thunkApi) => {
    let response = await axios.post("/user/login", userObj);
    let data = response.data;
    if (data.message === "success") {
      return data.userObj;
    }
    if (
      data.message === "Incorrect Password" ||
      data.message === "User not registered...please register"
    ) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
