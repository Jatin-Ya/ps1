import { Badge, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getBackendBaseUrl } from "../../utils/backendFunctions";
import axios from "axios";
import { useSelector } from "react-redux";
import { StoreData } from "../../store/store";

const GithubButton = () => {
    const [isGithubConnected, setIsGithubConnected] = useState(false);
    const userId = useSelector<StoreData, string>((state) => state.user.id);

    useEffect(() => {
        if (userId === "") {
            console.log("User not logged in");
            return;
        }

        const fetchGithubStatus = async () => {
            const BEURL = getBackendBaseUrl();
            const { data } = await axios.get(`${BEURL}/users/github/${userId}`);
            setIsGithubConnected(data.linked);
            // setIsGithubConnected(data.isGithubConnected);
        };
        fetchGithubStatus();
    }, [userId]);

    const handleGithubLogin = async () => {
        const BEURL = getBackendBaseUrl();
        try {
            const query = new URLSearchParams({ id: userId });
            const response = await axios(`${BEURL}/auth/github?${query}`, {});

            const url = response.data.url;

            window.location.href = url;

            setIsGithubConnected(true);
        } catch (err) {
            console.log(err);
        }
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
