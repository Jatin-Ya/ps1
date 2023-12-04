import { Tab, Tabs, ThemeProvider, Toolbar } from "@mui/material";
import React from "react";
import { tabsTheme } from "../../theme/theme";

export enum AllProjectsTabsEnum {
    AllProjects = "",
    NewProject = "new-project",
}

interface AllProjectsTabsProps {
    value?: AllProjectsTabsEnum;
    onChange?: (newValue: AllProjectsTabsEnum) => void;
}

const AllProjectsTabs: React.FC<AllProjectsTabsProps> = ({
    value = AllProjectsTabsEnum.AllProjects,
    onChange,
}) => {
    const handleChange = (
        _: React.SyntheticEvent,
        newValue: AllProjectsTabsEnum
    ) => {
        onChange && onChange(newValue);
    };

    return (
        <Toolbar>
            <ThemeProvider theme={tabsTheme}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                >
                    <Tab
                        value={AllProjectsTabsEnum.AllProjects}
                        label="All Projects"
                    />
                    <Tab
                        value={AllProjectsTabsEnum.NewProject}
                        label="New Project"
                    />
                </Tabs>
            </ThemeProvider>
        </Toolbar>
    );
};

export default AllProjectsTabs;
