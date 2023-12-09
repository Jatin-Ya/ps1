import { useEffect, useState } from "react";
import ProjectSupportTabs, {
    ProjectSupportTabsEnum,
} from "../components/navigation/ProjectSupportTabs";
import { Typography } from "@mui/material";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";

const Dashboard = () => {
    const [isProjectConnected, setIsProjectConnected] = useState(false);

    // TUSHAR yaha p project id dalna hai
    const projectId = "614b0b4b9b0b8e0016f2b0e1";

    // useEffect(() => {
    //     // TODO: Fetch project is connected
    // }, []);
    useEffect(() => {
        const fetchProjectStatus = async () => {
            const baseUrl = getBackendBaseUrl();
            const response = await axios.get(`${baseUrl}/projects/${projectId}`);
            const project = response.data.project;

            const repoDetails = project?.repoDetails;

            if (!repoDetails) {
                setIsProjectConnected(false);
                return;
            }

            setIsProjectConnected(true);
        }
        fetchProjectStatus();
    }, []);

    return (
        <>
            <ProjectSupportTabs value={ProjectSupportTabsEnum.ProjectDashboard} onChange={() => {
                console.log("Project dashboard tab clicked");

            }} />
            {
                isProjectConnected ? (
                    <div>
                        <h1>Project connected</h1>
                    </div>
                ) : (
                    <div>
                        <Typography variant="h5" align="center" sx={{ marginTop: "5%" }}>
                            Please connect a github repository to the project
                        </Typography>
                    </div>
                )
            }
        </>
    );
}

export default Dashboard;