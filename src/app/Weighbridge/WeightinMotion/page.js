import ProductTemplate from '@/components/Product/ProductTemplate';
import { weightInMotion } from '@/data/products/weighbridge/weight-in-motion';

export const metadata = {
  title: 'Weight in Motion — IAG Soft',
  description: weightInMotion.tagline,
};

export default function WeightInMotionPage() {
  return <ProductTemplate data={weightInMotion} />;
}