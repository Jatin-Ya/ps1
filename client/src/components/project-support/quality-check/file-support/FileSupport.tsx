import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RepoFile } from "../../../../hooks/use-repo-files";
import {
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getBackendBaseUrl } from "../../../../utils/backendFunctions";
import axios from "axios";

const FileSupport = () => {
    const navigate = useNavigate();
    const { file } = useLocation().state as { file: RepoFile };

    // TUSHAR yaha p project id dalna hai
    const projectId = "614b0b4b9b0b8e0016f2b0e1";

    const [review, setReview] = useState("No reviews generated yet");

    const handleGenerateReview = async () => {
        console.log("Generate review");
        const baseUrl = getBackendBaseUrl();
        const response = await axios.get(`${baseUrl}/gpt/generateReview?path=${file.path}&projectId=${projectId}`);
        const review = response.data.review;
        setReview(review);
    };

    return (
        <Stack margin={2} width={"100%"}>
            <Stack direction={"row"} alignItems={"center"}>
                <IconButton size="small">
                    <ArrowBackIosNewIcon
                        onClick={() => navigate(-1)}
                        fontSize={"small"}
                    />
                </IconButton>
                <Typography variant="h5">{file.name}</Typography>
            </Stack>
            <Divider />
            <Stack direction={"row"} marginTop={2} height={"100%"}>
                <Box flex={3}>
                    <Paper variant="outlined" sx={{ margin: 1, fontSize: 12, padding: 1 }}>
                        {file.content}
                    </Paper>
                </Box>
                <Paper
                    elevation={3}
                    sx={{
                        padding: "10px",
                        minWidth: 150,
                        flex: 2,
                        bgcolor: "primary.light",
                    }}
                >
                    <Stack spacing={2} marginX={2} height={"100%"}>
                        <Typography
                            variant="h5"
                            color="white"
                            textAlign={"center"}
                            fontWeight={"bold"}
                        >
                            AI Support
                        </Typography>
                        <Paper
                            sx={{ flex: 1, overflow: "scroll", fontSize: 12 }}
                        >
                            {review}
                        </Paper>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleGenerateReview}
                        >
                            Generate Review
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    );
};

export default FileSupport;
