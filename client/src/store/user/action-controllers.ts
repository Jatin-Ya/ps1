import { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";

export const setUserController = (
    state: UserState,
    action: PayloadAction<UserState>
) => {
    
    return action.payload;
};
