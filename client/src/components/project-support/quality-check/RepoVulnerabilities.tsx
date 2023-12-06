import {
    Chip,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
    Vulnerability,
    useVelnerabilities,
} from "../../../hooks/use-vulnerabilities";

const colorFromSeverity = (severity: string) => {
    switch (severity) {
        case "high":
            return "error";
        case "medium":
            return "warning";
        case "low":
            return "success";
        default:
            return "default";
    }
};

interface RepoVulnerabilitiesProps {
    onSelect: (vulnerability: Vulnerability) => void;
}

const RepoVulnerabilities: React.FC<RepoVulnerabilitiesProps> = ({
    onSelect,
}) => {
    const projectId = useParams().id;

    const { vulnerabilities } = useVelnerabilities(projectId as string);

    const handleVulnerabilityClick = (vulnerability: Vulnerability) => {
        onSelect(vulnerability);
    };

    const listItems = vulnerabilities.map((vulnerability) => (
        <>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={() => handleVulnerabilityClick(vulnerability)}
                >
                    <ListItemText
                        primary={vulnerability.title}
                        secondary={vulnerability.description}
                    />
                    <Chip
                        label={vulnerability.severity}
                        size="small"
                        variant="outlined"
                        color={colorFromSeverity(vulnerability.severity)}
                    />
                </ListItemButton>
            </ListItem>
            <Divider />
        </>
    ));

    return (
        <Stack flex={1} paddingX={2}>
            <List>
                <ListItem>
                    <Typography variant="h5">Vulnerabilities</Typography>
                </ListItem>
                <Divider />
                {listItems}
            </List>
        </Stack>
    );
};

export default RepoVulnerabilities;
