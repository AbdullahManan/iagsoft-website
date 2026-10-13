import ProductTemplate from '@/components/Product/ProductTemplate';
import { saas } from '@/data/products/saas';

export const metadata = {
  title: 'Software as a Service — IAG Soft',
  description: saas.tagline,
};

export default function SaasPage() {
  return <ProductTemplate data={saas} />;
}