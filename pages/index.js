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

  useEffect(() => {
    const saved = localStorage.getItem("hormoneHQ");
    if (saved) {
      const data = JSON.parse(saved);
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
          if (typeof data[key] === "object" && data[key] !== null) return;
        }
      });
      setWeight(data.weight || 104);
      setWaist(data.waist || "");
      setHeight(data.height || 60);
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
    setEntries([
      ...entries,
      { calories, protein, carbs, fat, fiber }
    ]);
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
    setHistory([
      ...history,
      { date: today, weight, waist }
    ]);
  };

  const total = key =>
    entries.reduce((sum, e) => sum + Number(e[key] || 0), 0);

  const bmi = ((weight / (height * height)) * 703).toFixed(1);

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
      margin: 6,
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
      margin: 6
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 750, margin: "auto", ...styles }}>
      <h1>Hormone Strength HQ</h1>

      <button
        style={styles.button}
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div style={styles.card}>
        <h2>Body Metrics</h2>
        <input style={styles.input} placeholder="Weight (lbs)" value={weight} onChange={e => setWeight(e.target.value)} />
        <input style={styles.input} placeholder="Waist (inches)" value={waist} onChange={e => setWaist(e.target.value)} />
        <input style={styles.input} placeholder="Height (inches)" value={height} onChange={e => setHeight(e.target.value)} />
        <p>BMI: {bmi}</p>
        <button style={styles.button} onClick={saveDay}>Save Today</button>
      </div>

      <div style={styles.card}>
        <h2>Daily Wellness</h2>
        <p>Energy (1–5)</p>
        <input type="number" min="1" max="5" value={energy} onChange={e => setEnergy(e.target.value)} />
        <p>Mood (1–5)</p>
        <input type="number" min="1" max="5" value={mood} onChange={e => setMood(e.target.value)} />
        <input style={styles.input} placeholder="Sleep (hours)" value={sleep} onChange={e => setSleep(e.target.value)} />
        <input style={styles.input} placeholder="Water (oz)" value={water} onChange={e => setWater(e.target.value)} />
      </div>

      <div style={styles.card}>
        <h2>Nutrition</h2>
        <input style={styles.input} placeholder="Calories" value={calories} onChange={e => setCalories(e.target.value)} />
        <input style={styles.input} placeholder="Protein (g)" value={protein} onChange={e => setProtein(e.target.value)} />
        <input style={styles.input} placeholder="Carbs (g)" value={carbs} onChange={e => setCarbs(e.target.value)} />
        <input style={styles.input} placeholder="Fat (g)" value={fat} onChange={e => setFat(e.target.value)} />
        <input style={styles.input} placeholder="Fiber (g)" value={fiber} onChange={e => setFiber(e.target.value)} />
        <button style={styles.button} onClick={addEntry}>+ Add Meal</button>

        <h4>Daily Totals</h4>
        <p>Calories: {total("calories")}</p>
        <p>Protein: {total("protein")} g</p>
        <p>Carbs: {total("carbs")} g</p>
        <p>Fat: {total("fat")} g</p>
        <p>Fiber: {total("fiber")} g</p>

        {entries.map((e, i) => (
          <div key={i}>
            <small>
              {e.calories} cal | {e.protein}g protein
            </small>
            <button onClick={() => removeEntry(i)}>x</button>
          </div>
        ))}
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

      <div style={styles.card}>
        <h2>Strength + Core Plan</h2>
        <ul>
          <li>Dead Bugs – 3x12</li>
          <li>Glute Bridges – 3x15</li>
          <li>Pallof Press – 3x12</li>
          <li>Step-Ups – 3x12</li>
          <li>Incline Walk – 20–30 mins</li>
        </ul>
      </div>

      <div style={styles.card}>
        <h2>Calm + Cortisol Reset</h2>
        <ul>
          <li>4-7-8 Breathing – 5 mins</li>
          <li>10-min body scan meditation</li>
          <li>Gratitude journaling (3 wins)</li>
          <li>Evening walk after dinner</li>
        </ul>
      </div>
    </div>
  );
}
