import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";

import ProjectSupportPage from "./pages/ProjectSupportPage";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <>
            <Navbar>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" />}
                    />
                    <Route
                        path="project-support"
                        element={<ProjectSupportPage />}
                    >
                        <Route path="roadmap" element={<div>Roadmap</div>} />
                        <Route
                            path="quality-check"
                            element={<div>Quality check</div>}
                        />
                        <Route
                            path="raise-query"
                            element={<div>Raise query</div>}
                        />
                    </Route>
                    <Route
                        path="dashboard"
                        element={ <Dashboard/> }
                    />
                </Routes>
            </Navbar>
        </>
    );
}

export default App;
