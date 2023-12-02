import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";

import ProjectSupportPage from "./pages/ProjectSupportPage";

function App() {
    return (
        <>
            <Navbar>
                <Routes>
                    <Route
                        path="*"
                        element={<Navigate to="/project-support" />}
                    />
                    <Route
                        path="/project-support"
                        element={<ProjectSupportPage />}
                    />
                </Routes>
            </Navbar>
        </>
    );
}

export default App;
