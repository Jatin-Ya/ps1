import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { RepoFile, useRepoFiles } from "../../../hooks/use-repo-files";
import { useParams } from "react-router-dom";

interface RepoFileProps {
    onSelect: (file: RepoFile) => void;
}

const RepoFiles: React.FC<RepoFileProps> = ({ onSelect }) => {
    const projectId = useParams().id;

    const { repoFiles } = useRepoFiles(projectId as string);

    const handleFileClick = (file: RepoFile) => {
        onSelect(file);
    };

    const listItems = repoFiles.map((file) => (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleFileClick(file)}>
                    <ListItemText primary={file.name} secondary={file.path} />
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    ));

    return (
        <Stack flex={1} paddingX={2}>
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
