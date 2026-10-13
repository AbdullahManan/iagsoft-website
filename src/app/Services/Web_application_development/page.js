import ServiceTemplate from "@/components/Services/ServiceTemplate";
import { webApplicationDevelopment } from "@/data/services/web-application-development";

export const metadata = {
  title: "Web Application Development — IAG Soft",
  description: "Dynamic, scalable web apps tailored to your workflows.",
};

export default function Page() {
  return <ServiceTemplate data={webApplicationDevelopment} />;
}