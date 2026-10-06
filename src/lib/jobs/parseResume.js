// Client-side resume parsing — PDF via pdfjs-dist, DOCX via mammoth.
// Never called server-side; dynamic imports keep bundle size minimal.

import { extractSkills } from "./skills.js";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const MIN_TEXT_CHARS = 200;

const TITLE_PATTERNS = [
  /software\s+engineer/i,
  /software\s+developer/i,
  /full[\s-]?stack\s+(developer|engineer)/i,
  /front[\s-]?end\s+(developer|engineer)/i,
  /back[\s-]?end\s+(developer|engineer)/i,
  /data\s+(analyst|scientist|engineer)/i,
  /machine\s+learning\s+engineer/i,
  /devops\s+engineer/i,
  /cloud\s+engineer/i,
  /product\s+manager/i,
  /project\s+manager/i,
  /business\s+analyst/i,
  /ux\s+(designer|researcher)/i,
  /ui\s+designer/i,
  /graphic\s+designer/i,
  /marketing\s+manager/i,
  /account\s+manager/i,
  /customer\s+success/i,
  /customer\s+service\s+representative/i,
  /sales\s+(representative|manager)/i,
  /finance\s+manager/i,
  /financial\s+analyst/i,
  /accountant/i,
  /recruiter/i,
  /hr\s+(manager|generalist|coordinator)/i,
  /operations\s+manager/i,
  /it\s+(support|administrator|manager)/i,
  /systems\s+administrator/i,
  /network\s+engineer/i,
  /database\s+administrator/i,
  /qa\s+engineer/i,
  /quality\s+assurance/i,
  /android\s+developer/i,
  /ios\s+developer/i,
  /mobile\s+developer/i,
];

function detectTitles(text) {
  const found = [];
  for (const pat of TITLE_PATTERNS) {
    const m = text.match(pat);
    if (m) {
      // Normalize to Title Case
      const raw = m[0].replace(/\s+/g, " ").trim();
      found.push(raw.replace(/\b\w/g, (c) => c.toUpperCase()));
    }
  }
  return [...new Set(found)].slice(0, 5);
}

async function extractPdf(file) {
  const { getDocument, GlobalWorkerOptions, version } = await import("pdfjs-dist");
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const pages = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page    = await pdf.getPage(p);
    const content = await page.getTextContent();
    pages.push(content.items.map((i) => i.str).join(" "));
  }
  return pages.join("\n");
}

async function extractDocx(file) {
  const mammoth    = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result      = await mammoth.extractRawText({ arrayBuffer });
  return result.value ?? "";
}

/**
 * Parse a resume File and return { text, skills, titles }.
 * Throws a user-facing error string on failure.
 */
export async function parseResume(file) {
  if (!file) throw new Error("No file provided.");

  if (file.size > MAX_FILE_BYTES) {
    throw new Error("File is too large (max 5 MB). Please compress your resume and try again.");
  }

  const name = file.name.toLowerCase();
  let text;

  if (name.endsWith(".pdf")) {
    text = await extractPdf(file);
  } else if (name.endsWith(".docx")) {
    text = await extractDocx(file);
  } else {
    throw new Error("Unsupported file type. Please upload a PDF or DOCX.");
  }

  if (!text || text.replace(/\s/g, "").length < MIN_TEXT_CHARS) {
    throw new Error(
      "This looks like a scanned or image-based PDF. Try exporting your resume as a text PDF or DOCX."
    );
  }

  const skills = extractSkills(text);
  const titles = detectTitles(text);

  return { text, skills, titles };
}
