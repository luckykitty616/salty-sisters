import {useState} from "react";

export default function WeatherDashboard(){

const[temp,setTemp]=useState("");
const[conditions,setConditions]=useState("");

return(
<div className="card">

<h2>Weather Dashboard</h2>

<label>Temperature</label>
<input value={temp} onChange={e=>setTemp(e.target.value)} />

<label>Conditions</label>
<input value={conditions} onChange={e=>setConditions(e.target.value)} />

<p>{temp}° {conditions}</p>

</div>
)

}