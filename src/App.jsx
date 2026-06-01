import { useEffect, useState } from "react";
import ParticleCursor from "./components/ParticleCursor.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Journey from "./components/Journey.jsx";
import Work from "./components/Work.jsx";
import Articles from "./components/Articles.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  // Keep the theme class on <html> and persist it (ports the original logic).
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <ParticleCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <main>
        <About />
        <Journey />
        <Work />
        <Articles />
        <Skills />
        <Contact />
      </main>
      <Footer theme={theme} onToggleTheme={toggleTheme} />
    </>
  );
}
