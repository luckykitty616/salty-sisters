export default function DeclutterIdeas(){

const ideas=[
"Delete unused apps",
"Clear unused photos",
"Update passwords",
"Clean one drawer",
"Unsubscribe from 5 emails"
];

return(
<div className="card">
<h2>Declutter</h2>
<ul>
{ideas.map((idea,i)=>(<li key={i}>{idea}</li>))}
</ul>
</div>
)

}