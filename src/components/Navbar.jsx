import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../data/skills.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const lastLinkRef = useRef(null);

  // Lock scroll while the menu is open.
  useEffect(() => {
    document.body.classList.toggle("lock-screen", open);
    return () => document.body.classList.remove("lock-screen");
  }, [open]);

  // Esc closes the menu; Tab on the last link wraps back to the button.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
      if (e.key === "Tab" && open && document.activeElement === lastLinkRef.current) {
        e.preventDefault();
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header>
      <div className="menu-btn-container">
        <div className="container">
          <button
            type="button"
            className="menu-btn"
            ref={btnRef}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: [0.86, 0, 0.07, 1] }}
          >
            <ol className="nav-items">
              {navLinks.map((link, i) => (
                <li className="nav-item" key={link.href}>
                  <a
                    href={link.href}
                    ref={i === navLinks.length - 1 ? lastLinkRef : null}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
