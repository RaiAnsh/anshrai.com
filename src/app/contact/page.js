"use client";
import { useState } from "react";
import Window from "../../components/Window";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = `Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:anshr792@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Window title="Contact">
      <p className="sectionLabel">Get in Touch</p>
      <h2 style={{ margin: "0 0 6px", fontSize: 26, letterSpacing: "-0.02em" }}>
        Say Hello
      </h2>
      <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 24px" }}>
        Open to internship opportunities, collaborations, and interesting projects.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="formField">
          <label>Name</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
        </div>
        <div className="formField">
          <label>Email</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" />
        </div>
        <div className="formField">
          <label>Message</label>
          <textarea name="message" rows="4" required value={form.message} onChange={handleChange} placeholder="What's on your mind?" />
        </div>
        <button className="btnPrimary" type="submit" style={{ marginTop: 8, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>
          Send Message →
        </button>
      </form>

      <hr className="divider" />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <a href="mailto:anshr792@gmail.com" style={{ fontSize: 14, color: "var(--muted)", display: "flex", alignItems: "center", gap: 10, transition: "color 120ms ease" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
          <span style={{ fontSize: 16 }}>✉</span> anshr792@gmail.com
        </a>
        <a href="https://github.com/raiansh" target="_blank" rel="noreferrer" style={{ fontSize: 14, color: "var(--muted)", display: "flex", alignItems: "center", gap: 10, transition: "color 120ms ease" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
          <span style={{ fontSize: 16 }}>◈</span> github.com/raiansh
        </a>
        <a href="https://linkedin.com/in/raiansh" target="_blank" rel="noreferrer" style={{ fontSize: 14, color: "var(--muted)", display: "flex", alignItems: "center", gap: 10, transition: "color 120ms ease" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}>
          <span style={{ fontSize: 16 }}>⬡</span> linkedin.com/in/raiansh
        </a>
      </div>
    </Window>
  );
}
