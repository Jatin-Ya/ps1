import { Stack, Tab, Tabs, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { tabsTheme } from "../../theme/theme";

enum AISupportEnum {
    Roadmap = "roadmap",
    QualityCheck = "quality-check",
    RaiseQuery = "raise-query",
    None = "",
}

const AISupportSection = () => {
    const projectId = useParams().id;
    const navigate = useNavigate();

    const [aiSupportTabsValue, setAiSupportTabsValue] = useState(
        AISupportEnum.Roadmap
    );

    const handleAiSupportTabsChange = (
        _: React.SyntheticEvent,
        newValue: AISupportEnum
    ) => {
        setAiSupportTabsValue(newValue);
        navigate(`/project-support/${projectId}/ai-support/${newValue}`);
    };

    return (
        <Stack direction="row" height={"100%"}>
            <ThemeProvider theme={tabsTheme}>
                <Tabs
                    orientation="vertical"
                    value={aiSupportTabsValue}
                    onChange={handleAiSupportTabsChange}
                    sx={{ minWidth: 150 }}
                >
                    <Tab
                        value={AISupportEnum.Roadmap}
                        label="Roadmap"
                        sx={{ marginY: 1 }}
                    />
                    <Tab
                        value={AISupportEnum.QualityCheck}
                        label="Quality check"
                        sx={{ marginY: 1 }}
                    />
                    <Tab
                        value={AISupportEnum.RaiseQuery}
                        label="Raise Query"
                        sx={{ marginY: 1 }}
                    />
                </Tabs>
            </ThemeProvider>

            <Outlet />
        </Stack>
    );
};

export default AISupportSection;
