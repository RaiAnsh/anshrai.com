import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies } from "../../../data/caseStudies";
import CaseStudyPage from "../../../components/CaseStudyPage";

// Generate all slugs at build time
export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return {};
  return {
    title: `${cs.client} — ${cs.headline}`,
    description: cs.solution.slice(0, 155),
    openGraph: { title: `${cs.client} Case Study | arweb`, description: cs.solution.slice(0, 155) },
  };
}

export default function WorkSlugPage({ params }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) notFound();
  return <CaseStudyPage cs={cs} />;
}
