import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  const [weight, setWeight] = useState(104);
  const [waist, setWaist] = useState("");
  const [height, setHeight] = useState(60);
  const [steps, setSteps] = useState("");

  const [bloodSugar, setBloodSugar] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const [history, setHistory] = useState([]);
  const [sisterData, setSisterData] = useState([]);

  const [healthChecks, setHealthChecks] = useState({
    dental1: false,
    dental2: false,
    mammogram: false,
    gyn: false,
    physical: false,
    eye: false,
    skin: false
  });

  const encouragements = [
    "She is clothed with strength and dignity.",
    "Your sister might already be walking.",
    "Longevity is built daily.",
    "Strong women age differently.",
    "Lake days feel better when knees don’t ache."
  ];

  const todayMessage =
    encouragements[new Date().getDate() % encouragements.length];

  useEffect(() => {
    const saved = localStorage.getItem("saltySistersFull");
    if (saved) {
      const data = JSON.parse(saved);
      setWeight(data.weight || 104);
      setWaist(data.waist || "");
      setHeight(data.height || 60);
      setSteps(data.steps || "");
      setBloodSugar(data.bloodSugar || "");
      setSystolic(data.systolic || "");
      setDiastolic(data.diastolic || "");
      setHistory(data.history || []);
      setSisterData(data.sisterData || []);
      setHealthChecks(data.healthChecks || healthChecks);
      setDarkMode(data.darkMode ?? true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "saltySistersFull",
      JSON.stringify({
        weight,
        waist,
        height,
        steps,
        bloodSugar,
        systolic,
        diastolic,
        history,
        sisterData,
        healthChecks,
        darkMode
      })
    );
  }, [
    weight,
    waist,
    height,
    steps,
    bloodSugar,
    systolic,
    diastolic,
    history,
    sisterData,
    healthChecks,
    darkMode
  ]);

  const bmi =
    height && weight
      ? ((weight / (height * height)) * 703).toFixed(1)
      : null;

  const bmiColor =
    bmi < 18.5
      ? "#60a5fa"
      : bmi < 25
      ? "#22c55e"
      : bmi < 30
      ? "#f59e0b"
      : "#ef4444";

  const longevityScore = Math.min(
    100,
    Math.round(
      (steps / 10000) * 40 +
        (bmi && bmi < 25 ? 20 : 10) +
        (bloodSugar && bloodSugar < 100 ? 20 : 10) +
        (systolic && systolic < 120 ? 20 : 10)
    )
  );

  const saveDay = () => {
    const today = new Date().toLocaleDateString();
    const newEntry = {
      date: today,
      weight: Number(weight),
      waist: Number(waist),
      bmi: Number(bmi),
      steps: Number(steps)
    };
    setHistory([...history, newEntry]);
    setSisterData([...sisterData, newEntry]);
  };

  const toggleCheck = key => {
    setHealthChecks({ ...healthChecks, [key]: !healthChecks[key] });
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
    <div style={{ padding: 20, maxWidth: 900, margin: "auto", ...styles }}>
      <h1>Salty Sisters 🌊</h1>

      <button style={styles.button} onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div style={styles.card}>
        <h3>Daily Encouragement</h3>
        <p>{todayMessage}</p>
      </div>

      <div style={styles.card}>
        <h2>Body Metrics</h2>

        <input style={styles.input} placeholder="Weight (lbs)" value={weight} onChange={e => setWeight(e.target.value)} />
        <input style={styles.input} placeholder="Waist (inches)" value={waist} onChange={e => setWaist(e.target.value)} />
        <input style={styles.input} placeholder="Height (inches)" value={height} onChange={e => setHeight(e.target.value)} />
        <input style={styles.input} placeholder="Steps Today" value={steps} onChange={e => setSteps(e.target.value)} />

        {bmi && (
          <div style={{ marginTop: 15 }}>
            <strong>BMI: </strong>
            <span style={{ color: bmiColor, fontSize: 22 }}>{bmi}</span>
          </div>
        )}

        <button style={styles.button} onClick={saveDay}>
          Save Today
        </button>
      </div>

      <div style={styles.card}>
        <h2>Blood Sugar</h2>
        <input style={styles.input} placeholder="Fasting Blood Sugar" value={bloodSugar} onChange={e => setBloodSugar(e.target.value)} />
      </div>

      <div style={styles.card}>
        <h2>Blood Pressure</h2>
        <input style={styles.input} placeholder="Systolic" value={systolic} onChange={e => setSystolic(e.target.value)} />
        <input style={styles.input} placeholder="Diastolic" value={diastolic} onChange={e => setDiastolic(e.target.value)} />
      </div>

      <div style={styles.card}>
        <h2>Longevity Score</h2>
        <div style={{ fontSize: 40, fontWeight: "bold" }}>
          {longevityScore} / 100
        </div>
      </div>

      <div style={styles.card}>
        <h2>Progress Trends</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" strokeWidth={3} />
            <Line type="monotone" dataKey="waist" strokeWidth={3} />
            <Line type="monotone" dataKey="bmi" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.card}>
        <h2>Sister Dashboard</h2>
        {sisterData.map((entry, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            {entry.date} — Weight: {entry.weight} | BMI: {entry.bmi}
          </div>
        ))}
      </div>
    </div>
  );
}