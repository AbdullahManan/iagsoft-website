import ServicesHero from "@/components/services/ServicesHero";
import ServiceRows from "@/components/services/ServiceRows";

export const metadata = {
  title: "Our Services — IAG Soft",
  description:
    "Web development, app development, ERP, SAP integration, data acquisition, and custom software — tailored solutions built around your business.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceRows />
    </>
  );
}