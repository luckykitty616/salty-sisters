import { useState } from "react";

export default function HealthTrackers() {
  const [systolic,setSystolic]=useState("");
  const [diastolic,setDiastolic]=useState("");
  const [bloodSugar,setBloodSugar]=useState("");

  return (
    <div className="card">
      <h2>Health Trackers</h2>

      <label>Blood Pressure</label>
      <input placeholder="Systolic" value={systolic} onChange={e=>setSystolic(e.target.value)} />
      <input placeholder="Diastolic" value={diastolic} onChange={e=>setDiastolic(e.target.value)} />

      <label>Blood Sugar</label>
      <input value={bloodSugar} onChange={e=>setBloodSugar(e.target.value)} />
    </div>
  );
}