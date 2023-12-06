import { configureStore } from "@reduxjs/toolkit";
import { UserState } from "./user/types";
import userReducer from "./user/user-slice";
import projectReducer from "./project/project-slice";
import { ProjectState } from "./project/types";

export type StoreData = {
    user: UserState;
    project: ProjectState;
};

const store = configureStore({
    reducer: {
        user: userReducer,
        project: projectReducer,
    },
});

export default store;
