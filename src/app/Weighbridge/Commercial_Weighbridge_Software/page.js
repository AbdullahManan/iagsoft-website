import ProductTemplate from '@/components/Product/ProductTemplate';
import { commercialWeighbridgeSoftware } from '@/data/products/weighbridge/commercial-weighbridge-software';

export const metadata = {
  title: 'Commercial Weighbridge Software — IAG Soft',
  description: commercialWeighbridgeSoftware.tagline,
};

export default function CommercialWeighbridgeSoftwarePage() {
  return <ProductTemplate data={commercialWeighbridgeSoftware} />;
}