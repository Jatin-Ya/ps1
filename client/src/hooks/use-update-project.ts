import { useDispatch } from "react-redux";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";
import { ProjectData } from "../store/project/types";
import { setProject } from "../store/project/project-slice";
import { parseProject } from "./use-project";

export const useUpdateProject = (projectId: string) => {
    const dispatch = useDispatch();

    const addUser = async (user: string) => {
        console.log({ assignUser: user });
        // assign user here
        const baseUrl = getBackendBaseUrl();
        try {
            const response = await axios.patch(`${baseUrl}/projects/addUsers`, {
                id: projectId,
                user: user,
            });

            const initialProjectState = response.data;

            console.log({ initialProjectState });

            const projectState: ProjectData = parseProject(initialProjectState);

            console.log({ transformed: initialProjectState });

            dispatch(setProject(projectState));
        } catch (e) {
            console.log(e);
        }
    };

    const removeUser = async (user: string) => {
        console.log({ assignUser: user });
        // assign user here
        const baseUrl = getBackendBaseUrl();
        try {
            const response = await axios.patch(
                `${baseUrl}/projects/removeUser`,
                {
                    id: projectId,
                    user: user,
                }
            );

            const initialProjectState = response.data;

            console.log({ initialProjectState });

            const projectState: ProjectData = parseProject(initialProjectState);

            console.log({ transformed: initialProjectState });

            dispatch(setProject(projectState));
        } catch (e) {
            console.log(e);
        }
    };

    return { addUser, removeUser };
};
