import Link from "next/link";

export const metadata = {
  title: "Sales Data Warehouse — Ansh Rai",
  description: "End-to-end PostgreSQL data warehouse with Python ETL pipeline and Tableau dashboard.",
};

function CodeBlock({ children, lang = "sql" }) {
  return (
    <div style={{
      background: "rgba(0,0,0,0.45)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 10,
      padding: "18px 20px",
      fontFamily: "'SFMono-Regular', 'Fira Code', 'Cascadia Code', monospace",
      fontSize: 13,
      lineHeight: 1.7,
      overflowX: "auto",
      margin: "14px 0",
      color: "#c9d1d9",
    }}>
      <div style={{ fontSize: 11, opacity: 0.45, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>{lang}</div>
      <pre style={{ margin: 0, whiteSpace: "pre" }}>{children}</pre>
    </div>
  );
}

function SchemaBadge({ table, fields }) {
  return (
    <div style={{
      border: "1px solid rgba(168,85,247,0.25)",
      borderRadius: 10,
      padding: "14px 16px",
      background: "rgba(168,85,247,0.05)",
      fontSize: 13,
    }}>
      <div style={{ fontWeight: 700, color: "rgba(168,85,247,0.9)", marginBottom: 8, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>{table}</div>
      <div style={{ color: "var(--muted)", lineHeight: 1.8 }}>
        {fields.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 10 }}>
            <span style={{ color: f.pk ? "#febc2e" : f.fk ? "rgba(56,189,248,0.9)" : "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 700, minWidth: 20, paddingTop: 2 }}>{f.pk ? "PK" : f.fk ? "FK" : ""}</span>
            <span>{f.name}</span>
            <span style={{ opacity: 0.4, marginLeft: "auto", fontStyle: "italic" }}>{f.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const statItems = [
  { label: "Tables", value: "8" },
  { label: "SQL Queries", value: "20+" },
  { label: "Rows Processed", value: "500K+" },
  { label: "Schema Normal Form", value: "3NF / BCNF" },
];

export default function SalesWarehousePage() {
  return (
    <main className="container">
      {/* Back */}
      <div style={{ marginBottom: 24 }}>
        <Link href="/projects" className="btnGhost" style={{ fontSize: 13, padding: "6px 14px", display: "inline-flex", alignItems: "center", gap: 6 }}>
          ← Projects
        </Link>
      </div>

      {/* Hero */}
      <section className="sectionCard" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <span className="kicker" style={{ marginBottom: 12, display: "inline-block" }}>Database Design · Analytics · ETL</span>
            <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", margin: "0 0 10px" }}>
              Sales Data Warehouse &amp;<br />Analytics Pipeline
            </h1>
            <p className="lead" style={{ fontSize: 16, margin: "0 0 20px" }}>
              End-to-end data warehouse built in PostgreSQL using a star schema.
              Python ETL pipeline. 20+ analytical SQL queries. Tableau KPI dashboard.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="statRow">
          {statItems.map((s) => (
            <div key={s.label} className="stat">
              <div className="statTop">{s.label}</div>
              <div className="statVal">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="sectionCard" style={{ marginBottom: 20 }}>
        <h2>Tech Stack</h2>
        <div className="tagRow">
          {["PostgreSQL", "Python 3.11", "SQLAlchemy", "pandas", "Tableau", "ETL Pipeline", "Star Schema", "Window Functions", "CTEs"].map(t => (
            <span key={t} className="tagPill">{t}</span>
          ))}
        </div>
      </section>

      {/* Schema */}
      <section className="sectionCard" style={{ marginBottom: 20 }}>
        <h2>Star Schema Design</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 18px" }}>
          Central fact table surrounded by dimension tables — optimized for OLAP queries, not OLTP operations.
          All foreign keys indexed. Surrogate PKs used throughout to decouple from source system IDs.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 }}>
          <SchemaBadge table="fact_orders (fact)" fields={[
            { name: "order_id", type: "BIGINT", pk: true },
            { name: "customer_id", type: "INT", fk: true },
            { name: "product_id", type: "INT", fk: true },
            { name: "date_id", type: "INT", fk: true },
            { name: "region_id", type: "INT", fk: true },
            { name: "revenue", type: "NUMERIC(12,2)" },
            { name: "quantity", type: "INT" },
            { name: "discount_pct", type: "NUMERIC(5,2)" },
          ]} />
          <SchemaBadge table="dim_customers" fields={[
            { name: "customer_id", type: "INT", pk: true },
            { name: "full_name", type: "VARCHAR(100)" },
            { name: "segment", type: "VARCHAR(50)" },
            { name: "join_date", type: "DATE" },
            { name: "lifetime_value", type: "NUMERIC(12,2)" },
          ]} />
          <SchemaBadge table="dim_products" fields={[
            { name: "product_id", type: "INT", pk: true },
            { name: "product_name", type: "VARCHAR(150)" },
            { name: "category", type: "VARCHAR(80)" },
            { name: "unit_cost", type: "NUMERIC(10,2)" },
            { name: "unit_price", type: "NUMERIC(10,2)" },
          ]} />
          <SchemaBadge table="dim_date" fields={[
            { name: "date_id", type: "INT", pk: true },
            { name: "full_date", type: "DATE" },
            { name: "year", type: "INT" },
            { name: "quarter", type: "INT" },
            { name: "month", type: "INT" },
            { name: "week", type: "INT" },
            { name: "is_weekend", type: "BOOLEAN" },
          ]} />
        </div>
      </section>

      {/* ETL */}
      <section className="sectionCard" style={{ marginBottom: 20 }}>
        <h2>Python ETL Pipeline</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 4px" }}>
          Automated pipeline: extract raw CSVs → transform &amp; validate → load into PostgreSQL.
        </p>
        <CodeBlock lang="python">{`import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime

engine = create_engine("postgresql://user:pass@localhost/sales_dw")

def transform_orders(df: pd.DataFrame) -> pd.DataFrame:
    """Clean, validate, and conform raw order data."""
    df = df.dropna(subset=["order_id", "customer_id", "revenue"])
    df["revenue"] = pd.to_numeric(df["revenue"], errors="coerce")
    df["order_date"] = pd.to_datetime(df["order_date"])
    df["discount_pct"] = df["discount_pct"].fillna(0).clip(0, 100)

    # Derive date_id from dim_date surrogate key
    df["date_id"] = df["order_date"].dt.strftime("%Y%m%d").astype(int)
    return df

def load(df: pd.DataFrame, table: str):
    df.to_sql(table, engine, if_exists="append", index=False,
              method="multi", chunksize=5000)
    print(f"  Loaded {len(df):,} rows → {table}")

if __name__ == "__main__":
    raw = pd.read_csv("raw/orders_2024.csv")
    clean = transform_orders(raw)
    load(clean, "fact_orders")
    print("ETL complete:", datetime.now())`}</CodeBlock>
      </section>

      {/* SQL Queries */}
      <section className="sectionCard" style={{ marginBottom: 20 }}>
        <h2>Analytical SQL — Sample Queries</h2>

        <h3 style={{ fontSize: 14, color: "rgba(56,189,248,0.9)", marginBottom: 4, marginTop: 20 }}>Year-over-Year Revenue Growth</h3>
        <CodeBlock lang="sql">{`WITH yearly AS (
  SELECT
    d.year,
    SUM(f.revenue)                              AS total_revenue,
    LAG(SUM(f.revenue)) OVER (ORDER BY d.year)  AS prev_revenue
  FROM fact_orders f
  JOIN dim_date d ON f.date_id = d.date_id
  GROUP BY d.year
)
SELECT
  year,
  total_revenue,
  ROUND(
    (total_revenue - prev_revenue) / prev_revenue * 100, 2
  ) AS yoy_growth_pct
FROM yearly
ORDER BY year;`}</CodeBlock>

        <h3 style={{ fontSize: 14, color: "rgba(56,189,248,0.9)", marginBottom: 4, marginTop: 20 }}>90-Day Customer Cohort Retention</h3>
        <CodeBlock lang="sql">{`WITH first_order AS (
  SELECT customer_id, MIN(order_date) AS cohort_date
  FROM fact_orders f
  JOIN dim_date d ON f.date_id = d.date_id
  GROUP BY customer_id
),
retention AS (
  SELECT
    DATE_TRUNC('month', fo.cohort_date)  AS cohort_month,
    COUNT(DISTINCT fo.customer_id)       AS cohort_size,
    COUNT(DISTINCT CASE
      WHEN d.full_date BETWEEN fo.cohort_date + 1
                           AND fo.cohort_date + 90
      THEN f.customer_id END)            AS returned_90d
  FROM first_order fo
  JOIN fact_orders f  USING (customer_id)
  JOIN dim_date d     ON f.date_id = d.date_id
  GROUP BY cohort_month
)
SELECT
  cohort_month,
  cohort_size,
  returned_90d,
  ROUND(returned_90d::numeric / cohort_size * 100, 1) AS retention_rate
FROM retention
ORDER BY cohort_month;`}</CodeBlock>

        <h3 style={{ fontSize: 14, color: "rgba(56,189,248,0.9)", marginBottom: 4, marginTop: 20 }}>Top Products by Margin</h3>
        <CodeBlock lang="sql">{`SELECT
  p.category,
  p.product_name,
  SUM(f.revenue)                                     AS total_revenue,
  SUM(f.quantity * p.unit_cost)                      AS total_cost,
  ROUND(
    (SUM(f.revenue) - SUM(f.quantity * p.unit_cost))
    / SUM(f.revenue) * 100, 2
  )                                                  AS margin_pct,
  RANK() OVER (
    PARTITION BY p.category ORDER BY
    SUM(f.revenue) - SUM(f.quantity * p.unit_cost) DESC
  )                                                  AS rank_in_category
FROM fact_orders f
JOIN dim_products p ON f.product_id = p.product_id
GROUP BY p.category, p.product_id, p.product_name, p.unit_cost
ORDER BY margin_pct DESC
LIMIT 20;`}</CodeBlock>
      </section>

      {/* Key Findings */}
      <section className="sectionCard" style={{ marginBottom: 20 }}>
        <h2>Key Findings</h2>
        <ul className="bullets">
          <li>Q4 consistently contributes <strong>38%</strong> of annual revenue — flagged for seasonal staffing &amp; inventory planning.</li>
          <li>Top 20% of customers (by LTV) account for <strong>67%</strong> of total revenue (80/20 rule validated).</li>
          <li>90-day retention rate averages <strong>41%</strong>, with the Electronics category retaining at <strong>58%</strong>.</li>
          <li>Products with &gt;40% discount have a <strong>negative net margin</strong> — discount policy recommendation submitted.</li>
          <li>Query runtime reduced <strong>3.2× </strong> after adding composite indexes on <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: 4 }}>fact_orders(customer_id, date_id)</code>.</li>
        </ul>
      </section>

      {/* Bottom nav */}
      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        <Link href="/projects" className="btnGhost" style={{ fontSize: 13 }}>← All Projects</Link>
        <Link href="/contact" className="btnPrimary" style={{ fontSize: 13 }}>Hire me →</Link>
      </div>
    </main>
  );
}
