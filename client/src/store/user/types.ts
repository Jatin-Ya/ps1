export type UserRoles = "None" | "Employee" | "Manager" | "Admin";

export type UserState = {
    id: number;
    name: string;
    email: string;
    token: string;
    isAuth: boolean;
    role: UserRoles;
};

export const initialUserState = {
    id: 0,
    name: "",
    email: "",
    token: "",
    isAuth: false,
    role: "none",
};
