import SectionPanel from '@/components/Shared/SectionPanel';
import ProductHero from '@/components/Product/ProductHero';

import ProductSelector from '@/components/Product/ProductSelector';
import { WEIGHBRIDGE_PRODUCTS } from '@/data/productList';

export const metadata = {
  title: 'Weighbridge Solutions — IAG Soft',
  description: "Explore IAG Soft's full range of weighbridge automation solutions.",
};

export default function WeighbridgePage() {
  return (
    <>
      <SectionPanel seed="weighbridge-hero">
        <ProductHero
          eyebrow="Weighbridge Solutions"
          headlineLines={['Precision Weighing,', 'Fully Automated.']}
          tagline="From real-time API access to fully unmanned operation, IAG Soft's weighbridge solutions bring accuracy and automation to every stage of the weighing process."
          stats={[
            { number: '6', label: 'Weighbridge Solutions' },
            { number: '35+', label: 'Years in Business' },
            { number: '5000+', label: 'Projects Delivered' },
          ]}
        />
      </SectionPanel>
      <SectionPanel seed="weighbridge-selector">
        <ProductSelector items={WEIGHBRIDGE_PRODUCTS} />
      </SectionPanel>
    </>
  );
}