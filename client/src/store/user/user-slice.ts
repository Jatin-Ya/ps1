import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "./types";
import { clearUserController, setUserController } from "./action-controllers";

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser: setUserController,
        clearUser: clearUserController,
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
