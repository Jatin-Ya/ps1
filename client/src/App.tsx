import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";

import ProjectSupportPage from "./pages/ProjectSupportPage";
import Dashboard from "./pages/Dashboard";
import RoadmapSection from "./components/project-support/roadmap/RoadmapSection";
import LoginPage from "./pages/LoginPage";
import AllProjects from "./pages/AllProjects";
import AllProjectsSection from "./components/all-projects/AllProjectsSection";
import NewProjectSection from "./components/all-projects/NewProjectSection";
import AISupportSection from "./components/project-support/AISupportSection";
import ProjectDashboardSection from "./components/project-support/ProjectDashboardSection";
import QualityChackSection from "./components/project-support/quality-check/QualityChackSection";
import FileSupport from "./components/project-support/quality-check/file-support/FileSupport";
import VulnerabilitySupport from "./components/project-support/quality-check/vulnerability-support/VulnerabilitySupport";
import SignupPage from "./pages/SignupPage";
import RaiseQuery from "./components/project-support/RaiseQuery";
import { useSelector } from "react-redux";
import { StoreData } from "./store/store";

function App() {
  const role = useSelector<StoreData, string>((state) => state.user.role);
  return (
    <>
      <Navbar>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="all-projects" element={<AllProjects />}>
            <Route path="" element={<AllProjectsSection />} />
            <Route path="new-project" element={<NewProjectSection />} />
          </Route>
          <Route path="project-support/:id" element={<ProjectSupportPage />}>
            <Route path="" element={<Navigate to="project-dashboard" />} />
            <Route path="ai-support" element={<AISupportSection />}>
              <Route path="" element={<Navigate to="roadmap" />} />
              <Route path="roadmap" element={<RoadmapSection />} />
              <Route path="quality-check" element={<QualityChackSection />} />

              <Route
                path="quality-check/file-support"
                element={<FileSupport />}
              />
              <Route
                path="quality-check/vulnerability-support"
                element={<VulnerabilitySupport />}
              />
              <Route path="raise-query" element={<RaiseQuery />} />
            </Route>
            <Route
              path="project-dashboard"
              element={
                role == "User" ? <ProjectDashboardSection /> : <Dashboard />
              }
            />
            {/* <Route
                            path="client-dashboard"
                            element={<Dashboard />}
                        /> */}
          </Route>
        </Routes>
      </Navbar>
    </>
  );
}

export default App;
