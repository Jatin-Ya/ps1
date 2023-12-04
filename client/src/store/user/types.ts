export type UserRoles = "None" | "Employee" | "Manager" | "Admin";

export const validRoles = ["None", "Employee", "Manager", "Admin"];

export type UserState = {
    id: number;
    name: string;
    email: string;
    token: string;
    isAuth: boolean;
    role: UserRoles;
};

export type UserData = {
    id: number;
    name: string;
    email: string;
    token: string;
    role: UserRoles;
};

export const initialUserState: UserState = {
    id: 0,
    name: "",
    email: "",
    token: "",
    isAuth: false,
    role: "None",
};
