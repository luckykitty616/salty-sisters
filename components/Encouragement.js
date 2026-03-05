export default function Encouragement(){

const quotes=[
"She is clothed with strength and dignity – Proverbs 31:25",
"Longevity is built one walk at a time.",
"Your sister might already be walking.",
"Strong women age differently.",
"Lake days feel better when your knees don't hurt.",
"Movement today protects independence tomorrow."
];

const quote=quotes[new Date().getDate()%quotes.length];

return(
<div className="card">
<h2>Daily Encouragement</h2>
<p>{quote}</p>
</div>
)

}