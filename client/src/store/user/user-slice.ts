import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "./types";

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        
    }
});
