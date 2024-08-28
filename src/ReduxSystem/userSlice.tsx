import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type data = {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  favList: [];
  LastPlayed: [];
  OwnPlaylist: [];
  id: string | number;
};

type props = {
  id: number | string | undefined;
  arguments: {
    username: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    password: string | undefined;
    OwnPlaylist: [] | undefined;
    favList: object[] | undefined;
    LastPlayed: object[] | undefined;
    id: string | undefined | number;
  };
};
type test = number | string;
type userobj = {
  dataAddInOwnList: true | false;
  OwnList: true | false;
  updateState: true | false;
  UserObject: [];
  userobjecttype: null | {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    favList: [];
    LastPlayed: [];
    OwnPlaylist: [];
    id: string | number;
  };
  loading: boolean;
};

const userobject: userobj = {
  dataAddInOwnList: true,
  updateState: true,
  userobjecttype: null,
  UserObject: [],
  loading: false,
  OwnList: false,
};

export const userdatalogin = createAsyncThunk<
  any,
  test,
  { rejectedMeta?: String }
>("userdatalogin", async (ID, AsyncThunk) => {
  const { rejectWithValue } = AsyncThunk;
  try {
    const info = await axios({
      method: "get",
      url: `http://localhost:3000/users/${ID}`,
    });
    return info.data;
  } catch (e) {
    console.log(rejectWithValue(e));
  }
});

export const userdatalastPLayed = createAsyncThunk<
  props,
  props,
  { rejectedMeta?: String }
>("userdatalastPLayed", async (arg, AsyncThunk) => {
  const { rejectWithValue } = AsyncThunk;

  try {
    const info = await axios({
      method: "put",
      url: `http://localhost:3000/users/${arg.id}`,
      data: {
        ...arg.arguments,
        LastPlayed: arg.arguments.LastPlayed,
      },
    });

    return info.data;
  } catch (e) {
    console.log(rejectWithValue(e));
  }
});
export const userdataFavList = createAsyncThunk<
  props,
  props,
  { rejectedMeta?: String }
>("userdataFavList", async (arg, AsyncThunk) => {
  const { rejectWithValue } = AsyncThunk;
  try {
    const info = await axios({
      method: "put",
      url: `http://localhost:3000/users/${arg.id}`,
      data: {
        ...arg.arguments,
        favList: arg.arguments.favList,
      },
    });

    return info.data;
  } catch (e) {
    console.log(rejectWithValue(e));
  }
});
type PlayList = {
  id: string | number | undefined;
  Title: string;
  description: string;
  userobjecttype: any;
  Data: [];
};

export const userdataOwnList = createAsyncThunk<
  PlayList,
  PlayList,
  { rejectedMeta?: String }
>("userdataOwnList", async (arg, AsyncThunk) => {

  const { rejectWithValue } = AsyncThunk;
  try {
    const info = await axios({
      method: "patch",
      url: `http://localhost:3000/users/${arg.id}`,
      data: {
        ...arg.userobjecttype,
        OwnPlaylist: [
          ...arg.userobjecttype.OwnPlaylist,
          { title: arg.Title, description: arg.description, Data: arg.Data },
        ],
      },
    });

    return info.data;
  } catch (e) {
    console.log(rejectWithValue(e));
  }
});
export const userdataAddInOwnList = createAsyncThunk<
  any,
  any,
  { rejectedMeta?: String }
>("userdataAddInOwnList", async (arg, AsyncThunk) => {
  console.log(

  );

  const { rejectWithValue } = AsyncThunk;
  try {
    const info = await axios({
      method: "patch",
      url: `http://localhost:3000/users/${arg.id}`,
      data: {
        OwnPlaylist: [
          {
            ...arg.OwnPlaylist[arg.index],
            Data: [...arg.OwnPlaylist[arg.index].Data, arg.Ayhah],
          },
        ],
      },
    });

    return info.data;
  } catch (e) {
    console.log(rejectWithValue(e));
  }
});




const userslogin = createSlice({
  name: "userslogin",
  initialState: userobject,
  reducers: {
    unsetobj: (state) => {
      state.userobjecttype = null;
    },
    shiftLAstPlayed: (state, { payload }) => {
      const Shift = payload.userobjecttype.LastPlayed.filter(
        (_prop: {}, index: number) => {
          return index > payload.lenght - 6;
        }
      );
      state.UserObject = Shift;
    },
    UnshiftLastPlayed: (state, { payload }) => {
      const UnShift = payload?.LastPlayed.filter(
        (_prop: {}, _index: number) => {
          return _prop;
        }
      );
      state.UserObject = UnShift;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userdatalogin.pending, (_state, _action) => {
      _state.loading = true;
    });
    builder.addCase(
      userdatalogin.fulfilled,
      (_state, action: PayloadAction<data>) => {
        _state.loading = false;
        _state.userobjecttype = action.payload;
      }
    );
    builder.addCase(userdatalogin.rejected, (_state, _action) => { });

    builder.addCase(userdatalastPLayed.pending, (_state, _action) => {
      // _state.loading = true
    });
    builder.addCase(
      userdatalastPLayed.fulfilled,
      (_state, _action: PayloadAction<props>) => {
        _state.updateState = !_state.updateState;
      }
    );
    builder.addCase(userdatalastPLayed.rejected, (_state, _action) => { });
    builder.addCase(userdataFavList.pending, (_state, _action) => {
      // _state.loading = true
    });
    builder.addCase(
      userdataFavList.fulfilled,
      (_state, _action: PayloadAction<props>) => {
        _state.updateState = !_state.updateState;
      }
    );
    builder.addCase(userdataFavList.rejected, (_state, _action) => { });
    builder.addCase(userdataOwnList.pending, (_state, _action) => {
      // _state.loading = true
    });
    builder.addCase(userdataOwnList.fulfilled, (_state, _action) => {
      _state.OwnList = true;
    });
    builder.addCase(userdataOwnList.rejected, (_state, _action) => { });
    builder.addCase(userdataAddInOwnList.pending, (_state, _action) => {
      // _state.loading = true
    });
    builder.addCase(userdataAddInOwnList.fulfilled, (_state, _action) => {
      _state.dataAddInOwnList = !_state.dataAddInOwnList;
    });
    builder.addCase(userdataAddInOwnList.rejected, (_state, _action) => { });
    userdataAddInOwnList;
  },
  // ________________________________________________________//
});

export const { unsetobj, shiftLAstPlayed, UnshiftLastPlayed } =
  userslogin.actions;

export const userslogindata = userslogin.reducer;
