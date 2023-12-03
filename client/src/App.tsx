import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";

import ProjectSupportPage from "./pages/ProjectSupportPage";
import RoadmapSection from "./components/roadmap/RoadmapSection";

function App() {
    return (
        <>
            <Navbar>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="project-support" />}
                    />
                    <Route
                        path="project-support"
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
                </Routes>
            </Navbar>
        </>
    );
}

export default App;
