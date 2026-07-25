"use client";

import { useState } from "react";

export default function QuoteModal({ children, className }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.target);
    try {
      const res = await fetch("https://formspree.io/f/xkodpyvq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function close() {
    setOpen(false);
    // reset after animation
    setTimeout(() => setStatus("idle"), 300);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div className="awModalOverlay" onClick={close}>
          <div
            className="awModal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Get a free quote"
          >
            <button className="awModalClose" onClick={close} aria-label="Close">
              ✕
            </button>

            {status === "success" ? (
              <div className="awModalSuccess">
                <div className="awModalSuccessIcon">✓</div>
                <h3>We'll be in touch!</h3>
                <p>Thanks for reaching out. We typically respond within 24 hours.</p>
                <button className="awModalSubmit" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="awModalHeader">
                  <span className="awModalKicker">Free, no-obligation</span>
                  <h2 className="awModalTitle">Get a Free Quote</h2>
                  <p className="awModalSub">
                    Tell us about your business and we'll send you a custom quote within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="awModalForm">
                  <div className="awFormRow">
                    <div className="awFormField">
                      <label htmlFor="qm-name">Your name</label>
                      <input id="qm-name" name="name" type="text" placeholder="Jane Smith" required />
                    </div>
                    <div className="awFormField">
                      <label htmlFor="qm-business">Business name</label>
                      <input id="qm-business" name="business" type="text" placeholder="Acme Barbershop" required />
                    </div>
                  </div>

                  <div className="awFormField">
                    <label htmlFor="qm-email">Email address</label>
                    <input id="qm-email" name="email" type="email" placeholder="you@example.com" required />
                  </div>

                  <div className="awFormField">
                    <label htmlFor="qm-phone">Phone number <span className="awFormOptional">(optional)</span></label>
                    <input id="qm-phone" name="phone" type="tel" placeholder="+1 (416) 000-0000" />
                  </div>

                  <div className="awFormField">
                    <label htmlFor="qm-type">Type of business</label>
                    <select id="qm-type" name="business_type" required>
                      <option value="" disabled selected>Select your industry…</option>
                      <option>Barbershop / Salon</option>
                      <option>Restaurant / Catering</option>
                      <option>Construction / Contracting</option>
                      <option>Health & Wellness</option>
                      <option>Auto Services</option>
                      <option>Retail</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="awFormField">
                    <label htmlFor="qm-message">Anything else we should know? <span className="awFormOptional">(optional)</span></label>
                    <textarea
                      id="qm-message"
                      name="message"
                      rows={3}
                      placeholder="Do you have an existing site? Any specific features you need? Budget range?"
                    />
                  </div>

                  {status === "error" && (
                    <p className="awFormError">Something went wrong. Please try again or email us directly.</p>
                  )}

                  <button
                    type="submit"
                    className="awModalSubmit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : "Send my quote request →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
