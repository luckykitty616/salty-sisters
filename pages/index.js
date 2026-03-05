import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {

  const today = new Date().toISOString().slice(0,10);

  // -------------------------
  // HEALTH DATA
  // -------------------------

  const [stepsLog, setStepsLog] = useState(() => JSON.parse(localStorage.getItem("stepsLog") || "{}"));
  const [workoutLog, setWorkoutLog] = useState(() => JSON.parse(localStorage.getItem("workoutLog") || "{}"));

  const [weight, setWeight] = useState(localStorage.getItem("weight") || "");
  const [height, setHeight] = useState(localStorage.getItem("height") || "");
  const [bloodPressure, setBloodPressure] = useState(localStorage.getItem("bp") || "");
  const [bloodSugar, setBloodSugar] = useState(localStorage.getItem("sugar") || "");

  const [messageBoard, setMessageBoard] = useState(() => JSON.parse(localStorage.getItem("messages") || "[]"));

  // -------------------------
  // TEAM CHALLENGE
  // -------------------------

  const [team, setTeam] = useState(localStorage.getItem("team") || "");

  const lakeTotal = 42000;
  const beachTotal = 38500;

  // -------------------------
  // WEATHER
  // -------------------------

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=39.96&longitude=-83.00&current_weather=true")
      .then(res => res.json())
      .then(data => setWeather(data.current_weather));
  }, []);

  // -------------------------
  // SAVE DATA
  // -------------------------

  useEffect(()=>{localStorage.setItem("stepsLog",JSON.stringify(stepsLog))},[stepsLog]);
  useEffect(()=>{localStorage.setItem("workoutLog",JSON.stringify(workoutLog))},[workoutLog]);
  useEffect(()=>{localStorage.setItem("messages",JSON.stringify(messageBoard))},[messageBoard]);

  useEffect(()=>{localStorage.setItem("weight",weight)},[weight]);
  useEffect(()=>{localStorage.setItem("height",height)},[height]);
  useEffect(()=>{localStorage.setItem("bp",bloodPressure)},[bloodPressure]);
  useEffect(()=>{localStorage.setItem("sugar",bloodSugar)},[bloodSugar]);
  useEffect(()=>{localStorage.setItem("team",team)},[team]);

  // -------------------------
  // CALCULATIONS
  // -------------------------

  const streak = Object.keys(workoutLog).length;

  const bmi = weight && height
    ? (weight / (height * height) * 703).toFixed(1)
    : null;

  const longevityScore =
    (streak * 5) +
    (stepsLog[today] ? 10 : 0) +
    (workoutLog[today] ? 15 : 0) +
    (team ? 5 : 0);

  // -------------------------
  // REMINDERS
  // -------------------------

  useEffect(() => {

    const hour = new Date().getHours();

    if(hour === 9){
      alert("🌞 Morning reminder: Log your health stats today!");
    }

    if(hour === 18){
      alert("🏃 Evening reminder: Time for movement!");
    }

  },[]);

  // -------------------------
  // FUNCTIONS
  // -------------------------

  function addSteps(){
    const steps = prompt("Enter today's steps");
    if(!steps) return;

    setStepsLog({
      ...stepsLog,
      [today]: Number(steps)
    });
  }

  function logWorkout(){
    setWorkoutLog({
      ...workoutLog,
      [today]: true
    });
  }

  function postMessage(){
    const msg = prompt("Share encouragement with your sisters");
    if(!msg) return;

    setMessageBoard([
      {text: msg, date: today},
      ...messageBoard
    ]);
  }

  // -------------------------
  // UI
  // -------------------------

  return (

  <div style={{fontFamily:"sans-serif",padding:"20px",maxWidth:"900px",margin:"auto"}}>

  <h1>🌊 Salty Sisters Wellness</h1>

  <h3>Longevity Score: {longevityScore}</h3>

  {/* WEATHER */}

  <div style={{background:"#e8f4ff",padding:"15px",borderRadius:"10px",marginBottom:"20px"}}>
    <h3>☀ Weather</h3>

    {weather ? (
      <p>
        Temperature: {weather.temperature}°C  
        <br/>
        Wind: {weather.windspeed} km/h
      </p>
    ) : "Loading weather..."}
  </div>


  {/* HEALTH TRACKING */}

  <div style={{background:"#f4f4f4",padding:"15px",borderRadius:"10px",marginBottom:"20px"}}>

  <h3>Health Stats</h3>

  <input placeholder="Weight (lbs)" value={weight} onChange={e=>setWeight(e.target.value)}/>
  <br/>

  <input placeholder="Height (in)" value={height} onChange={e=>setHeight(e.target.value)}/>
  <br/>

  <input placeholder="Blood Pressure" value={bloodPressure} onChange={e=>setBloodPressure(e.target.value)}/>
  <br/>

  <input placeholder="Blood Sugar" value={bloodSugar} onChange={e=>setBloodSugar(e.target.value)}/>

  {bmi && <p>BMI: {bmi}</p>}

  </div>


  {/* MOVEMENT */}

  <div style={{background:"#fff3e6",padding:"15px",borderRadius:"10px",marginBottom:"20px"}}>

  <h3>Movement</h3>

  <button onClick={addSteps}>Log Steps</button>

  <button onClick={logWorkout} style={{marginLeft:"10px"}}>
    Log Workout
  </button>

  <p>Today's Steps: {stepsLog[today] || 0}</p>

  <p>Workout Streak: {streak}</p>

  </div>


  {/* TEAM CHALLENGE */}

  <div style={{background:"#dff7ff",padding:"15px",borderRadius:"10px",marginBottom:"20px"}}>

  <h3>🏖 Lake vs Beach Challenge</h3>

  {!team && (
    <>
      <button onClick={()=>setTeam("lake")}>🌊 Team Lake</button>
      <button onClick={()=>setTeam("beach")} style={{marginLeft:"10px"}}>🏝 Team Beach</button>
    </>
  )}

  {team && (
    <>
      <p>You are on Team {team === "lake" ? "Lake 🌊" : "Beach 🏝"}</p>

      <p>Lake Steps: {lakeTotal}</p>
      <p>Beach Steps: {beachTotal}</p>
    </>
  )}

  </div>


  {/* CONNECTION */}

  <div style={{background:"#f0e6ff",padding:"15px",borderRadius:"10px",marginBottom:"20px"}}>

  <h3>💬 Sister Encouragement</h3>

  <button onClick={postMessage}>Post Message</button>

  {messageBoard.map((m,i)=>(
    <p key={i}>
      {m.text} — {m.date}
    </p>
  ))}

  </div>


  {/* ENCOURAGEMENT */}

  <div style={{background:"#eaffea",padding:"15px",borderRadius:"10px"}}>

  <h3>✨ Daily Encouragement</h3>

  <p>
  "Consistency beats intensity. Move your body, calm your mind, and keep showing up."
  </p>

  </div>


  </div>

  );

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);