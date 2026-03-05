export default function ConnectionIdeas(){

const ideas=[
"Call a loved one",
"Play a game with spouse or friend",
"Send a text to someone you haven't talked to recently",
"Invite someone for coffee",
"Write a handwritten note"
];

return(
<div className="card">
<h2>Daily Human Connection</h2>
<ul>
{ideas.map((idea,i)=>(<li key={i}>{idea}</li>))}
</ul>
</div>
)

}