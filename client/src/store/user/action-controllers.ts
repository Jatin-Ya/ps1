import { PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserState, initialUserState, validRoles } from "./types";

export const setUserController = (
    state: UserState,
    action: PayloadAction<UserData>
) => {
    const newState = { ...action.payload, isAuth: true };

const isRoleValid = validRoles.includes(newState.role);
    if (!isRoleValid) {
        return state;
    }

    return newState;
};

export const clearUserController = () => {
    return initialUserState;
};
