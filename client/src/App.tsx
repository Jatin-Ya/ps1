import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";

import ProjectSupportPage from "./pages/ProjectSupportPage";
import Dashboard from "./pages/Dashboard";
import RoadmapSection from "./components/roadmap/RoadmapSection";
import LoginPage from "./pages/LoginPage";
import AllProjects from "./pages/AllProjects";
import AllProjectsSection from "./components/all-projects/AllProjectsSection";
import NewProjectSection from "./components/all-projects/NewProjectSection";

function App() {
    return (
        <>
            <Navbar>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="project-support" />}
                    />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="all-projects" element={<AllProjects />}>
                        <Route path="" element={<AllProjectsSection />} />
                        <Route
                            path="new-project"
                            element={<NewProjectSection />}
                        />
                    </Route>
                    <Route
                        path="project-support/:id"
                        element={<ProjectSupportPage />}
                    >
                        <Route path="" element={<Navigate to="roadmap" />} />
                        <Route path="roadmap" element={<RoadmapSection />} />
                        <Route
                            path="quality-check"
                            element={<div>Quality check</div>}
                        />
                        <Route
                            path="raise-query"
                            element={<div>Raise query</div>}
                        />
                    </Route>
                    <Route path="dashboard" element={<Dashboard />} />
                </Routes>
            </Navbar>
        </>
    );
}

export default App;
