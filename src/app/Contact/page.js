import SectionPanel from '@/components/Shared/SectionPanel';
import ContactHero from '@/components/Contact/ContactHero';
import ContactSection from '@/components/Contact/ContactSection';

export const metadata = {
  title: 'Contact Us — IAG Soft',
  description: 'Get in touch with IAG Soft for software, ERP, and automation solutions.',
};

export default function ContactPage() {
  return (
    <>
      <SectionPanel seed="contact-hero"><ContactHero /></SectionPanel>
      <SectionPanel seed="contact-section"><ContactSection /></SectionPanel>
    </>
  );
}