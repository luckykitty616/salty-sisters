import { useState } from "react";

export default function HealthReminders(){

const [checks,setChecks]=useState({
dental1:false,
dental2:false,
mammogram:false,
gyn:false,
physical:false,
eye:false,
skin:false
});

const toggle=(k)=>setChecks({...checks,[k]:!checks[k]});

return(
<div className="card">

<h2>Health Reminders</h2>

<label><input type="checkbox" checked={checks.dental1} onChange={()=>toggle("dental1")}/> Dental Exam 1</label><br/>

<label><input type="checkbox" checked={checks.dental2} onChange={()=>toggle("dental2")}/> Dental Exam 2</label><br/>

<label><input type="checkbox" checked={checks.mammogram} onChange={()=>toggle("mammogram")}/> Mammogram</label><br/>

<label><input type="checkbox" checked={checks.gyn} onChange={()=>toggle("gyn")}/> Annual Gynecological Exam</label><br/>

<label><input type="checkbox" checked={checks.physical} onChange={()=>toggle("physical")}/> General Physical / Labs</label><br/>

<label><input type="checkbox" checked={checks.eye} onChange={()=>toggle("eye")}/> Eye Exam</label><br/>

<label><input type="checkbox" checked={checks.skin} onChange={()=>toggle("skin")}/> Skin Exam</label>

</div>
)
}