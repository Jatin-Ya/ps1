import { useDispatch } from "react-redux";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";
import { ProjectData, RepoDetails } from "../store/project/types";
import { setProject } from "../store/project/project-slice";

const transformProject = (
    project: Record<string, string> & {
        users: Record<string, string>[];
        progress: number;
        repoDetails: RepoDetails;
    }
): ProjectData => {
    return {
        id: project._id,
        title: project.title,
        description: project.description,
        guidlines: project.guidlines,
        manager: project.manager,
        users: project.users.map((user: Record<string, string>) => ({
            id: user._id,
            name: user.name,
            email: user.email,
        })),
        status: project.status,
        progress: project.progress,
        repoDetails: project.repoDetails,
    };
};

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

            const projectState: ProjectData =
                transformProject(initialProjectState);

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

            const projectState: ProjectData =
                transformProject(initialProjectState);

            console.log({ transformed: initialProjectState });

            dispatch(setProject(projectState));
        } catch (e) {
            console.log(e);
        }
    };

    return { addUser, removeUser };
};
