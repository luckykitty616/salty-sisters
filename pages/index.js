import Encouragement from "../components/Encouragement";
import BodyMetrics from "../components/BodyMetrics";
import HealthTrackers from "../components/HealthTrackers";
import ExerciseSection from "../components/ExerciseSection";
import ConnectionIdeas from "../components/ConnectionIdeas";
import DeclutterIdeas from "../components/DeclutterIdeas";
import HealthReminders from "../components/HealthReminders";
import WeatherDashboard from "../components/WeatherDashboard";
import SisterDashboard from "../components/SisterDashboard";
import TrendsChart from "../components/TrendsChart";

export default function Home() {
  return (
    <div style={{padding:20,maxWidth:900,margin:"auto"}}>

      <h1>Salty Sisters 🌊</h1>

      <WeatherDashboard />

      <Encouragement />

      <BodyMetrics />

      <HealthTrackers />

      <ExerciseSection />

      <ConnectionIdeas />

      <DeclutterIdeas />

      <HealthReminders />

      <SisterDashboard />

      <TrendsChart />

    </div>
  );
}