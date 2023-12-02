import {
    AppBar,
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
import React from "react";

interface MainAppbarProps {
    onLogoClick?: () => void;
    onSearchClick?: () => void;
    onNotificationsClick?: () => void;
    onProfileClick?: () => void;
    onAllProjectsClick?: () => void;
    onAllTeamsClick?: () => void;
}

const MainAppbar: React.FC<MainAppbarProps> = ({
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

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#fff",
            }}
        >
            <Toolbar>
                <Typography
                    variant="h4"
                    color="black"
                    flexGrow={1}
                    onClick={handleLogoClick}
                >
                    Header
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
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
                    <Divider orientation="vertical" flexItem />
                    <IconButton
                        sx={{ color: "black" }}
                        onClick={handleSearchClick}
                    >
                        <SearchIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                        sx={{ color: "black" }}
                        onClick={handleNotificationsClick}
                    >
                        <NotificationsNoneIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                        sx={{ color: "black" }}
                        onClick={handleProfileClick}
                    >
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default MainAppbar;
