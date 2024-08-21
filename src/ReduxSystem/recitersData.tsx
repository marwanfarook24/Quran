import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayList } from "react-modern-audio-player";
import userdata from "../types/HomeType";

type rester = {
  SearchBoolen: boolean;
  playlist: PlayList;
  mainPageReciters: boolean;
  suwraid: {
    currentplaylist: [
      {
        name: string;
        src: string;
        id: number;
        writer: string;
      }
    ];
    index: number;
  };
  searchResult: [] | null;
  currentplaylist:
  | null
  | [
    {
      name: string;
      src: string;
      id: number;
      writer: string;
    }
  ];
  searchSwura:
  | {
    name: string;
    src: string;
    id: number;
    writer: string;
  }[]
  | undefined;
};
const reciterStateData: rester = {
  SearchBoolen: false,
  playlist: [],
  mainPageReciters: false,
  suwraid: {
    currentplaylist: [
      {
        name: "",
        src: "",
        id: 0,
        writer: "",
      },
    ],
    index: 0,
  },
  searchResult: null,
  currentplaylist: null,
  searchSwura: [],
};

const RecitersData = createSlice({
  name: "RecitersData",
  initialState: reciterStateData,
  reducers: {
    getrecitersdetails: (
      state,
      {
        payload,
      }: PayloadAction<{
        moshaf: userdata["moshaf"][0];
        img: string;
        writer: string;
        name: [
          {
            id: number;
            name: string;
          }
        ];
      }>
    ) => {
      const surahlist = payload.moshaf.surah_list.split(",");
      const playlistReciter = surahlist.map((prop, index) => {
        const ahyanumber = prop.padStart(3, "0");
        const Suwra = payload.name.find((SuwraIndex) => {
          return SuwraIndex.id == +prop;
        });

        return {
          src: `${payload.moshaf.server}/${ahyanumber}.mp3`,
          id: index,
          writer: payload.writer,
          img: payload.img,
          name: Suwra?.name,
        };
      });
      state.playlist = playlistReciter;
    },
    clickedSuwra: (state, { payload }) => {
      state.suwraid = payload;
      state.mainPageReciters = payload.boolean;
    },
    SearchBar: (state, { payload }: PayloadAction<[] | null>) => {
      state.searchResult = payload;
    },

    currentdata: (state, { payload }) => {
      const surahlist =
        payload.choosendata.reciters[0].moshaf[payload.rewaya].surah_list;
      const surahlistArray = surahlist.split(",");
      const playlistReciter = surahlistArray.map((prop: string) => {
        const ahyanumber = prop.padStart(3, "0");
        const Suwra = payload.SuwarData.suwar.find(({ id }: { id: number }) => {
          return id == +prop;
        });

        return {
          src: `${payload.choosendata.reciters[0].moshaf[payload.rewaya].server
            }/${ahyanumber}.mp3`,
          id: Suwra.id,
          writer: payload.choosendata.reciters[0].name,
          name: Suwra.name,
        };
      });

      state.currentplaylist = playlistReciter;
    },
    Searchsuwra: (
      state,
      {
        payload,
      }: PayloadAction<
        | {
          name: string;
          src: string;
          id: number;
          writer: string;
        }[]
        | undefined
      >
    ) => {
      state.searchSwura = payload;
    },
  },
});
export default RecitersData.reducer;
export const {
  getrecitersdetails,
  clickedSuwra,
  SearchBar,
  currentdata,
  Searchsuwra,
} = RecitersData.actions;
