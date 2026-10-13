import ProductTemplate from '@/components/Product/ProductTemplate';
import { eToll } from '@/data/products/e-toll';

export const metadata = {
  title: 'E-Toll Management System — IAG Soft',
  description: eToll.tagline,
};

export default function ETollPage() {
  return <ProductTemplate data={eToll} />;
}