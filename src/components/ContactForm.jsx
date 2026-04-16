import { useState } from "react";
import "./ContactForm.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqewpdkg";

export default function ContactForm() {
  // "idle" | "sending" | "ok" | "error"
  const [status, setStatus]       = useState("idle");
  const [errorMsg, setErrorMsg]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots usually fill every field.
    if (data.get("_gotcha")) {
      setStatus("ok");
      form.reset();
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json?.errors?.[0]?.message || "Something went wrong.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="cf cf--success" role="status" aria-live="polite">
        <div className="cf__check" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3>Message sent.</h3>
        <p>Thanks — I'll get back to you within 24 hours.</p>
        <button
          type="button"
          className="cf__again"
          onClick={() => setStatus("idle")}
        >
          send another →
        </button>
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={handleSubmit} noValidate>
      <div className="cf__row">
        <label className="cf__field">
          <span>name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
          />
        </label>

        <label className="cf__field">
          <span>email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
          />
        </label>
      </div>

      <label className="cf__field">
        <span>subject</span>
        <input
          name="subject"
          type="text"
          placeholder="SOC analyst opening at ..."
        />
      </label>

      <label className="cf__field">
        <span>message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role, the team, or just say hi."
        />
      </label>

      {/* Honeypot — hidden from real users, catches naive bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="cf__honey"
        aria-hidden="true"
      />

      {/* Optional Formspree subject override */}
      <input type="hidden" name="_subject" value="New message from portfolio" />

      <button
        type="submit"
        className="cf__submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <span className="cf__spinner" aria-hidden="true" />
            sending...
          </>
        ) : (
          <>
            send message <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      {status === "error" && (
        <p className="cf__error" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
