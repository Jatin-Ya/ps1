import { Tab, Tabs, ThemeProvider, Toolbar } from "@mui/material";
import React from "react";
import { tabsTheme } from "../../theme/theme";
import { useSelector } from "react-redux";
import { StoreData } from "../../store/store";

export enum ProjectSupportTabsEnum {
  ProjectDashboard = "project-dashboard",
  AiSupport = "ai-support",
  TeamChat = "team-chat",
}

export const getEnumFromPath = (path: string) => {
  const pathArr = path.split("/");
  path = pathArr[3];
  switch (path) {
    case ProjectSupportTabsEnum.ProjectDashboard:
      return ProjectSupportTabsEnum.ProjectDashboard;
    case ProjectSupportTabsEnum.AiSupport:
      return ProjectSupportTabsEnum.AiSupport;
    case ProjectSupportTabsEnum.TeamChat:
      return ProjectSupportTabsEnum.TeamChat;
    default:
      return ProjectSupportTabsEnum.ProjectDashboard;
  }
};

interface ProjectSupportTabsProps {
  value: ProjectSupportTabsEnum;
  onChange: (value: ProjectSupportTabsEnum) => void;
}

const ProjectSupportTabs: React.FC<ProjectSupportTabsProps> = ({
  value,
  onChange,
}) => {
  const role = useSelector<StoreData, string>((state) => state.user.role);

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: ProjectSupportTabsEnum
  ) => {
    onChange(newValue);
  };

  return (
    <Toolbar>
      <ThemeProvider theme={tabsTheme}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary">
          <Tab
            value={ProjectSupportTabsEnum.ProjectDashboard}
            label="Project Dashboard"
          />
          {role === "User" && (
            <Tab value={ProjectSupportTabsEnum.AiSupport} label="Ai Support" />
          )}
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
