import { useEffect, useState } from "react";

const DUMMY_DATA = [
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
];

export const useRoadmap = (projectId: string) => {
    const [roadmapData, setRoadmapData] = useState<string[]>([]);

    const getRoadmapData = async (): Promise<string[]> => {
        // Get roadmap data from backend
        return DUMMY_DATA;
    };

    useEffect(() => {
        getRoadmapData().then((roadmapData) => setRoadmapData(roadmapData));
    }, [projectId]);

    return { roadmapData };
};
