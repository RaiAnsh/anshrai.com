import JobMatcher from "./JobMatcher";

export const metadata = {
  title: "Job Matcher",
  robots: { index: false, follow: false },
};

export default function JobsPage() {
  return (
    <main style={{ minHeight: "100svh", background: "#080808" }}>
      <JobMatcher />
    </main>
  );
}
