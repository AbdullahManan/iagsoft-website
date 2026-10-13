import SectionPanel from '@/components/shared/SectionPanel';
import Hero from '@/components/ApnaAccount/Hero';
import TrustStrip from '@/components/ApnaAccount/TrustStrip';
import ProblemSolution from '@/components/ApnaAccount/ProblemSolution';
import ConnectedFlow from '@/components/ApnaAccount/ConnectedFlow';
import BeforeAfter from '@/components/ApnaAccount/BeforeAfter';
import Industries from '@/components/ApnaAccount/Industries';

export default function ApnaAccountPage() {
  return (
    <>
      <Hero />
      <SectionPanel seed="apna-trust"><TrustStrip /></SectionPanel>
     <SectionPanel> <ProblemSolution /></SectionPanel>
     <ConnectedFlow />
    <BeforeAfter />
    <Industries />
    
    </>
  );
}