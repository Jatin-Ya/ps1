import { createSlice } from "@reduxjs/toolkit";

import { initialProjectState } from "./types";
import {
    clearProjectController,
    setProjectController,
} from "./action-controller";

const projectSlice = createSlice({
    name: "project",
    initialState: initialProjectState,
    reducers: {
        setProject: setProjectController,
        clearProject: clearProjectController,
    },
});

export const { setProject, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
