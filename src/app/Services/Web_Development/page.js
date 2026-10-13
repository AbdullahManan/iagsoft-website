import ServiceTemplate from '@/components/Services/ServiceTemplate';
import { SERVICES } from '@/data/services/services';

export const metadata = {
  title: 'Web Development — IAG Soft',
  description: SERVICES.webDevelopment.tagline,
};

export default function WebDevelopmentPage() {
  return <ServiceTemplate data={SERVICES.webDevelopment} />;
}