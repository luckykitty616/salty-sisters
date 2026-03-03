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
  const heightInches = 60;
  const proteinGoal = 90;
  const calorieGoal = 1450;
  const weightGoal = 95;

  const [darkMode, setDarkMode] = useState(true);
  const [weight, setWeight] = useState(104);
  const [waist, setWaist] = useState("");
  const [history, setHistory] = useState([]);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("hlp");
    if (saved) {
      const data = JSON.parse(saved);
      setWeight(data.weight || 104);
      setWaist(data.waist || "");
      setHistory(data.history || []);
      setEntries(data.entries || []);
      setDarkMode(data.darkMode ?? true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "hlp",
      JSON.stringify({ weight, waist, history, entries, darkMode })
    );
  }, [weight, waist, history, entries, darkMode]);

  const addEntry = () => {
    if (!calories || !protein) return;
    setEntries([...entries, { calories, protein }]);
    setCalories("");
    setProtein("");
  };

  const saveMetrics = () => {
    const today = new Date().toLocaleDateString();
    setHistory([...history, { date: today, weight, waist }]);
  };

  const totalCalories = entries.reduce((sum, e) => sum + Number(e.calories), 0);
  const totalProtein = entries.reduce((sum, e) => sum + Number(e.protein), 0);

  const bmi = ((weight / (heightInches * heightInches)) * 703).toFixed(1);

  const weightProgress =
    ((104 - weight) / (104 - weightGoal)) * 100;

  const styles = {
    background: darkMode ? "#0f172a" : "#f8fafc",
    color: darkMode ? "white" : "#111",
    card: {
      background: darkMode ? "#1e293b" : "white",
      padding: 20,
      borderRadius: 16,
      marginBottom: 20
    },
    input: {
      padding: 8,
      marginRight: 8,
      marginBottom: 8,
      borderRadius: 8,
      border: "1px solid #ccc"
    },
    button: {
      padding: "8px 14px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      background: "#6366f1",
      color: "white"
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 650, margin: "auto", ...styles }}>
      <h1>Hormone Lean Pro</h1>

      <button
        style={{ ...styles.button, marginBottom: 20 }}
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div style={styles.card}>
        <h2>Nutrition</h2>
        <p>Calories: {totalCalories}/{calorieGoal}</p>
        <p>Protein: {totalProtein}/{proteinGoal}g</p>

        <input
          style={styles.input}
          placeholder="Calories"
          value={calories}
          onChange={e => setCalories(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Protein"
          value={protein}
          onChange={e => setProtein(e.target.value)}
        />
        <button style={styles.button} onClick={addEntry}>
          Add Entry
        </button>
      </div>

      <div style={styles.card}>
        <h2>Body Metrics</h2>
        <input
          style={styles.input}
          placeholder="Weight"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Waist (inches)"
          value={waist}
          onChange={e => setWaist(e.target.value)}
        />
        <p>BMI: {bmi}</p>

        <div style={{ background: "#ddd", borderRadius: 10, height: 10 }}>
          <div
            style={{
              width: `${Math.min(weightProgress, 100)}%`,
              background: "#22c55e",
              height: "100%",
              borderRadius: 10
            }}
          />
        </div>
        <p>Weight Goal Progress</p>

        <button style={styles.button} onClick={saveMetrics}>
          Save Today
        </button>
      </div>

      <div style={styles.card}>
        <h2>Progress</h2>
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

      <div style={styles.card}>
        <h2>Lower Belly Reset Plan</h2>
        <ul>
          <li>Dead bugs – 3x12</li>
          <li>Glute bridges – 3x15</li>
          <li>Heel taps – 3x20</li>
          <li>Plank (slow breathing) – 45 sec</li>
          <li>10-minute incline walk post-meal</li>
        </ul>
      </div>
    </div>
  );
}
