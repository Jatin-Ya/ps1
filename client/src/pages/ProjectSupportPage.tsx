import { Divider, Paper, Stack, Tab, Tabs, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import ProjectSupportTabs, {
    ProjectSupportTabsEnum,
} from "../components/navigation/ProjectSupportTabs";
import { Outlet } from "react-router-dom";
import { tabsTheme } from "../theme/theme";

enum AISupportEnum {
    Roadmap = 0,
    QualityCheck = 1,
    RaiseQuery = 2,
    None = -1,
}

const ProjectSupportPage = () => {
    const [aiSupportTabsValue, setAiSupportTabsValue] = useState(
        AISupportEnum.Roadmap
    );

    const handleAiSupportTabsChange = (
        _: React.SyntheticEvent,
        newValue: number
    ) => {
        setAiSupportTabsValue(newValue);
    };

    return (
        <>
            <ProjectSupportTabs value={ProjectSupportTabsEnum.AiSupport} />
            <Paper sx={{ margin: 2, padding: 4, borderRadius: 8 }}>
                <Stack direction="row">
                    <ThemeProvider theme={tabsTheme}>
                        <Tabs
                            orientation="vertical"
                            value={aiSupportTabsValue}
                            onChange={handleAiSupportTabsChange}
                        >
                            <Tab
                                value={AISupportEnum.Roadmap}
                                label="Roadmap"
                            />
                            <Tab
                                value={AISupportEnum.QualityCheck}
                                label="Quality check"
                            />
                            <Tab
                                value={AISupportEnum.RaiseQuery}
                                label="Raise Query"
                            />
                        </Tabs>
                    </ThemeProvider>

                    <Outlet />
                </Stack>
            </Paper>
        </>
    );
};

export default ProjectSupportPage;
