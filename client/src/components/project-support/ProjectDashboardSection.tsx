import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  LinearProgress,
  LinearProgressProps,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AssignUserComponent from "../assign-user/AssignUserComponent";
import { useSelector } from "react-redux";
import { StoreData } from "../../store/store";
import { useState } from "react";
import { ProjectState } from "../../store/project/types";
import LinkIcon from "@mui/icons-material/Link";
import { useRepos } from "../../hooks/use-repos";
import { getBackendBaseUrl } from "../../utils/backendFunctions";
import axios from "axios";
import { useUpdateProject } from "../../hooks/use-update-project";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ProjectDashboardSection = () => {
  console.log("TEST");
  const projectData = useSelector<StoreData, ProjectState>(
    (state) => state.project
  );
  const email = useSelector<StoreData, string>((state) => state.user.email);

  const [assignUserInputText, setAssignUserInputText] = useState("");
  const [selectedRepoId, setSelectedRepoId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { repos } = useRepos(email);
  console.log(projectData);
  const assignedUserEmails = projectData.users.map((user) => user.email);

  const { addUser, removeUser } = useUpdateProject(projectData.id);

  const assignUserInputChangeHandler = (text: string) => {
    setAssignUserInputText(text);
  };

  const assignUserHandler = async (user: string) => {
    addUser(user);
  };

  const removeUserHandler = async (user: string) => {
    removeUser(user);
  };

  const connectRepoHandler = async () => {
    setIsDisabled(true);
    const repoToConnect = repos.find((repo) => repo.id === selectedRepoId);
    if (!repoToConnect) return;

    const projectId = projectData.id;

    const baseUrl = getBackendBaseUrl();

    try {
      const response = await axios.patch(`${baseUrl}/projects/connectRepo`, {
        id: projectId,
        repoName: repoToConnect.name,
        repoOwner: repoToConnect.owner,
        repoUrl: repoToConnect.url,
        repoId: repoToConnect.id,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }

    console.log({ connectRepo: repoToConnect });
  };

//   const milestoneCheckboxes = projectData.milestones.map((milestone, index) => (
//     <FormControlLabel
//       key={index}
//       control={<Checkbox checked={milestone.status === "DONE"} />}
//       label={`Milestone ${index + 1}`}
//     />
//   ));

  return (
    <Stack spacing={4} paddingX={2} width={"100%"}>
      <Typography variant="h4">Project Dashboard</Typography>
      <Stack spacing={4} direction={{ xs: "column", sm: "row" }} flex={1}>
        <Stack flex={1} minWidth={200} spacing={4}>
          <FormControl fullWidth disabled>
            <InputLabel id="demo-simple-select-label">Repo</InputLabel>
            <OutlinedInput
              disabled
              id="demo-simple-select"
              value={
                projectData.repoDetails ? projectData.repoDetails.repoName : ""
              }
              label="Age"
              startAdornment={
                <IconButton
                  size="small"
                  onClick={connectRepoHandler} //connect repo here
                >
                  <LinkIcon />
                </IconButton>
              }
            ></OutlinedInput>
          </FormControl>
          <TextField
            label="Project Name"
            size="small"
            value={projectData.title}
            disabled
          />
          <TextField
            label="Project Description"
            multiline
            value={projectData.description}
            minRows={4}
            maxRows={4}
            fullWidth
            disabled
            size="small"
          />
          <TextField
            label="Project Guidlines"
            multiline
            minRows={4}
            maxRows={4}
            value={projectData.guidlines}
            fullWidth
            disabled
            size="small"
          />
          <TextField
            disabled
            value={projectData.manager}
            label="Manager"
            size="small"
          />
        </Stack>
        <Divider />
        <Stack flex={1} minWidth={200} spacing={4}>
          <Box flex={1}>
            <AssignUserComponent
              assignedUsers={assignedUserEmails}
              inputValue={assignUserInputText}
              onAddUser={assignUserHandler}
              onInputChange={assignUserInputChangeHandler}
              onRemoveUser={removeUserHandler}
            />
          </Box>
          {/* {milestoneCheckboxes} */}
        </Stack>
      </Stack>
      <LinearProgressWithLabel value={projectData.progress} />
    </Stack>
  );
};

export default ProjectDashboardSection;
