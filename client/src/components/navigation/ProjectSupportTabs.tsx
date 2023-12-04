import { Tab, Tabs, ThemeProvider, Toolbar } from "@mui/material";
import React from "react";
import { tabsTheme } from "../../theme/theme";

export enum ProjectSupportTabsEnum {
    ProjectDashboard = 0,
    AiSupport = 1,
    TeamChat = 2,
    None = -1,
}

interface ProjectSupportTabsProps {
    value: ProjectSupportTabsEnum;
}

const ProjectSupportTabs: React.FC<ProjectSupportTabsProps> = ({
    value = ProjectSupportTabsEnum.None,
}) => {
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        console.log(newValue);
    };

    return (
        <Toolbar>
            <ThemeProvider theme={tabsTheme}>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary">
                    <Tab
                        value={ProjectSupportTabsEnum.ProjectDashboard}
                        label="Project Dashboard"
                    />
                    <Tab
                        value={ProjectSupportTabsEnum.AiSupport}
                        label="Ai Support"
                    />
                    <Tab
                        value={ProjectSupportTabsEnum.TeamChat}
                        label="Team Chat"
                        disabled
                    />
                </Tabs>
            </ThemeProvider>
        </Toolbar>
    );
};

export default ProjectSupportTabs;
