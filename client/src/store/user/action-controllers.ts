import { PayloadAction } from "@reduxjs/toolkit";
import { UserData, initialUserState } from "./types";

export const setUserController = (
    // state: UserState,
    action: PayloadAction<UserData>
) => {
    const newState = { ...action.payload, isAuth: true };

    return newState;
};

export const clearUserController = () => {
    return initialUserState;
};
