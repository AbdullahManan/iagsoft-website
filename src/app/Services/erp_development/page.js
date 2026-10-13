import ServiceTemplate from "@/components/services/ServiceTemplate";
import { erpDevelopment } from "@/data/services/erp-development";

export const metadata = {
  title: "ERP Development — IAG Soft",
  description: "Tailored ERP systems for streamlined enterprise management.",
};

export default function Page() {
  return <ServiceTemplate data={erpDevelopment} />;
}