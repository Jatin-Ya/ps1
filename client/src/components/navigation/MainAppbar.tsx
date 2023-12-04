import {
    AppBar,
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/logo.jpeg";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getBackendBaseUrl } from "../../utils/backendFunctions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GithubButton from "../github/GithubButton";

interface MainAppbarProps {
    isAuth: boolean;
    role: string;
    onLogoClick?: () => void;
    onLoginClick?: () => void;
    onSearchClick?: () => void;
    onNotificationsClick?: () => void;
    onProfileClick?: () => void;
    onAllProjectsClick?: () => void;
    onAllTeamsClick?: () => void;
}

const MainAppbar: React.FC<MainAppbarProps> = ({
    isAuth,
    role,
    onLogoClick = () => {},
    onSearchClick = () => {},
    onNotificationsClick = () => {},
    onProfileClick = () => {},
    onAllProjectsClick = () => {},
    onAllTeamsClick = () => {},
}) => {
    const handleLogoClick = () => {
        onLogoClick();
    };

    const handleSearchClick = () => {
        onSearchClick();
    };

    const handleNotificationsClick = () => {
        onNotificationsClick();
    };

    const handleProfileClick = () => {
        onProfileClick();
    };

    const handleAllProjectsClick = () => {
        onAllProjectsClick();
    };

    const handleAllTeamsClick = () => {
        onAllTeamsClick();
    };

    const handleLoginCkick = () => {
        onLogoClick();
    };

    const projectOptionMenu = (
        <>
            <Button color="inherit" onClick={handleAllProjectsClick}>
                <Typography variant="inherit" color="black">
                    All Projects
                </Typography>
            </Button>
            <Button color="inherit" onClick={handleAllTeamsClick}>
                <Typography variant="inherit" color="black">
                    All Teams
                </Typography>
            </Button>
        </>
    );

    const userOptionMenu = (
        <>
            <IconButton sx={{ color: "black" }} onClick={handleSearchClick}>
                <SearchIcon fontSize="large" />
            </IconButton>
            <IconButton
                sx={{ color: "black" }}
                onClick={handleNotificationsClick}
            >
                <NotificationsNoneIcon fontSize="large" />
            </IconButton>
            <IconButton sx={{ color: "black" }} onClick={handleProfileClick}>
                <AccountCircleIcon fontSize="large" />
            </IconButton>
        </>
    );

    const authButtons = (
        <>
            <Button
                variant="contained"
                sx={{ borderRadius: "20px" }}
                onClick={handleLoginCkick}
            >
                Login
            </Button>
            <Button variant="outlined" sx={{ borderRadius: "20px" }}>
                Signup
            </Button>
        </>
    );

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#fff",
            }}
        >
            <Toolbar>
                <Box flexGrow={1} display={"flex"} alignItems={"center"}>
                    <Box
                        component="img"
                        src={logo}
                        sx={{
                            height: 50,
                            cursor: "pointer",
                            aspectRatio: "inherit",
                        }}
                    />
                </Box>
                <Stack direction="row" spacing={2} alignItems="center">
                    {isAuth && (
                        <>
                            <GithubButton />
                            {projectOptionMenu}
                        </>
                    )}
                    <Divider orientation="vertical" flexItem />
                    {isAuth ? userOptionMenu : authButtons}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default MainAppbar;
