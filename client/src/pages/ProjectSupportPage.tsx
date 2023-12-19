import { Box, Paper } from "@mui/material";
import ProjectSupportTabs, {
  ProjectSupportTabsEnum,
  getEnumFromPath,
} from "../components/navigation/ProjectSupportTabs";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { StoreData } from "../store/store";
import { useState } from "react";
import { useProject } from "../hooks/use-project";

const ProjectSupportPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector<StoreData, boolean>((state) => state.user.isAuth);
  const projectId = useParams().id;

  if (!isAuth) {
    navigate("/login");
  }

  if (projectId === undefined) {
    navigate("/all-projects");
  }

  useProject(projectId as string);

  // const [projectSupportTobValue, setProjectSupportTobValue] = useState(
  //   ProjectSupportTabsEnum.AiSupport
  // );
  const location = useLocation();
  const projectSupportTobValue = getEnumFromPath(location.pathname);
  console.log(projectSupportTobValue);

  const handleProjectSupportTabsChange = (newValue: ProjectSupportTabsEnum) => {
    console.log(newValue);
    navigate(`/project-support/${projectId}/${newValue}`);
  };

  return (
    <>
      <ProjectSupportTabs
        value={projectSupportTobValue}
        onChange={handleProjectSupportTabsChange}
      />
      <Paper
        sx={{
          margin: 2,
          padding: 4,
          borderRadius: 8,
          flexGrow: 1,
          overflow: "scroll",
          maxHeight: "70vh",
        }}
      >
        {/* <Box sx={{ overflow: "scroll", maxHeight: "70vh" }}> */}
        {/* {isProjectLoaded ? <Outlet /> : <div>Loading...</div>} */}
        <Outlet />
        {/* </Box> */}
      </Paper>
    </>
  );
};

export default ProjectSupportPage;
