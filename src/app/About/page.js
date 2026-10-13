import SectionPanel from '@/components/Shared/SectionPanel';
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import Mission from "@/components/about/Mission";
import Expertise from "@/components/about/Expertise";
import CoreValues from "@/components/About/CoreValues";
import WhyChooseUs from "@/components/About/WhyChooseUs";

export const metadata = {
  title: "About Us — IAG Soft",
  description:
    "IAG Soft is a private software company based in the city of Multan, Pakistan. Established in 1989, we focus on developing innovative software solutions for businesses across industries.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SectionPanel seed="story"><OurStory /></SectionPanel>
<Mission />
<SectionPanel seed="expertise"><Expertise /></SectionPanel>
<CoreValues />
<SectionPanel seed="why"><WhyChooseUs /></SectionPanel>
    </>
  );
}