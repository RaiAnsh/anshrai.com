export default function EcommerceDBMSPage() {
  const imgs = {
    erd: "/projects/ecommerce-dbms/erd.jpg",
    arch: "/projects/ecommerce-dbms/system-architecture.png",
    login: "/projects/ecommerce-dbms/login.png",
    dashboard: "/projects/ecommerce-dbms/dashboard.png",
    customers: "/projects/ecommerce-dbms/customers.png",
    edit: "/projects/ecommerce-dbms/edit-customer.png",
    queries: "/projects/ecommerce-dbms/queries.png",
    result: "/projects/ecommerce-dbms/query-result.png",
  };

  return (
    <main className="container">
      <section className="heroCase">
        <div>
          <p className="kicker">Flagship Case Study</p>
          <h1 style={{ marginTop: 8 }}>E-Commerce Database Management System</h1>
          <p className="lead">
            A database-driven admin system for managing customers, products,
            orders, shipments, payments, and reviews — built with strong data
            integrity, clean workflows, and analytics-ready queries.
          </p>

          <div className="statRow">
            <div className="stat">
              <div className="statTop">Core Focus</div>
              <div className="statVal">Data modeling + CRUD + analytics</div>
            </div>
            <div className="stat">
              <div className="statTop">Highlights</div>
              <div className="statVal">Normalized design (3NF/BCNF)</div>
            </div>
            <div className="stat">
              <div className="statTop">Interface</div>
              <div className="statVal">Admin dashboard + query runner</div>
            </div>
          </div>
        </div>

        <div className="heroMedia">
          <img src={imgs.dashboard} alt="DBMS dashboard screenshot" />
        </div>
      </section>

      <section className="sectionCard">
        <h2>What this demonstrates</h2>
        <ul className="bullets">
          <li>Relational modeling and integrity-focused schema design</li>
          <li>End-to-end CRUD workflows across multiple entities</li>
          <li>Analytics-style queries to answer real business questions</li>
          <li>Admin UI that makes database operations usable and clear</li>
        </ul>
      </section>

      <section className="twoCol">
        {/* Architecture (image instead of arrows) */}
        <div className="sectionCard">
          <h2>Architecture</h2>
          <p style={{ opacity: 0.9, marginTop: 10 }}>
            High-level view of how the interface, backend logic, and relational
            database interact to support CRUD workflows and analytics queries.
          </p>

          <div className="imgFrame" style={{ marginTop: 14 }}>
            <img src={imgs.arch} alt="System architecture diagram" />
          </div>
        </div>

        <div className="sectionCard">
          <h2>Login + dashboard</h2>
          <div className="miniGrid">
            <img src={imgs.login} alt="Login screen" />
            <img src={imgs.dashboard} alt="Dashboard screen" />
          </div>
          <p style={{ opacity: 0.9, marginTop: 14 }}>
            A simple interface that supports database setup, table management,
            and analytics queries from one place.
          </p>
        </div>
      </section>

      <section className="sectionCard">
        <h2>Database design (ER model)</h2>
        <p style={{ opacity: 0.9 }}>
          The ER model supports customers, orders, order items, products,
          sellers, shipments, payments, and reviews — with relationships
          designed for correctness and scalability.
        </p>
        <div className="imgFrame" style={{ marginTop: 14 }}>
          <img src={imgs.erd} alt="E-commerce ER diagram" />
        </div>
      </section>

      <section className="twoCol">
        <div className="sectionCard">
          <h2>CRUD operations</h2>
          <p style={{ opacity: 0.9 }}>
            Admin workflows for adding, editing, filtering, and deleting records
            while keeping data consistent.
          </p>
          <div className="imgFrame" style={{ marginTop: 14 }}>
            <img src={imgs.customers} alt="Manage customers table" />
          </div>
        </div>

        <div className="sectionCard">
          <h2>Edit flow</h2>
          <p style={{ opacity: 0.9 }}>
            Edit forms show how the system handles controlled updates and clean
            data entry.
          </p>
          <div className="imgFrame" style={{ marginTop: 14 }}>
            <img src={imgs.edit} alt="Edit customer form" />
          </div>
        </div>
      </section>

      <section className="sectionCard">
        <h2>Analytics queries</h2>
        <p style={{ opacity: 0.9 }}>
          Predefined queries surface decision-ready insights such as customer
          location distribution, stock risk, shipment status, and review trends.
        </p>

        <div className="miniGrid" style={{ marginTop: 14 }}>
          <img src={imgs.queries} alt="Query selection dashboard" />
          <img src={imgs.result} alt="Query result example" />
        </div>
      </section>

      <section className="sectionCard">
        <h2>Why this matters</h2>
        <p style={{ opacity: 0.92, marginBottom: 0 }}>
          This project shows how strong analytics starts with strong data
          foundations: clear relational modeling, integrity constraints, usable
          operations, and queries that translate data into business answers.
        </p>
      </section>
    </main>
  );
}