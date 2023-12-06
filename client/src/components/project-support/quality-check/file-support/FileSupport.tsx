import React from "react";
import { useLocation } from "react-router-dom";
import { RepoFile } from "../../../../hooks/use-repo-files";

const FileSupport = () => {
    const { file } = useLocation().state as { file: RepoFile };
    return <div>FileSupport {file.content}</div>;
};

export default FileSupport;
