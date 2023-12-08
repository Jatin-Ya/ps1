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
import { useRef, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const emailInputRef = useRef<HTMLInputElement>(null!);
    const passwordInputRef = useRef<HTMLInputElement>(null!);
    const [role, setRole] = useState<"Manager" | "User">("Manager");

    const { login } = useAuth();

    const handleLogin = () => {
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        login(email, password, role)
            .then(() => navigate("/all-projects"))
            .catch((err) => {
                alert(err?.msg || "Authentication Failed");
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
                        Login
                    </Typography>

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
                            onClick={handleLogin}
                            disableElevation
                        >
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/signup")}
                        >
                            Signup
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default LoginPage;
