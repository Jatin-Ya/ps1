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
        const response = await axios.get(`${baseUrl}/project/${projectId}`);
        const initialProjectState = response.data;
        return initialProjectState;
    };

    useEffect(() => {
        getProjectDetails().then((project) => dispatch(setProject(project)));
    }, [projectId]);

    return { isLoaded };
};
