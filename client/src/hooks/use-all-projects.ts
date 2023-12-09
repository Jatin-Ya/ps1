import { useEffect, useState } from "react";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";

type Project = {
    projectName: string;
    projectDescription: string;
    projectId: string;
};

export const useAllProjects = (userid: string, role: string) => {
    const [allProjects, setAllProjects] = useState<Project[]>([]);

    const getAllProjects = async (): Promise<Project[]> => {
        // Get all projects from backend
        const url = `${getBackendBaseUrl()}/projects/belongsTo`;
        const queryParams = new URLSearchParams({ userid, role });

        const response = await axios.get(`${url}?${queryParams}`);

        const data: Project[] = response.data.map(
            (project: Record<string, string>) => ({
                projectName: project.title,
                projectDescription: project.description,
                projectId: project._id,
            })
        );

        console.log(data);
        return data;
    };

    useEffect(() => {
        getAllProjects().then((allProjects) => setAllProjects(allProjects));
    }, []);

    return { allProjects };
};
