import { useState, useEffect } from "react";

export default function BodyMetrics() {
  const [weight, setWeight] = useState("");
  const [waist, setWaist] = useState("");
  const [height, setHeight] = useState("");
  const [steps, setSteps] = useState("");

  const bmi = weight && height ? (703 * weight / (height * height)).toFixed(1) : "";

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bodyMetrics"));
    if (saved) {
      setWeight(saved.weight || "");
      setWaist(saved.waist || "");
      setHeight(saved.height || "");
      setSteps(saved.steps || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bodyMetrics", JSON.stringify({ weight, waist, height, steps }));
  }, [weight, waist, height, steps]);

  return (
    <div className="card">
      <h2>Body Metrics</h2>

      <label>Weight (lbs)</label>
      <input value={weight} onChange={e=>setWeight(e.target.value)} />

      <label>Waist (inches)</label>
      <input value={waist} onChange={e=>setWaist(e.target.value)} />

      <label>Height (inches)</label>
      <input value={height} onChange={e=>setHeight(e.target.value)} />

      <label>Steps Today</label>
      <input value={steps} onChange={e=>setSteps(e.target.value)} />

      <p><strong>BMI:</strong> {bmi}</p>
    </div>
  );
}