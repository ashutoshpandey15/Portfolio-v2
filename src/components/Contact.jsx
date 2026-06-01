import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, inViewProps } from "../motion.js";

const quickLinks = [
  {
    label: "LinkedIn",
    handle: "/in/ashutoshpandey15",
    href: "https://www.linkedin.com/in/ashutoshpandey15/",
    icon: "assets/images/social-links/linkedin.svg",
  },
  {
    label: "GitHub",
    handle: "@ashutoshpandey15",
    href: "https://github.com/ashutoshpandey15",
    icon: "assets/images/social-links/github.svg",
  },
];

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact">
      <div className="container">
        <motion.h2 className="h2" id="contact" variants={fadeUp} {...inViewProps}>
          Send Message
        </motion.h2>

        <motion.div className="contact-card" variants={fadeUp} {...inViewProps}>
          <div className="contact-info">
            <span className="contact-eyebrow">Get in touch</span>
            <strong className="hire-alert">
              <span className="indicator" />
              Available for hire
            </strong>
            <p className="contact-lead">
              Have a project, role, or idea in mind? Drop a message and I’ll get
              back to you soon.
            </p>

            <ul className="contact-links">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener">
                    <span className="contact-link-icon">
                      <img src={link.icon} alt="" loading="lazy" />
                    </span>
                    <span className="contact-link-text">
                      <span className="contact-link-label">{link.label}</span>
                      <span className="contact-link-handle">{link.handle}</span>
                    </span>
                    <span className="contact-link-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <img
              src="assets/images/signatures.png"
              alt="Ashutosh Pandey signature"
              className="signatures"
              loading="lazy"
            />
          </div>

          <form
            className="contact-form"
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="access_key"
              value="dd81da81-7043-48db-b663-53e49fa78f60"
            />

            <div className="field">
              <input type="text" name="name" id="name" placeholder=" " required />
              <label htmlFor="name">Name</label>
              <span className="field-line" />
            </div>

            <div className="field">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                required
              />
              <label htmlFor="email">Email</label>
              <span className="field-line" />
            </div>

            <div className="field">
              <textarea
                name="message"
                id="message"
                rows="4"
                placeholder=" "
                required
              />
              <label htmlFor="message">Message</label>
              <span className="field-line" />
            </div>

            <button
              type="submit"
              className="contact-submit"
              disabled={sending}
            >
              {sending ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <p className="form-status form-status-ok">
                Thanks! Your message has been delivered.
              </p>
            )}
            {status === "error" && (
              <p className="form-status form-status-err">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
