import { createSlice } from "@reduxjs/toolkit";

type mySetting = {
    language: "en" | "ar"
}

const mysetting: mySetting = {
    language: "en"
}

const Setings = createSlice({
    name: "Setings",
    initialState: mysetting,
    reducers: {
        setArbicLanguage: (state) => {
            state.language = "ar"
            document.documentElement.lang = "ar";
            document.documentElement.dir = "rtl";
        },
        setEnghlishLanguage: (state) => {
            state.language = "en"
            document.documentElement.lang = "en";
            document.documentElement.dir = "ltr";
        },
    },
});


export default Setings.reducer
export const { setEnghlishLanguage, setArbicLanguage } = Setings.actions