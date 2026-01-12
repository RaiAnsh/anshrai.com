"use client";

import { useEffect, useMemo, useState } from "react";

export default function TypingRoles() {
  const roles = useMemo(
    () => [
      "Data Analyst",
      "Analytics Builder",
      "SQL & Python Developer",
      "Dashboard Designer",
      "Business-Focused CS Student",
      "Turning Data Into Insights",
    ],
    []
  );

  const TYPING_MS = 70;
  const DELETING_MS = 45;
  const PAUSE_MS = 900;

  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];

    const nextTick = () => {
      if (!isDeleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);

        if (next === current) {
          setTimeout(() => setIsDeleting(true), PAUSE_MS);
          return;
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);

        if (next === "") {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
          return;
        }
      }
    };

    const delay = isDeleting ? DELETING_MS : TYPING_MS;
    const id = setTimeout(nextTick, delay);
    return () => clearTimeout(id);
  }, [text, isDeleting, roleIndex, roles]);

  return (
    <span className="typed">
      {text}
      <span className="caret" aria-hidden="true">
        |
      </span>
    </span>
  );
}
