import { Stack, Typography } from "@mui/material";

import RoadmapComponent from "./RoadmapComponent";
import { useParams } from "react-router-dom";
import { useRoadmap } from "../../../hooks/use-roadmap";
import { useSelector } from "react-redux";
import { StoreData } from "../../../store/store";

const RoadmapSection = () => {
    const projectId = useParams().id || "";
    const aiSupport = useSelector<StoreData, boolean>(
        (state) => state.project.aiSupport
    );
    const { roadmapData } = useRoadmap(projectId);
    if (!aiSupport)
        return (
            <Typography variant="h6" textAlign={"center"} width={"100%"}>
                AI Support not available
            </Typography>
        );
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
