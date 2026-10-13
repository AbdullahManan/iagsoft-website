import ProductTemplate from '@/components/Product/ProductTemplate';
import { weighbridgeCloudBased } from '@/data/products/weighbridge/cloud-based';

export const metadata = {
  title: 'Cloud Based Weighbridge — IAG Soft',
  description: weighbridgeCloudBased.tagline,
};

export default function WeighbridgeCloudBasedPage() {
  return <ProductTemplate data={weighbridgeCloudBased} />;
}