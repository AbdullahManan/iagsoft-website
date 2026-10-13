import ServicesGrid from "@/components/Home/ServicesGrid";
import ClientsMarquee from "@/components/Home/ClientsMarquee";
import DirectorMessage from "@/components/Home/DirectorMessage";
import StatsBanner from "@/components/Home/StatsBanner";
import Testimonials from "@/components/Home/Testimonials";
import Accreditations from "@/components/Home/Accreditations";
import HistorySequence from "@/components/Home/HistorySequence";
import InstagramFeed from "@/components/Home/InstagramFeed";

export default function Home() {
  return (
    <>
      <HistorySequence />
      <Accreditations />
      <ServicesGrid />
      <ClientsMarquee />
      <DirectorMessage />
      <StatsBanner />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
