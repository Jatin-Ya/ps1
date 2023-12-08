export type UserState = {
    id: string;
    name: string;
    email: string;
    token: string;
    isAuth: boolean;
    role: "Manager" | "User";
};

export type UserData = {
    id: string;
    name: string;
    email: string;
    token: string;
    role: "Manager" | "User";
};

export const initialUserState: UserState = {
    id: "",
    name: "",
    email: "",
    token: "",
    isAuth: false,
    role: "User",
};
