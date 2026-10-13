import ProductTemplate from '@/components/Product/ProductTemplate';
import { liveweightApi } from '@/data/products/weighbridge/liveweight-api';

export const metadata = {
  title: 'LiveweightAPI — IAG Soft',
  description: liveweightApi.tagline,
};

export default function LiveweightApiPage() {
  return <ProductTemplate data={liveweightApi} />;
}