import { useEffect, useState } from "react";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";

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
        const baseUrl = getBackendBaseUrl();
        const response = await axios.get(`${baseUrl}/api/v1/gpt/roadmap?projectId=${projectId}`);
        const roadmapData = response.data.roadmap;
        return roadmapData;
    };

    useEffect(() => {
        getRoadmapData().then((roadmapData) => setRoadmapData(roadmapData));
    }, [projectId]);

    return { roadmapData };
};
