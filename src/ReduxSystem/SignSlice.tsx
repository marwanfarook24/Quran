import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type RootState = {
  usersrespones: [
    {
      email?: string;
      passowrd?: number;
      username?: string;
      firstname?: string;
      lastname?: string;
      confirmpassword?: string;
    }
  ];
  RemeberMe: boolean;
  id: number | string;
};
const initialState: RootState = {
  usersrespones: [{}],
  RemeberMe: false,
  id: "",
};
type datapushed = {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  favList: [];
  Lastplayed: [];
};


export const userdata = createAsyncThunk<
  any,
  void,
  { fulfilledMeta?: object[] }
>("userdata", async (_defult, AsyncThunk) => {
  const { rejectWithValue } = AsyncThunk;
  try {
    const info = await axios({
      method: "get",
      url: "http://localhost:3000/users",
    });
    return info.data;
  } catch (e) {
    console.log(rejectWithValue(e));
  }
});

export const pushdata = createAsyncThunk<
  datapushed,
  datapushed,
  { rejectValue: string }
>("pushdata", async (defult, AsyncThunk) => {

  const { rejectWithValue } = AsyncThunk;
  try {
    const info = await axios({
      method: "post",
      url: "http://localhost:3000/users",
      data: defult,
    });
    return info.data;
  } catch (_e) {
    rejectWithValue("server");
  }
});



const users = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userdata.pending, (_state, _action) => {
      // console.log(_action);
    });
    builder.addCase(userdata.fulfilled, (state, action) => {
      state.usersrespones = action.payload;
    });
    builder.addCase(userdata.rejected, (_state, _action) => { });
    // data/push/post
    builder.addCase(pushdata.pending, (_state, _action) => { });
    builder.addCase(pushdata.fulfilled, (_state, _action) => {

    });
    builder.addCase(pushdata.rejected, (_state, _action) => { });
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  },
});
// ____________________________________________________________________

export const initialData = users.reducer;
// export const pushdatatest = DataPushAction.reducer;
