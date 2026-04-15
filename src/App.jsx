import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import SkillCategory from "./pages/SkillCategory.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myapp/projects/:slug" element={<ProjectDetail />} />
      <Route path="/myapp/skills/:slug" element={<SkillCategory />} />
      <Route path="/myapp/projects" element={<AllProjects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
