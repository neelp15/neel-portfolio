
import "./Logo.css";

export default function Logo() {
  return (
    <a
      href="#home"
      className="neel-logo"
      aria-label="Neel Patel — Back to home"
    >
      <svg
        className="neel-logo-svg"
        viewBox="0 0 330 100"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="neel-logo-title"
      >
        <title id="neel-logo-title">
          NEEL — Cyber Wordmark
        </title>

        <g
          className="neel-logo-letters"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          {/* N */}
          <path d="M17 77 V23 L62 77 V23" />

          {/* E */}
          <path d="M92 23 H137 M92 23 V77 H137 M92 50 H129" />

          {/* E */}
          <path d="M165 23 H210 M165 23 V77 H210 M165 50 H202" />

          {/* L */}
          <path d="M240 23 V77 H285" />
        </g>

        {/* Violet accent */}
        <path
          className="neel-logo-accent"
          d="M292 77 H308"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="6"
        />

        {/* Cyan signal */}
        <circle
          className="neel-logo-signal"
          cx="313"
          cy="77"
          r="3"
          fill="#00D9FF"
        />
      </svg>
    </a>
  );
}
