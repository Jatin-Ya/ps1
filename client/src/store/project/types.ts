export type UserRoles = "None" | "Employee" | "Manager" | "Admin";

export const validRoles = ["None", "Employee", "Manager", "Admin"];

export type RepoDetails = {
    repoName: string;
    repoOwner: string;
    repuUrl: string;
    repoId: string;
};

export type ProjectData = {
    id: string;
    title: string;
    manager: string;
    users: {
        id: string;
        name: string;
        email: string;
    }[];
    description: string;
    guidlines: string;
    status: string;
    progress: number;
    repoDetails: RepoDetails;
};

export type ProjectState = ProjectData & {
    isLoaded: boolean;
};

export const initialProjectState: ProjectState = {
    id: "",
    title: "afs",
    manager: "",
    users: [],
    description: "adgas",
    guidlines: "sad",
    status: "",
    progress: 0,
    repoDetails: {
        repoName: "",
        repoOwner: "",
        repuUrl: "",
        repoId: "",
    },
    isLoaded: false,
};
