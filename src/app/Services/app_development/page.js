import ServiceTemplate from "@/components/services/ServiceTemplate";
import { appDevelopment } from "@/data/services/app-development";

export const metadata = {
  title: "App Development — IAG Soft",
  description: "Cross-platform mobile apps that meet your business objectives.",
};

export default function Page() {
  
  return <ServiceTemplate data={appDevelopment} />;
}