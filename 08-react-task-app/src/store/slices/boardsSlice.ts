import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalActive: false,
    boatdArray: []
};

const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers:{

    }
});

export const boardsReducer = boardsSlice.reducer;