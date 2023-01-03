import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  issue: [],
  isLoading: false,
  error: null,
};

export const getIssues = createAsyncThunk(async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/issue`);
    return thunkAPI.fulfillWithValue([...data]);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const addIssue = createAsyncThunk(async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/issue`, payload);
    console.log("data", data);
    return thunkAPI.fulfillWithValue(data);
  } catch (errer) {
    return thunkAPI.rejectWithValue(errer);
  }
});

export const updateIssue = createAsyncThunk(async (payload, thunkAPI) => {
  try {
    console.log(payload);
    const response = await axios.put(
      `${BASE_URL}/issue/${payload.id}`,
      payload
    );
    console.log("response", response);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteIssue = createAsyncThunk(async (payload, thunkAPI) => {
  try {
    await axios.delete(`${BASE_URL}/issue/${payload}`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIssues.fulfilled, (state, action) => {
      state.posts = [action.payload];
    });
    builder.addCase(addIssue.fulfilled, (state, action) => {
      state.posts[0].push(action.payload);
      return state;
    });
    builder.addCase(updateIssue.fulfilled, (state, action) => {
      console.log(state);
      console.log(action);
      const newState = state.posts[0].data.map((item) =>
        action.meta.arg.id === item.comment_id
          ? { ...item, content: action.meta.arg.content }
          : item
      );
      state.posts[0].data = newState;
      state.posts.push(action.payload);
      return state;
    });
    builder.addCase(deleteIssue.fulfilled, (state, action) => {
      const newState = state.posts[0].filter(
        (item) => item.id !== action.payload
      );
      state.posts[0] = newState;
      return state;
    });
  },
});

export default issueSlice.reducer;
