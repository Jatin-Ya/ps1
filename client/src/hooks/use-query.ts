import axios from "axios";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../store/project/project-slice";
import { parseProject } from "./use-project";
import { StoreData } from "../store/store";
import { ProjectData } from "../store/project/types";

const useQuery = (projectId: string) => {
    const dispatch = useDispatch();
    const { queries } = useSelector<StoreData, ProjectData>(
        (state) => state.project
    );
    const escalateQuery = async (query: string, solution: string) => {
        const url = getBackendBaseUrl();
        const response = await axios.post(`${url}/projects/query/escalate`, {
            projectId,
            query,
            solution,
        });

        console.log(response.data);

        const project = parseProject(response.data);
        console.log(project);
        dispatch(setProject(project));
    };

    const resolveQuery = async (queryId: string, solution: string) => {
        const url = getBackendBaseUrl();
        const response = await axios.post(`${url}/projects/query/resolve`, {
            projectId,
            queryId,
            solution,
        });

        const project = parseProject(response.data);
        dispatch(setProject(project));
    };

    return {
        queries,
        escalateQuery,
        resolveQuery,
    };
};

export default useQuery;
