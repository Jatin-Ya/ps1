import { Box, Divider, Stack } from "@mui/material";
// import React from "react";
import RepoFiles from "./RepoFiles";
import RepoVulnerabilities from "./RepoVulnerabilities";
import { useLocation, useNavigate } from "react-router-dom";
import { RepoFile } from "../../../hooks/use-repo-files";
import { Vulnerability } from "../../../hooks/use-vulnerabilities";

const QualityChackSection = () => {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const repoFileSelectHandler = (file: RepoFile) => {
        navigate(`${location}/file-support`, { state: { file } });
    };

    const repoVulnerabilitiesSelectHandler = (vulnerability: Vulnerability) => {
        navigate(`${location}/vulnerability-support`, {
            state: { vulnerability },
        });
    };

    return (
        <Stack direction={"row"} width={"100%"} paddingLeft={4}>
            <Divider orientation="vertical" />
            <Box flex={1} overflow={"scroll"}>
                <RepoFiles onSelect={repoFileSelectHandler} />
            </Box>
            <Divider orientation="vertical" />
            <Box flex={1} overflow={"scroll"}>
                <RepoVulnerabilities
                    onSelect={repoVulnerabilitiesSelectHandler}
                />
            </Box>
            <Divider orientation="vertical" />
        </Stack>
    );
};

export default QualityChackSection;
