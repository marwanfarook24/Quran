import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type rememberRootState = {
    RemeberMe?: boolean,
    id: number | string
};

const RememberState: rememberRootState = {
    id: "",
    RemeberMe: false,
};

const RememberSlice = createSlice({
    name: "RememberSlice",
    initialState: RememberState,
    reducers: {
        setid: (state, action: PayloadAction<string | number>) => {
            state.id = action.payload;
            state.RemeberMe = true;
        },
        unsetid: (state) => {
            state.id = "";
            state.RemeberMe = false;
        }
    },
});


export default RememberSlice.reducer
export const { setid, unsetid } = RememberSlice.actions
