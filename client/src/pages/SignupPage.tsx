import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import {
    Box,
    Button,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

const SignupPage = () => {
    const navigate = useNavigate();

    const usernameInputRef = useRef<HTMLInputElement>(null!);
    const emailInputRef = useRef<HTMLInputElement>(null!);
    const passwordInputRef = useRef<HTMLInputElement>(null!);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null!);
    const [role, setRole] = useState<"Manager" | "User">("Manager");

    const { signup } = useAuth();

    const handleSignup = () => {
        const email = emailInputRef.current.value;
        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef.current.value;
        console.log("signup");

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            emailInputRef.current.value = "";
            usernameInputRef.current.value = "";
            passwordInputRef.current.value = "";
            confirmPasswordInputRef.current.value = "";
            return;
        }

        signup(username, email, password, role)
            .then(() => navigate("/login"))
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper>
                <Stack marginY={2} marginX={4} minWidth={400}>
                    <Typography variant="h4" marginX="auto" marginY={2}>
                        Signup
                    </Typography>

                    <TextField
                        placeholder="Username"
                        variant="outlined"
                        size="small"
                        sx={{ marginY: 2 }}
                        type="email"
                        inputRef={usernameInputRef}
                    />
                    <TextField
                        placeholder="Email"
                        variant="outlined"
                        size="small"
                        sx={{ marginY: 2 }}
                        type="email"
                        inputRef={emailInputRef}
                    />
                    <TextField
                        placeholder="Password"
                        variant="outlined"
                        size="small"
                        sx={{ marginY: 2 }}
                        type="password"
                        inputRef={passwordInputRef}
                    />
                    <TextField
                        placeholder="Confirm Password"
                        variant="outlined"
                        size="small"
                        sx={{ marginY: 2 }}
                        type="password"
                        inputRef={confirmPasswordInputRef}
                    />
                    <Select
                        placeholder="Role"
                        size="small"
                        value={role}
                        sx={{ marginY: 2 }}
                        onChange={(e) =>
                            setRole(e.target.value as "Manager" | "User")
                        }
                    >
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </Select>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        marginTop={2}
                    >
                        <Button
                            variant="contained"
                            onClick={handleSignup}
                            disableElevation
                        >
                            Signup
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default SignupPage;
