import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { StoreData } from "../../store/store";

import AssignUserComponent from "../assign-user/AssignUserComponent";
import { getBackendBaseUrl } from "../../utils/backendFunctions";
import axios from "axios";

const NewProjectSection = () => {
    const email = useSelector<StoreData, string>((state) => state.user.email);

    const managerInputRef = useRef<HTMLInputElement>(null!);
    const projectNameInputRef = useRef<HTMLInputElement>(null!);
    const projectDescriptionInputRef = useRef<HTMLInputElement>(null!);
    const projectGuidlinesInputRef = useRef<HTMLInputElement>(null!);

    const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
    const [assignUserInputText, setAssignUserInputText] = useState("");

    const assignUserInputChangeHandler = (text: string) => {
        setAssignUserInputText(text);
    };

    const assignUserHandler = (user: string) => {
        setAssignedUsers((prevState) => [...prevState, user]);
    };

    const removeUserHandler = (user: string) => {
        setAssignedUsers((prevState) => prevState.filter((u) => u !== user));
    };

    const submitHandler = async() => {
        const projectName = projectNameInputRef.current.value;
        const projectDescription = projectDescriptionInputRef.current.value;
        const projectGuidlines = projectGuidlinesInputRef.current.value;
        const manager = managerInputRef.current.value;

        const projectData = {
            projectName,
            projectDescription,
            projectGuidlines,
            manager,
            assignedUsers,
        };

        console.log(projectData);
        const baseUrl = getBackendBaseUrl();
        try{
            const body = {
                title: projectName, description: projectDescription, guidlines: projectGuidlines, manager_email: manager, users: assignedUsers
            }
            const response = await axios.post(
                `${baseUrl}/api/v1/projects`, body
            )
            console.log(response);
        }
        catch (e){
            console.log(e);
        }
    };

    return (
        <Stack spacing={4} paddingX={2} width={"100%"}>
            <Typography variant="h4">New Project</Typography>
            <Stack spacing={4} direction={{ xs: "column", sm: "row" }} flex={1}>
                <Stack flex={1} minWidth={200} spacing={4}>
                    <TextField
                        label="Project Name"
                        inputRef={projectNameInputRef}
                        size="small"
                    />
                    <TextField
                        label="Project Description"
                        multiline
                        minRows={4}
                        maxRows={4}
                        fullWidth
                        size="small"
                        inputRef={projectGuidlinesInputRef}
                    />
                    <TextField
                        label="Project Guidlines"
                        multiline
                        minRows={4}
                        maxRows={4}
                        fullWidth
                        size="small"
                        inputRef={projectDescriptionInputRef}
                    />
                    <TextField
                        disabled
                        value={email}
                        label="Manager"
                        inputRef={managerInputRef}
                        size="small"
                    />
                </Stack>
                <Divider />
                <Stack flex={1} minWidth={200} spacing={4}>
                    <AssignUserComponent
                        assignedUsers={assignedUsers}
                        inputValue={assignUserInputText}
                        onAddUser={assignUserHandler}
                        onInputChange={assignUserInputChangeHandler}
                        onRemoveUser={removeUserHandler}
                    />
                </Stack>
            </Stack>
            <Stack direction="row-reverse" spacing={2}>
                <Button
                    variant="contained"
                    color="success"
                    disableElevation
                    onClick={submitHandler}
                >
                    Create Project
                </Button>
                <Button variant="outlined" color="inherit" disableElevation>
                    Clear
                </Button>
            </Stack>
        </Stack>
    );
};

export default NewProjectSection;
