import ServiceTemplate from "@/components/services/ServiceTemplate";
import { customSoftwareDevelopment } from "@/data/services/custom-software-development";

export const metadata = {
  title: "Custom Software Development — IAG Soft",
  description: "User-centric software built to bring your ideas to life.",
};

export default function Page() {
  return <ServiceTemplate data={customSoftwareDevelopment} />;
}