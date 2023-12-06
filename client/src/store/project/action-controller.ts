import { PayloadAction } from "@reduxjs/toolkit";
import { ProjectData, ProjectState, initialProjectState } from "./types";

export const setProjectController = (
    _: ProjectState,
    action: PayloadAction<ProjectData>
) => {
    const newState: ProjectState = { ...action.payload, isLoaded: true };

    return newState;
};

export const clearProjectController = () => {
    return initialProjectState;
};
