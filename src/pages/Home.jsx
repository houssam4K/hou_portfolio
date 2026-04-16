import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Whoami from "../components/Whoami.jsx";
import Skills from "../components/Skills.jsx";
import Education from "../components/Education.jsx";
import Projects from "../components/Projects.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <>
      <a href="#about" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Whoami />
        <Skills />
        <Education />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
