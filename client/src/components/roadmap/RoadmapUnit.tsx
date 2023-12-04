import { Box, Stack, Typography } from "@mui/material";

interface RoadmapUnitProps {
    children?: React.ReactNode;
    direction?: "up" | "down";
}

const RoadmapUnit: React.FC<RoadmapUnitProps> = ({
    children,
    direction = "up",
}) => {
    const stackDirection = direction === "up" ? "column" : "column-reverse";

    const boxBorderTop = direction === "up" ? "1px solid #000000" : "none";
    const boxBorderBottom = direction === "up" ? "none" : "1px solid #000000";

    return (
        <Stack
            minWidth={150}
            maxWidth={500}
            height={"100%"}
            className="Test"
            direction={stackDirection}
        >
            <Stack flex={1} direction={stackDirection}>
                <Box sx={{ maxHeight: 200, overflow: "scroll" }}>
                    <Typography margin={2}>{children}</Typography>
                </Box>
                <Stack direction={"row"} flex={1}>
                    <Box sx={{ borderRight: "1px solid black", flex: 1 }}></Box>
                    <Box flex={1}></Box>
                </Stack>
            </Stack>
            <Box
                sx={{ borderTop: boxBorderTop, borderBottom: boxBorderBottom }}
                flex={1}
            ></Box>
        </Stack>
    );
};

export default RoadmapUnit;
