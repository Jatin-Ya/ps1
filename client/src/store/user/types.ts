export type UserRoles = "None" | "Employee" | "Manager" | "Admin";

export const validRoles = ["None", "Employee", "Manager", "Admin"];

export type UserState = {
    id: string;
    name: string;
    email: string;
    token: string;
    isAuth: boolean;
    role: UserRoles;
};

export type UserData = {
    id: string;
    name: string;
    email: string;
    token: string;
    role: UserRoles;
};

export const initialUserState: UserState = {
    id: "",
    name: "",
    email: "",
    token: "",
    isAuth: true,
    role: "None",
};
