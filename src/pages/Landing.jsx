import HeroSection from '../components/home/HeroSection.jsx';
import TopicGrid from '../components/home/TopicGrid.jsx';
import ProgressSummary from '../components/home/ProgressSummary.jsx';

export default function Landing() {
  return (
    <div>
      <HeroSection />
      <ProgressSummary />
      <TopicGrid />
    </div>
  );
}
