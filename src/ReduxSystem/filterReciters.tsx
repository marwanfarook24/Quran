import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userdata from "../types/HomeType";

type filter = {
  FilteredData: null | userdata[];
};

const filterdDataState: filter = {
  FilteredData: null,
};

const Filter = createSlice({
  name: "Filter",
  initialState: filterdDataState,
  reducers: {
    setsuwraChossen: (
      state,
      {
        payload,
      }: PayloadAction<{
        data: null | [userdata];
        id: number;
      }>
    ) => {
      if (payload.data) {
        const RecitersSuwra = payload.data.filter((prop) => {
          const suwarArray = prop.moshaf[0].surah_list.split(",");
          const choosenSuwraID = suwarArray.includes(`${payload.id}`);
          if (choosenSuwraID) {
            return prop;
          }
        });
        state.FilteredData = RecitersSuwra;
      } else {
        state.FilteredData = null;
      }
    },
  },
});

export default Filter.reducer;
export const { setsuwraChossen } = Filter.actions;
