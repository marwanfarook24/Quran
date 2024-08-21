import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Radio = {
  state: boolean;
  RadioObject: {
    url: string | undefined;
    urlaudio: string;
    nameAudio: string;
    id: number
    index: number

  };
  searchbar:
  | null
  | [
    {
      name: string;
      src: string;
      id: number;
      writer: string;
    }
  ];
};

const RadioState: Radio = {
  state: false,
  RadioObject: {
    urlaudio: "",
    nameAudio: "",
    id: 0,
    index: 0,
    url: ""
  },
  searchbar: null,
};

const RadioStateSlice = createSlice({
  name: "RadioStateSlice",
  initialState: RadioState,
  reducers: {
    Changestate: (state) => {
      state.state = true;

    },
    setChangestate: (state) => {
      state.state = false;

    },
    choosenRadioAudio: (
      state,
      { payload }: PayloadAction<{ urlaudio: string; nameAudio: string, id: number, index: number, url: string }>
    ) => {
      state.RadioObject = payload;
    },
  },
});

export default RadioStateSlice.reducer;
export const { Changestate, setChangestate, choosenRadioAudio } =
  RadioStateSlice.actions;
