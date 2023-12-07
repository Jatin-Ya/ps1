import { Stack, Typography } from "@mui/material";

import RoadmapComponent from "./RoadmapComponent";
import { useParams } from "react-router-dom";
import { useRoadmap } from "../../../hooks/use-roadmap";

const RoadmapSection = () => {
    const projectId = useParams().id;
    const { roadmapData } = useRoadmap(projectId);
    return (
        <Stack
            direction={"row"}
            marginX={2}
            alignItems={"center"}
            height={"100%"}
            overflow={"scroll"}
        >
            <Typography variant="h6" marginX={2}>
                START
            </Typography>
            <RoadmapComponent content={roadmapData} />
            <Typography variant="h6" marginX={2}>
                END
            </Typography>
        </Stack>
    );
};

export default RoadmapSection;
