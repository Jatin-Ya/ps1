import { PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserState, initialUserState } from "./types";

export const setUserController = (
    _: UserState,
    action: PayloadAction<UserData>
) => {
    const newState = { ...action.payload, isAuth: true };

    return newState;
};

export const clearUserController = () => {
    return initialUserState;
};
