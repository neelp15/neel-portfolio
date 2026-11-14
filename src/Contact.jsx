
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import "./Contact.css";
import Logo from "./Logo";

// ========================================
// EMAILJS CONFIGURATION
// ========================================

const emailConfig = {
  serviceId: (
    import.meta.env.VITE_EMAILJS_SERVICE_ID || ""
  ).trim(),

  templateId: (
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ""
  ).trim(),

  publicKey: (
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
  ).trim(),
};

// Safe diagnostic: never prints credential values
if (import.meta.env.DEV) {
  console.log("EmailJS Configuration Check:", {
    serviceId: Boolean(emailConfig.serviceId),
    templateId: Boolean(emailConfig.templateId),
    publicKey: Boolean(emailConfig.publicKey),
  });
}

const getMissingConfig = () => {
  const missing = [];

  if (!emailConfig.serviceId) {
    missing.push("VITE_EMAILJS_SERVICE_ID");
  }

  if (!emailConfig.templateId) {
    missing.push("VITE_EMAILJS_TEMPLATE_ID");
  }

  if (!emailConfig.publicKey) {
    missing.push("VITE_EMAILJS_PUBLIC_KEY");
  }

  return missing;
};

// ========================================
// CONTACT COMPONENT
// ========================================

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ========================================
  // HANDLE INPUT CHANGES
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status === "error" || status === "success") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  // ========================================
  // HANDLE FORM SUBMISSION
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const missingConfig = getMissingConfig();

    if (missingConfig.length > 0) {
      console.error(
        "Missing EmailJS environment variables:",
        missingConfig
      );

      setErrorMessage(
        "Email service configuration is incomplete. " +
          "Check the browser console for missing variable names."
      );

      setStatus("error");
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setErrorMessage("Please complete all fields.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: name,
          from_email: email,
          reply_to: email,
          message: message,
        },
        {
          publicKey: emailConfig.publicKey,
        }
      );

      if (response.status === 200) {
        setStatus("success");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(
          `Unexpected EmailJS response: ${response.status}`
        );
      }
    } catch (error) {
      console.error("EmailJS Send Error:", {
        status: error?.status,
        text: error?.text,
        message: error?.message,
      });

      let messageText =
        "Unable to send your message. Please try again or email me directly.";

      if (error?.status === 400) {
        messageText =
          "Email service rejected the request. Please check the EmailJS service and template settings.";
      } else if (error?.status === 403) {
        messageText =
          "Email service access was denied. Please check your EmailJS public key and domain settings.";
      } else if (error?.status === 429) {
        messageText =
          "Too many requests. Please wait and try again.";
      }

      setErrorMessage(messageText);
      setStatus("error");
    }
  };

  // ========================================
  // JSX
  // ========================================

  return (
    <>
      <section
        className="contact-section"
        id="contact"
      >
        <div className="contact-container">

          {/* SECTION HEADING */}

          <motion.div
            className="contact-heading"
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="contact-index">
              <span className="contact-dot" />
              06 / LET'S CONNECT
            </span>

            <h2>
              HAVE A PROJECT
              <br />
              <span>IN MIND?</span>
            </h2>

            <p>
              Whether it's a job opportunity,
              collaboration, or an interesting idea,
              I'd love to hear from you.
            </p>
          </motion.div>

          {/* CONTACT GRID */}

          <div className="contact-grid">

            {/* LEFT: CONTACT DETAILS */}

            <motion.div
              className="contact-info"
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="contact-eyebrow">
                OPEN TO OPPORTUNITIES
              </span>

              <h3>
                Let's build something
                <span> meaningful.</span>
              </h3>

              <p className="contact-info-description">
                I'm interested in full-stack development,
                backend engineering, data analytics,
                and creative technology.
              </p>

              {/* EMAIL */}

              <a
                className="contact-detail"
                href="mailto:neelp8933@gmail.com"
              >
                <span className="contact-detail-icon">
                  <Mail size={21} />
                </span>

                <span>
                  <small>EMAIL ME</small>
                  <strong>
                    neelp8933@gmail.com
                  </strong>
                </span>

                <ArrowUpRight size={17} />
              </a>

              {/* LOCATION */}

              <div className="contact-detail">
                <span className="contact-detail-icon">
                  <MapPin size={21} />
                </span>

                <span>
                  <small>LOCATION</small>
                  <strong>
                    Surat, Gujarat, India
                  </strong>
                </span>
              </div>

              {/* SOCIAL LINKS */}

              <div className="contact-socials">
                <a
                  href="https://github.com/neelp15"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/neel-patel-259139252"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </motion.div>

            {/* RIGHT: CONTACT FORM */}

            <motion.div
              className="contact-form-card"
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="contact-form-header">
                <span>NEW MESSAGE</span>

                <span className="contact-form-status">
                  ● INBOX
                </span>
              </div>

              <form onSubmit={handleSubmit}>

                {/* NAME & EMAIL */}

                <div className="contact-form-row">

                  <div className="contact-field">
                    <label htmlFor="contact-name">
                      YOUR NAME
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email">
                      EMAIL ADDRESS
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      maxLength={254}
                      required
                    />
                  </div>

                </div>

                {/* MESSAGE */}

                <div className="contact-field">
                  <label htmlFor="contact-message">
                    YOUR MESSAGE
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project or opportunity..."
                    rows={7}
                    value={form.message}
                    onChange={handleChange}
                    maxLength={5000}
                    required
                  />
                </div>

                {/* SUBMIT BUTTON */}

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <LoaderCircle
                        size={18}
                        className="contact-spinner"
                      />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send size={17} />
                    </>
                  )}
                </button>

                {/* FEEDBACK */}

                <div
                  className={`contact-feedback ${status}`}
                  role="status"
                  aria-live="polite"
                >
                  {status === "success" && (
                    <>
                      <CheckCircle2 size={17} />
                      Message sent successfully!
                    </>
                  )}

                  {status === "error" && (
                    <>
                      <AlertCircle size={17} />
                      {errorMessage}
                    </>
                  )}
                </div>

              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="portfolio-footer">
        <div className="footer-inner">

          <Logo />

          <p>
            Designed & developed by Neel Patel.
          </p>

          <div className="footer-right">
            <span>
              © {new Date().getFullYear()}
            </span>

            <a href="#home">
              BACK TO TOP ↑
            </a>
          </div>

        </div>
      </footer>
    </>
  );
}
