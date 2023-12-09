import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../store/store";
import { useEffect } from "react";
import { ProjectData } from "../store/project/types";
import { setProject } from "../store/project/project-slice";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";

export const useProject = (projectId: string) => {
    const dispatch = useDispatch();
    const isLoaded = useSelector<StoreData, boolean>(
        (state) => state.project.isLoaded
    );

    const getProjectDetails = async (): Promise<ProjectData> => {
        // Get project details from backend
        const baseUrl = getBackendBaseUrl();
        const response = await axios.get(
            `${baseUrl}/projects/getById/${projectId}`
        );
        const initialProjectState = response.data;

        const projectState: ProjectData = {
            id: initialProjectState._id,
            title: initialProjectState.title,
            description: initialProjectState.description,
            guidlines: initialProjectState.guidlines,
            manager: initialProjectState.manager,
            users: initialProjectState.users.map(
                (user: Record<string, string>) => ({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                })
            ),
            status: initialProjectState.status,
            progress: initialProjectState.progress,
            repoDetails: initialProjectState.repoDetails,
        };

        return projectState;
    };

    useEffect(() => {
        getProjectDetails().then((project) => dispatch(setProject(project)));
    }, [projectId]);

    return { isLoaded };
};
