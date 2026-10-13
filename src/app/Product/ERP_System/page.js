import ProductTemplate from '@/components/Product/ProductTemplate';
import { erpSystem } from '@/data/products/erp-system';

export const metadata = {
  title: 'ERP System — IAG Soft',
  description: erpSystem.tagline,
};

export default function ERPSystemPage() {
  return <ProductTemplate data={erpSystem} />;
}