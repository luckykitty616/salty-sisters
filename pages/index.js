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

  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [fiber, setFiber] = useState("");
  const [entries, setEntries] = useState([]);

  const [history, setHistory] = useState([]);

  const affirmations = [
    "She is clothed with strength and dignity; she can laugh at the days to come. – Proverbs 31:25",
    "This is not aging. This is evolving.",
    "Hot flashes mean I’m still fire.",
    "God is not finished with your story. This is a new chapter.",
    "Midlife: when you finally stop apologizing and start thriving."
  ];

  const randomAffirmation =
    affirmations[new Date().getDate() % affirmations.length];

  useEffect(() => {
    const saved = localStorage.getItem("hormoneHQ");
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
      setEntries(data.entries || []);
      setHistory(data.history || []);
      setDarkMode(data.darkMode ?? true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "hormoneHQ",
      JSON.stringify({
        weight,
        waist,
        height,
        steps,
        energy,
        mood,
        sleep,
        water,
        entries,
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
    entries,
    history,
    darkMode
  ]);

  const addEntry = () => {
    if (!calories) return;
    setEntries([...entries, { calories, protein, carbs, fat, fiber }]);
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setFiber("");
  };

  const removeEntry = index => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  const saveDay = () => {
    const today = new Date().toLocaleDateString();
    setHistory([...history, { date: today, weight, waist }]);
  };

  const total = key =>
    entries.reduce((sum, e) => sum + Number(e[key] || 0), 0);

  const styles = {
    background: darkMode ? "#0f172a" : "#f8fafc",
    color: darkMode ? "white" : "#111",
    card: {
      background: darkMode ? "#1e293b" : "white",
      padding: 20,
      borderRadius: 16,
      marginBottom: 20
    },
    label: { display: "block", marginTop: 10 },
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
      background: "#6366f1",
      color: "white",
      marginTop: 10
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto", ...styles }}>
      <h1>Hormone Strength & Grace HQ</h1>

      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Beach"
        style={{ width: "100%", borderRadius: 16, marginBottom: 20 }}
      />

      <div style={styles.card}>
        <h3>Daily Encouragement</h3>
        <p>{randomAffirmation}</p>
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

        <label style={styles.label}>Steps</label>
        <input style={styles.input} value={steps} onChange={e => setSteps(e.target.value)} />

        <button style={styles.button} onClick={saveDay}>Save Today</button>
      </div>

      <div style={styles.card}>
        <h2>Core & Strength (8)</h2>
        <ul>
          <li>Dead Bugs – 3x12</li>
          <li>Glute Bridges – 3x15</li>
          <li>Pallof Press – 3x12</li>
          <li>Heel Taps – 3x20</li>
          <li>Step-Ups – 3x12</li>
          <li>Goblet Squats – 3x12</li>
          <li>Resistance Band Rows – 3x15</li>
          <li>Incline Walking – 30 min</li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2>Calm & Cortisol Reset</h2>
        <ul>
          <li>4-7-8 Breathing – 5 min</li>
          <li>10-min guided meditation</li>
          <li>Evening gratitude journal</li>
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
