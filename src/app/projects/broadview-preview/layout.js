import "../broadview-preview/broadview.css";
import BroadviewNav from "./components/BroadviewNav";

export const metadata = {
  title: "Broadview Barber Salon — Preview",
};

export default function BroadviewLayout({ children }) {
  return (
    <div className="bv">
      <BroadviewNav />

      <a className="bvFloatingBack" href="/">
        ← Back to Portfolio
      </a>

      {children}
    </div>
  );
}