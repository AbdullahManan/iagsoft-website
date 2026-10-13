import ServiceTemplate from "@/components/Services/ServiceTemplate";
import { dataAcquisition } from "@/data/services/data-acquisition";

export const metadata = {
  title: "Data Acquisition — IAG Soft",
  description: "Robust systems for gathering and analyzing operational data.",
};

export default function Page() {
  return <ServiceTemplate data={dataAcquisition} />;
}