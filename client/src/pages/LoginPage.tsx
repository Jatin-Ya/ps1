import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useRef } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const emailInputRef = useRef<HTMLInputElement>(null!);
    const passwordInputRef = useRef<HTMLInputElement>(null!);

    const { login } = useAuth();

    const handleLogin = () => {
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        login(email, password)
            .then(() => navigate("/all-projects"))
            .catch((err) => {
                alert(err?.msg || "Authentication Failed")
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
                        <Button variant="outlined">Signup</Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default LoginPage;
