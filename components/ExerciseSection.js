export default function ExerciseSection(){

const exercises=[
"Dead Bugs – 3x12",
"Glute Bridges – 3x15",
"Pallof Press – 3x12",
"Heel Taps – 3x20",
"Goblet Squats – 3x12",
"Step Ups – 3x12",
"Resistance Band Rows – 3x15",
"Incline Walking – 30 minutes"
];

return(
<div className="card">
<h2>Core & Strength</h2>
<ul>
{exercises.map((ex,i)=>(<li key={i}>{ex}</li>))}
</ul>
</div>
)
}