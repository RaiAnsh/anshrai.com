"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = `Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:anshr792@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="container">
      <section className="sectionCard" style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1>Contact</h1>
        <p style={{ opacity: 0.9 }}>
          If you’d like to connect, collaborate, or talk about analytics projects,
          feel free to send me a message below.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div className="formField">
            <label>Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label>Message</label>
            <textarea
              name="message"
              rows="4"
              required
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button className="btnPrimary" type="submit" style={{ marginTop: 12 }}>
            Send Message
          </button>
        </form>

        {/* Direct contact links */}
        <div style={{ marginTop: 40, opacity: 0.85 }}>
          <p>
            Or reach me directly:
          </p>
          <p>
            📧 <a href="mailto:anshr792@gmail.com">anshr792@gmail.com</a>
          </p>
          <p>
            💻 <a href="https://github.com/raiansh" target="_blank">github.com/raiansh</a>
          </p>
          <p>
            🔗 <a href="https://linkedin.com/in/raiansh" target="_blank">linkedin.com/in/raiansh</a>
          </p>
        </div>
      </section>
    </main>
  );
}