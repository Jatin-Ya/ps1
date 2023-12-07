import { useDispatch, useSelector } from "react-redux";
import { StoreData } from "../store/store";
import { useEffect } from "react";
import { ProjectData, initialProjectState } from "../store/project/types";
import { setProject } from "../store/project/project-slice";

export const useProject = (projectId: string) => {
    const dispatch = useDispatch();
    const isLoaded = useSelector<StoreData, boolean>(
        (state) => state.project.isLoaded
    );

    const getProjectDetails = async (): Promise<ProjectData> => {
        // Get project details from backend
        return initialProjectState;
    };

    useEffect(() => {
        getProjectDetails().then((project) => dispatch(setProject(project)));
    }, [projectId]);

    return { isLoaded };
};
