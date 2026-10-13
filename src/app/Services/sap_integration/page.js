import ServiceTemplate from "@/components/services/ServiceTemplate";
import { sapIntegration } from "@/data/services/sap-integration";

export const metadata = {
  title: "SAP & Other's Integration — IAG Soft",
  description: "Seamless SAP integration that streamlines your processes.",
};

export default function Page() {
  return <ServiceTemplate data={sapIntegration} />;
}