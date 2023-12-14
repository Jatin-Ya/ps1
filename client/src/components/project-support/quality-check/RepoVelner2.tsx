import {
    Chip,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
} from "@mui/material";
import {
    Vulnerability,
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
    vulnerabilities: Vulnerability[];
    onSelect: (vulnerability: Vulnerability) => void;
}

const RepoVelner2: React.FC<RepoVulnerabilitiesProps> = ({
    vulnerabilities,
    onSelect,
}) => {
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
                {listItems}
            </List>
        </Stack>
    );
};

export default RepoVelner2;
