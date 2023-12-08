import { useDispatch } from "react-redux";
import { UserData } from "../store/user/types";
import { setUser } from "../store/user/user-slice";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";

export const useAuth = () => {
    const dispatch = useDispatch();

    const login = async (email: string, password: string): Promise<void> => {
        // Login user and store data in user data variable

        const baseUrl = getBackendBaseUrl();
        const response = await axios.post(`${baseUrl}/auth/login`, {
            email,
            password,
        });
        const userData = response.data;
        console.log(userData);

        // const userData: UserData = {
        //     id: "1",
        //     email,
        //     name: "John Doe",
        //     token: "1234",
        //     role: "Employee",
        // };

        dispatch(setUser(userData));
    };

    const signup = async (
        name: string,
        email: string,
        password: string
    ): Promise<void> => {
        //Signup user and store data in user data variable, Add parameters if additional data is needed
        const baseUrl = getBackendBaseUrl();
        const body = {
            name,
            email,
            password,
        };
        const response = await axios.post(`${baseUrl}/users`, body);

        const userData = response.data;
        console.log(userData);
    };

    return { login, signup };
};
