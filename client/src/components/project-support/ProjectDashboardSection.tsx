import {
    Box,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    LinearProgress,
    LinearProgressProps,
    MenuItem,
    Select,
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

function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

const ProjectDashboardSection = () => {
    const projectData = useSelector<StoreData, ProjectState>(
        (state) => state.project
    );

    const [assignUserInputText, setAssignUserInputText] = useState("");
    const [selectedRepoId, setSelectedRepoId] = useState("");
    const { repos } = useRepos(projectData.manager, true);
    const assignedUserEmails = projectData.users.map((user) => user.email);

    const assignUserInputChangeHandler = (text: string) => {
        setAssignUserInputText(text);
    };

    const assignUserHandler = (user: string) => {
        console.log({ assignUser: user });
    };

    const removeUserHandler = (user: string) => {
        console.log({ removeUser: user });
    };

    const connectRepoHandler = () => {
        const repoToConnect = repos.find((repo) => repo.id === selectedRepoId);
        if (!repoToConnect) return;

        // Connect repo to project
        console.log({ connectRepo: repoToConnect });
    };

    const menuItems = repos.map((repo) => (
        <MenuItem key={repo.id} value={repo.id}>
            {repo.name}
        </MenuItem>
    ));

    return (
        <Stack spacing={4} paddingX={2} width={"100%"}>
            <Typography variant="h4">Project Dashboard</Typography>
            <Stack spacing={4} direction={{ xs: "column", sm: "row" }} flex={1}>
                <Stack flex={1} minWidth={200} spacing={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Repo
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedRepoId}
                            onChange={(e) => setSelectedRepoId(e.target.value)}
                            label="Age"
                            startAdornment={
                                <IconButton
                                    size="small"
                                    onClick={connectRepoHandler}
                                >
                                    <LinkIcon />
                                </IconButton>
                            }
                        >
                            {menuItems}
                        </Select>
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
                    <AssignUserComponent
                        assignedUsers={assignedUserEmails}
                        inputValue={assignUserInputText}
                        onAddUser={assignUserHandler}
                        onInputChange={assignUserInputChangeHandler}
                        onRemoveUser={removeUserHandler}
                    />
                </Stack>
            </Stack>
            <LinearProgressWithLabel value={projectData.progress} />
        </Stack>
    );
};

export default ProjectDashboardSection;
