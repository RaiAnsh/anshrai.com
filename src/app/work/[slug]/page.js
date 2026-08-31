import { notFound } from "next/navigation";
import { caseStudies } from "../../../data/caseStudies";
import CaseStudyPage from "../../../components/CaseStudyPage";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.client} — ${cs.headline}`,
    description: cs.solution.slice(0, 155),
    openGraph: { title: `${cs.client} Case Study | arweb`, description: cs.solution.slice(0, 155) },
  };
}

export default async function WorkSlugPage({ params }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();
  return <CaseStudyPage cs={cs} />;
}
