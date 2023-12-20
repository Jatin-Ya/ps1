import RoadmapUnit from "./RoadmapUnit";

interface RoadmapComponentProps {
    content: string[];
}

const RoadmapComponent: React.FC<RoadmapComponentProps> = ({ content }) => {
    const roadmapUnits = content.map((unit, index) => {
        const direction = index % 2 === 0 ? "up" : "down";
        return (
            <RoadmapUnit key={index} direction={direction} index={index}>
                {unit}
            </RoadmapUnit>
        );
    });
    
    return <>{roadmapUnits}</>;
};

export default RoadmapComponent;
