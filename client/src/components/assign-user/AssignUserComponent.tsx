import {
    Avatar,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    OutlinedInput,
} from "@mui/material";
import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

interface AssignUserComponentProps {
    inputValue: string;
    assignedUsers: string[];
    onInputChange: (text: string) => void;
    onAddUser: (user: string) => void;
    onRemoveUser: (user: string) => void;
}

const AssignUserComponent: React.FC<AssignUserComponentProps> = ({
    inputValue,
    assignedUsers,
    onInputChange,
    onAddUser,
    onRemoveUser,
}) => {
    const assignUserInputRef = useRef<HTMLInputElement>(null!);

    const assignUserHandler = () => {
        const user = inputValue;

        const validUser =
            user &&
            user !== "" &&
            assignedUsers.find((u) => u === user) === undefined;

        if (validUser) {
            onAddUser(user);
        }
    };

    const removeUserHandler = (user: string) => {
        onRemoveUser(user);
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onInputChange(value);
    };

    const assignedUserListItems = assignedUsers.map((user) => (
        <ListItem
            key={user}
            secondaryAction={
                <IconButton onClick={removeUserHandler.bind(this, user)}>
                    <CloseIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText primary={user} />
            </ListItemButton>
        </ListItem>
    ));

    return (
        <>
            <FormControl size="small">
                <InputLabel>Assign User</InputLabel>
                <OutlinedInput
                    label="Assign User"
                    inputRef={assignUserInputRef}
                    onChange={inputChangeHandler}
                    value={inputValue}
                    endAdornment={
                        <IconButton size="small" onClick={assignUserHandler}>
                            <AddIcon />
                        </IconButton>
                    }
                />
            </FormControl>
            <List sx={{ overflow: "scroll" }}>{assignedUserListItems}</List>
        </>
    );
};

export default AssignUserComponent;
