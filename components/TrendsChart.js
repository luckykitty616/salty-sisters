import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts";

const data=[
{day:"Mon",steps:4000},
{day:"Tue",steps:6000},
{day:"Wed",steps:7500},
{day:"Thu",steps:5000},
{day:"Fri",steps:9000}
];

export default function TrendsChart(){

return(

<div className="card">

<h2>Progress Trends</h2>

<ResponsiveContainer width="100%" height={250}>
<LineChart data={data}>
<XAxis dataKey="day"/>
<YAxis/>
<Tooltip/>
<Line dataKey="steps" strokeWidth={2}/>
</LineChart>
</ResponsiveContainer>

</div>

)

}