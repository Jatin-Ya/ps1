import { configureStore } from "@reduxjs/toolkit";
import { UserState } from "./user/types";
import userReducer from "./user/user-slice";

export type StoreData = {
    user: UserState;
};

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
