export type UserState = {
    id: string;
    name: string;
    email: string;
    token: string;
    isAuth: boolean;
};

export type UserData = {
    id: string;
    name: string;
    email: string;
    token: string;
};

export const initialUserState: UserState = {
    id: "",
    name: "",
    email: "",
    token: "",
    isAuth: false,
};
