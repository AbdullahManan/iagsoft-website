import ProductTemplate from '@/components/Product/ProductTemplate';
import { eParking } from '@/data/products/e-parking';

export const metadata = {
  title: 'E-Parking Management System — IAG Soft',
  description: eParking.tagline,
};

export default function EParkingPage() {
  return <ProductTemplate data={eParking} />;
}