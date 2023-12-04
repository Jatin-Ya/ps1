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
import GitHubIcon from '@mui/icons-material/GitHub';
import { getBackendBaseUrl } from "../../utils/backendFunctions";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface MainAppbarProps {
    onLogoClick?: () => void;
    onSearchClick?: () => void;
    onNotificationsClick?: () => void;
    onProfileClick?: () => void;
    onAllProjectsClick?: () => void;
    onAllTeamsClick?: () => void;
}

const MainAppbar: React.FC<MainAppbarProps> = ({
    onLogoClick = () => { },
    onSearchClick = () => { },
    onNotificationsClick = () => { },
    onProfileClick = () => { },
    onAllProjectsClick = () => { },
    onAllTeamsClick = () => { },
}) => {
    const [isGithubConnected, setIsGithubConnected] = React.useState(false);

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

    const handleGithubLogin = async () => {
        const BEURL = getBackendBaseUrl();
        // await axios(`${BEURL}/auth/github`,{

        // });
        setIsGithubConnected(true);
    }

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
                    {isGithubConnected ?
                        (<Badge
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={<CheckCircleIcon fontSize="small" color="success" />}
                            variant="standard"
                        >
                            <GitHubIcon sx={{color:"black"}} fontSize="large" />
                        </Badge>)
                        :
                        (<Button color="success" variant="contained" sx={{ borderRadius: "20px" }} onClick={handleGithubLogin}>
                            <GitHubIcon sx={{ marginRight: "5px" }} />
                            <Typography variant="inherit">
                                Connect Github
                            </Typography>
                        </Button>)
                    }
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
