import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RouteFallback from "./components/RouteFallback.jsx";
import "./App.css";

// Code-split the deeper pages so the home route stays slim.
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const SkillCategory = lazy(() => import("./pages/SkillCategory.jsx"));
const AllProjects   = lazy(() => import("./pages/AllProjects.jsx"));
const NotFound      = lazy(() => import("./pages/NotFound.jsx"));

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* New clean URLs */}
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/skills/:slug" element={<SkillCategory />} />

        {/* Legacy /myapp/* URLs — keep them alive so old links don't 404 */}
        <Route path="/myapp/projects" element={<Navigate to="/projects" replace />} />
        <Route
          path="/myapp/projects/:slug"
          element={<LegacyRedirect prefix="/projects" />}
        />
        <Route
          path="/myapp/skills/:slug"
          element={<LegacyRedirect prefix="/skills" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

// Re-uses the :slug param from the matched route and forwards
// to the new clean URL with a 301-style replace.
function LegacyRedirect({ prefix }) {
  const slug = window.location.pathname.split("/").pop();
  return <Navigate to={`${prefix}/${slug}`} replace />;
}

export default App;
