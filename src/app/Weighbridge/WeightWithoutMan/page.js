import ProductTemplate from '@/components/Product/ProductTemplate';
import { weightWithoutMan } from '@/data/products/weighbridge/weight-without-man';

export const metadata = {
  title: 'Weight Without Man — IAG Soft',
  description: weightWithoutMan.tagline,
};

export default function WeightWithoutManPage() {
  return <ProductTemplate data={weightWithoutMan} />;
}