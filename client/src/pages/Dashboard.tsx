import { useState } from "react";
import ProjectSupportTabs, {
    ProjectSupportTabsEnum,
} from "../components/navigation/ProjectSupportTabs";
import { Typography } from "@mui/material";

const Dashboard = () => {
    const [isProjectConnected, setIsProjectConnected] = useState(false);

    // useEffect(() => {
    //     // TODO: Fetch project is connected
    // }, []);

    return (
        <>
            <ProjectSupportTabs value={ProjectSupportTabsEnum.ProjectDashboard} />
            {
                isProjectConnected ? (
                    <div>
                        <h1>Project connected</h1>
                    </div>
                ) : (
                    <div>
                        <Typography variant="h5" align="center" sx={{marginTop:"5%"}}>
                            Please connect a github repository to the project
                        </Typography>
                    </div>
                )
            }
        </>
    );
}

export default Dashboard;