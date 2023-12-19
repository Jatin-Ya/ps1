import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useRepoFiles } from "../../../hooks/use-repo-files";
import { useParams } from "react-router-dom";
import { getFileName } from "../../../helper/GithubFuncions";

interface RepoFileProps {
  onSelect: (filePath: string) => void;
}

const RepoFiles: React.FC<RepoFileProps> = ({ onSelect }) => {
  const projectId = useParams().id;

  const { repoFilePaths } = useRepoFiles(projectId as string);

    
  const handleFileClick = (filePath: string) => {
    onSelect(filePath);
  };

  const listItems = repoFilePaths.map((filePath) => (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleFileClick(filePath)}>
          <ListItemText primary={getFileName(filePath)} secondary={filePath} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  ));

  return (
    <Stack flex={1} paddingX={2} overflow={"scroll"} maxHeight={"70vh"}>
      <List>
        <ListItem>
          <Typography variant="h5">Repo Files</Typography>
        </ListItem>
        <Divider />
        {listItems}
      </List>
    </Stack>
  );
};

export default RepoFiles;
