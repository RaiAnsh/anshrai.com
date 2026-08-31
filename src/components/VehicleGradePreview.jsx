"use client";

import BrowserPreview from "./BrowserPreview";

const TABS = [
  { label: "vehiclegrade.ca",           url: "https://www.vehiclegrade.ca/" },
  { label: "vehiclegrade.ca/dashboard", url: "https://www.vehiclegrade.ca/dashboard" },
  { label: "vehiclegrade.ca/analytics", url: "https://www.vehiclegrade.ca/analytics" },
];

export default function VehicleGradePreview() {
  return (
    <div className="mt-5">
      <BrowserPreview
        url="https://www.vehiclegrade.ca/"
        displayUrl="vehiclegrade.ca"
        accentColor="#2563eb"
        tabs={TABS}
        aspectRatio="16/9"
        scale={0.42}
      />
    </div>
  );
}
