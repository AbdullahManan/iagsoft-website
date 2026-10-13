import SectionPanel from '@/components/shared/SectionPanel';
import ProductHero from '@/components/Product/ProductHero';
import ProductSelector from '@/components/Product/ProductSelector';

export const metadata = {
  title: 'Products — IAG Soft',
  description: 'Explore IAG Soft\'s full product lineup, from ERP and Apna Account to Weighbridge solutions.',
};

export default function ProductPage() {
  return (
    <>
      <SectionPanel seed="product-hero"><ProductHero /></SectionPanel>
      <SectionPanel seed="product-selector"><ProductSelector /></SectionPanel>
    </>
  );
}