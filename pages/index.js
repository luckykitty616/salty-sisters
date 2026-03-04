import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  const [weight, setWeight] = useState(104);
  const [waist, setWaist] = useState("");
  const [height, setHeight] = useState(60);
  const [steps, setSteps] = useState("");

  const [energy, setEnergy] = useState(3);
  const [mood, setMood] = useState(3);
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");

  const [history, setHistory] = useState([]);

  const encouragements = [
    "She is clothed with strength and dignity; she can laugh at the days to come. – Proverbs 31:25",
    "Your future grandkids need a strong Nana. Move today.",
    "Longevity isn’t luck. It’s steps, strength, and showing up.",
    "Your sister might already be walking. Just saying.",
    "Hot flashes? Channel it into a power walk.",
    "Midlife isn’t slowing down. It’s training for the next chapter.",
    "Strong women age differently.",
    "Lake days hit better when your hips and knees don’t hurt."
  ];

  const todayMessage =
    encouragements[new Date().getDate() % encouragements.length];

  useEffect(() => {
    const saved = localStorage.getItem("saltySisters");
    if (saved) {
      const data = JSON.parse(saved);
      setWeight(data.weight || 104);
      setWaist(data.waist || "");
      setHeight(data.height || 60);
      setSteps(data.steps || "");
      setEnergy(data.energy || 3);
      setMood(data.mood || 3);
      setSleep(data.sleep || "");
      setWater(data.water || "");
      setHistory(data.history || []);
      setDarkMode(data.darkMode ?? true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "saltySisters",
      JSON.stringify({
        weight,
        waist,
        height,
        steps,
        energy,
        mood,
        sleep,
        water,
        history,
        darkMode
      })
    );
  }, [
    weight,
    waist,
    height,
    steps,
    energy,
    mood,
    sleep,
    water,
    history,
    darkMode
  ]);

  const saveDay = () => {
    const today = new Date().toLocaleDateString();
    setHistory([...history, { date: today, weight, waist }]);
  };

  const styles = {
    background: darkMode ? "#0f172a" : "#f8fafc",
    color: darkMode ? "white" : "#111",
    card: {
      background: darkMode ? "#1e293b" : "white",
      padding: 20,
      borderRadius: 16,
      marginBottom: 20
    },
    label: { display: "block", marginTop: 12, fontWeight: "bold" },
    input: {
      padding: 8,
      marginTop: 4,
      width: "100%",
      borderRadius: 8,
      border: "1px solid #ccc"
    },
    button: {
      padding: "8px 14px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      background: "#14b8a6",
      color: "white",
      marginTop: 12
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto", ...styles }}>
      <h1>Salty Sisters 🌊</h1>

      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Coastal"
        style={{ width: "100%", borderRadius: 16, marginBottom: 20 }}
      />

      <div style={styles.card}>
        <h3>Daily Encouragement</h3>
        <p style={{ fontSize: 18 }}>{todayMessage}</p>
      </div>

      <button style={styles.button} onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div style={styles.card}>
        <h2>Body Metrics</h2>

        <label style={styles.label}>Weight (lbs)</label>
        <input style={styles.input} value={weight} onChange={e => setWeight(e.target.value)} />

        <label style={styles.label}>Waist (inches)</label>
        <input style={styles.input} value={waist} onChange={e => setWaist(e.target.value)} />

        <label style={styles.label}>Height (inches)</label>
        <input style={styles.input} value={height} onChange={e => setHeight(e.target.value)} />

        <label style={styles.label}>Steps Today</label>
        <input style={styles.input} value={steps} onChange={e => setSteps(e.target.value)} />

        <button style={styles.button} onClick={saveDay}>
          Save Today
        </button>
      </div>

      <div style={styles.card}>
        <h2>Core & Strength</h2>
        <ul>
          <li>Dead Bugs – 3x12</li>
          <li>Glute Bridges – 3x15</li>
          <li>Pallof Press – 3x12</li>
          <li>Heel Taps – 3x20</li>
          <li>Goblet Squats – 3x12</li>
          <li>Step-Ups – 3x12</li>
          <li>Resistance Band Rows – 3x15</li>
          <li>Incline Walk – 30 mins</li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2>Calm & Cortisol Reset</h2>
        <ul>
          <li>4-7-8 Breathing – 5 min</li>
          <li>10-min guided meditation</li>
          <li>Evening gratitude journaling</li>
          <li>Sunset walk by the water</li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2>Progress Trends</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" strokeWidth={2} />
            <Line type="monotone" dataKey="waist" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
