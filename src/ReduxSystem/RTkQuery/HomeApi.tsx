import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type PostsResponse = object[];
export const homeapi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mp3quran.net/api/v3/" }),
  endpoints: (builder) => ({
    HomeData: builder.query({
      query: (argements: { language: string, arg: number, sura: number }) => `/reciters?language=${argements.language}&${argements.arg}&${argements.sura}`,
    }),
  }),
});
export const suwarType = createApi({
  reducerPath: "suwarTypeapi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mp3quran.net/api/v3/" }),
  endpoints: (builder) => ({
    SuwarId: builder.query<PostsResponse, void>({
      query: (lang) => `suwar?language=${lang}`,
    }),
    ChoosenReciteirs: builder.query({
      query: (arg: { id: string; language: string; rewaya: number }) =>
        `reciters?language=${arg.language}&reciter=${arg.id}`,
    }),
    RadioPlaylist: builder.query({
      query: (arg: string) => `radios?language=${arg}`,
    }),
    RewayaId: builder.query({
      query: (arg) => `riwayat?language=${arg}`
    })
  }),
});

export const { useHomeDataQuery }: any = homeapi;
export const {
  useSuwarIdQuery,
  useChoosenReciteirsQuery,
  useRadioPlaylistQuery,
  useRewayaIdQuery
}: any = suwarType;
