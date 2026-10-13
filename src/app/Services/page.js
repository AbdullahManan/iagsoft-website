import ServicesHero from "@/components/Services/ServicesHero";
import ServiceRows from "@/components/Services/ServiceRows";

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