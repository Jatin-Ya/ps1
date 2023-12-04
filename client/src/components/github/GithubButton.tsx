import { Badge, Button, Typography } from "@mui/material";
import { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getBackendBaseUrl } from "../../utils/backendFunctions";

const GithubButton = () => {
    const [isGithubConnected, setIsGithubConnected] = useState(false);
    const handleGithubLogin = async () => {
        const BEURL = getBackendBaseUrl();
        // await axios(`${BEURL}/auth/github`,{

        // });
        setIsGithubConnected(true);
    };
    return (
        <>
            {isGithubConnected ? (
                <Badge
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    badgeContent={
                        <CheckCircleIcon fontSize="small" color="success" />
                    }
                    variant="standard"
                >
                    <GitHubIcon sx={{ color: "black" }} fontSize="large" />
                </Badge>
            ) : (
                <Button
                    color="success"
                    variant="contained"
                    sx={{ borderRadius: "20px" }}
                    onClick={handleGithubLogin}
                >
                    <GitHubIcon sx={{ marginRight: "5px" }} />
                    <Typography variant="inherit">Connect Github</Typography>
                </Button>
            )}
        </>
    );
};

export default GithubButton;
