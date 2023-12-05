import { Outlet, useNavigate } from "react-router-dom";
import AllProjectsTabs, {
    AllProjectsTabsEnum,
} from "../components/navigation/AllProjectsTabs";
import { useState } from "react";
import { Paper, Stack } from "@mui/material";

const AllProjects = () => {
    const [currentTab, setCurrentTab] = useState(
        AllProjectsTabsEnum.AllProjects
    );

    const navigate = useNavigate();

    const handleTabChange = (newValue: AllProjectsTabsEnum) => {
        setCurrentTab(newValue);
        navigate(`/all-projects/${newValue}`);
    };

    return (
        <>
            <AllProjectsTabs value={currentTab} onChange={handleTabChange} />
            <Paper
                sx={{
                    margin: 2,
                    padding: 4,
                    borderRadius: 8,
                    flexGrow: 1,
                }}
            >
                <Stack direction="row" height={"100%"} overflow={"scroll"}>
                    <Outlet />
                </Stack>
            </Paper>
        </>
    );
};

export default AllProjects;
