import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { issueAPI } from "../api/api";

export const getIssues = createAsyncThunk(
  "GET_ALL",
  async (payload, thunkAPI) => {
    try {
      const { data } = await issueAPI.getIssues();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addIssue = createAsyncThunk(
  "ADD_ISSUE",
  async (payload, thunkAPI) => {
    try {
      // const { data } = await axios.post(`${BASE_URL}/issue`, payload);
      const { data } = await issueAPI(payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

export const updateIssue = createAsyncThunk(
  "UPDATE_ISSUE",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      // const response = await axios.put(
      //   `${BASE_URL}/issue/${payload.id}`,
      //   payload
      // );
      const response = await issueAPI.updateIssue(payload.id, payload);
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteIssue = createAsyncThunk(
  "DELETE_ISSUE",
  async (payload, thunkAPI) => {
    try {
      await issueAPI(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  issue: [],
  isLoading: false,
  error: null,
};

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIssues.fulfilled, (state, action) => {
      state.issue = action.payload;
    });
    // builder.addCase(getOne.fulfilled, (state, action) => {
    //   state.issue = action.payload;
    // });
    builder.addCase(addIssue.fulfilled, (state, action) => {
      state.issue.push(action.payload);
    });
    builder.addCase(updateIssue.fulfilled, (state, action) => {
      console.log(state);
      console.log(action);
      const newState = state.issue.data.map((item) =>
        action.meta.arg.id === item.comment_id
          ? { ...item, content: action.meta.arg.content }
          : item
      );
      state.issue[0].data = newState;
      state.issue.push(action.payload);
    });
    builder.addCase(deleteIssue.fulfilled, (state, action) => {
      const newState = state.issue.filter((item) => item.id !== action.payload);
      state.issue = newState;
    });
  },
});

export default issueSlice.reducer;
