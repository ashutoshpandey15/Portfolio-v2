const socials = [
  {
    title: "GitHub",
    href: "https://github.com/ashutoshpandey15",
    icon: "assets/images/social-links/github.svg",
  },
  {
    title: "Hashnode",
    href: "https://hashnode.com/@Turbo911",
    icon: "assets/images/social-links/hashnode.svg",
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/ashutoshpandey15/",
    icon: "assets/images/social-links/linkedin.svg",
  },
  {
    title: "Twitter",
    href: "https://x.com/F0xii15",
    icon: "assets/images/social-links/twitter.svg",
  },
];

export default function Footer({ theme, onToggleTheme }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <nav>
            <ol className="footer-links">
              {socials.map((s) => (
                <li className="footer-link" key={s.title}>
                  <a title={s.title} href={s.href} target="_blank" rel="noopener">
                    <img loading="lazy" src={s.icon} alt={s.title} />
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <p className="footer-text">
            &copy; <span>{new Date().getFullYear()}</span> - Designed &amp;
            developed with ❤️ by{" "}
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/ashutoshpandey15"
            >
              Turbo911
            </a>
          </p>

          <label className="theme-switch" htmlFor="theme-switch">
            <span>Dark Theme</span>
            <input
              type="checkbox"
              id="theme-switch"
              role="switch"
              checked={theme === "dark"}
              onChange={onToggleTheme}
            />
          </label>
        </div>
      </div>
    </footer>
  );
}
