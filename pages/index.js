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
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "hlp",
      JSON.stringify({ weight, waist, history, entries })
    );
  }, [weight, waist, history, entries]);

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

  const totalCalories = entries.reduce(
    (sum, e) => sum + Number(e.calories),
    0
  );

  const totalProtein = entries.reduce(
    (sum, e) => sum + Number(e.protein),
    0
  );

  const bmi = ((weight / (heightInches * heightInches)) * 703).toFixed(1);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h1>Salty Sisters</h1>

      <h2>Nutrition</h2>
      <p>Calories: {totalCalories}/{calorieGoal}</p>
      <p>Protein: {totalProtein}/{proteinGoal}g</p>

      <input
        placeholder="Calories"
        value={calories}
        onChange={e => setCalories(e.target.value)}
      />
      <input
        placeholder="Protein"
        value={protein}
        onChange={e => setProtein(e.target.value)}
      />
      <button onClick={addEntry}>Add Entry</button>

      <h2>Body Metrics</h2>
      <input
        placeholder="Weight"
        value={weight}
        onChange={e => setWeight(e.target.value)}
      />
      <input
        placeholder="Waist"
        value={waist}
        onChange={e => setWaist(e.target.value)}
      />
      <p>BMI: {bmi}</p>
      <button onClick={saveMetrics}>Save Today</button>

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
  );
}
