import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllProjects } from "../../hooks/use-all-projects";
import { useSelector } from "react-redux";
import { StoreData } from "../../store/store";
import { UserData } from "../../store/user/types";

// const DUMMY_PROJECTS = [
//     {
//         projectName: "Project 1",
//         projectDescription: "Project 1 description",
//         projectId: "1",
//     },
//     {
//         projectName: "Project 2",
//         projectDescription: "Project 3 description",
//         projectId: "2",
//     },
//     {
//         projectName: "Project 3",
//         projectDescription: "Project 3 description",
//         projectId: "3",
//     },
// ];

const AllProjectsSection = () => {
  // const [projects, setProjects] = useState(DUMMY_PROJECTS);
  const { id } = useSelector<StoreData, UserData>((state) => state.user);
  const { allProjects: projects } = useAllProjects(id);

  const navigate = useNavigate();

  const projectClickHandler = (projectId: string) => {
    navigate("/project-support/" + projectId);
  };

  const projectListItems = projects.map((project) => {
    const remainingText =
      project.projectDescription.slice(
        0,
        Math.min(100, project.projectDescription.length)
      ) + "...";
    return (
      <ListItem key={project.projectId} disablePadding>
        <ListItemButton
          onClick={projectClickHandler.bind(this, project.projectId)}
        >
          <ListItemText
            primary={project.projectName}
            secondary={remainingText}
            sx={{ maxHeight: 100, overflow: "hidden" }}
          />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Stack paddingX={2} width={"100%"}>
      <Typography variant="h4">All Projects</Typography>
      <Divider />
      <List>{projectListItems}</List>
    </Stack>
  );
};

export default AllProjectsSection;
