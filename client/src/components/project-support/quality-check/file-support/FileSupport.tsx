import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { StoreData } from "../../../../store/store";
import {
  getFileContents,
  getFileName,
} from "../../../../helper/GithubFuncions";

const FileSupport = () => {
  const navigate = useNavigate();
  const projectId = useSelector<StoreData, string>((state) => state.project.id);
  const { filePath } = useLocation().state as { filePath: string };
  const [fileContent, setFileContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // TUSHAR yaha p project id dalna hai

  const [review, setReview] = useState("No reviews generated yet");

  const handleGenerateReview = async () => {
    console.log("Generate review");
    const baseUrl = getBackendBaseUrl();
    // setReview("All looks great");
    // return;
    setIsLoading(true);
    const response = await axios.get(
      `${baseUrl}/gpt/generateReiew?path=${filePath}&projectId=${projectId}`
    );
    setIsLoading(false);
    const review = response.data.review;
    setReview(review);
  };

  useEffect(() => {
    getFileContents(projectId, filePath).then((file) => {
      setFileContent(file.content);
    });
  }, [filePath]);

  return (
    <Stack margin={2} width={"100%"}>
      <Stack direction={"row"} alignItems={"center"}>
        <IconButton size="small">
          <ArrowBackIosNewIcon
            onClick={() => navigate(-1)}
            fontSize={"small"}
          />
        </IconButton>
        <Typography variant="h5">{getFileName(filePath)}</Typography>
      </Stack>
      <Divider />
      <Stack direction={"row"} marginTop={2} height={"100%"}>
        <Box flex={3}>
          <Paper
            variant="outlined"
            sx={{ margin: 1, fontSize: 12, padding: 1, whiteSpace: "pre-line" }}
          >
            {fileContent}
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
              sx={{
                flex: 1,
                overflow: "scroll",
                fontSize: 12,
                whiteSpace: "pre-line",
              }}
            >
              {!isLoading ? review : "Generating..."}
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
