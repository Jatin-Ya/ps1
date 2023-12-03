import { Stack, Typography } from "@mui/material";

import RoadmapComponent from "./RoadmapComponent";

const DUMMY_DATA = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
];

const RoadmapSection = () => {
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
            <RoadmapComponent content={DUMMY_DATA} />
            <Typography variant="h6" marginX={2}>
                END
            </Typography>
        </Stack>
    );
};

export default RoadmapSection;
