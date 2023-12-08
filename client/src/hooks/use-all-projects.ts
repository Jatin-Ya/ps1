import { useEffect, useState } from "react";

type Project = {
    projectName: string;
    projectDescription: string;
    projectId: string;
};

export const useAllProjects = () => {
    const [allProjects, setAllProjects] = useState<Project[]>([]);

    const getAllProjects = async (): Promise<Project[]> => {
        // Get all projects from backend
        return [
            {
                projectName: "Project 1",
                projectDescription: "This is project 1",
                projectId: "1",
            },
            {
                projectName: "Project 2",
                projectDescription: "This is project 2",
                projectId: "2",
            },
            {
                projectName: "Project 3",
                projectDescription: "This is project 3",
                projectId: "3",
            },
        ];
    };

    useEffect(() => {
        getAllProjects().then((allProjects) => setAllProjects(allProjects));
    }, []);

    return { allProjects };
};
