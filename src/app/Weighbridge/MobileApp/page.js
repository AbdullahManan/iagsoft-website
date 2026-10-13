import ProductTemplate from '@/components/Product/ProductTemplate';
import { weighbridgeMobileApp } from '@/data/products/weighbridge/mobile-app';

export const metadata = {
  title: 'Weighbridge Mobile App — IAG Soft',
  description: weighbridgeMobileApp.tagline,
};

export default function WeighbridgeMobileAppPage() {
  return <ProductTemplate data={weighbridgeMobileApp} />;
}