import { Link } from "react-router-dom";

function ActionCard({icon,title,to}){

return(

<Link
to={to}
style={{
textDecoration:"none",
color:"inherit"
}}
>

<div
style={{
background:"#ffffff",
padding:"22px 18px",
borderRadius:"18px",
textAlign:"left",
border:"1px solid #edf0f3",
boxShadow:"0 6px 20px rgba(15,23,42,0.06)",
cursor:"pointer",
transition:"all 0.2s ease",
minHeight:"125px"
}}
onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-4px)";
e.currentTarget.style.boxShadow="0 12px 28px rgba(15,23,42,0.10)";
e.currentTarget.style.borderColor="#9b1c31";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="0 6px 20px rgba(15,23,42,0.06)";
e.currentTarget.style.borderColor="#edf0f3";
}}
>

<div
style={{
width:"46px",
height:"46px",
borderRadius:"13px",
background:"#fff1f2",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"23px",
marginBottom:"15px"
}}
>
{icon}
</div>


<h3
style={{
margin:"0",
fontSize:"15px",
fontWeight:"700",
color:"#111827"
}}
>
{title}
</h3>


<p
style={{
margin:"5px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
Tap to continue →
</p>


</div>

</Link>

);

}


function QuickActions(){

return(

<div>

<h2
style={{
fontSize:"21px",
fontWeight:"750",
color:"#111827",
margin:"0 0 16px"
}}
>
Quick Actions
</h2>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",
gap:"16px",
marginBottom:"30px"
}}
>


<ActionCard
icon="💸"
title="Transfer Money"
to="/transfer"
/>


<ActionCard
icon="📱"
title="Mobile Recharge"
to="/mobile-recharge"
/>


<ActionCard
icon="🧾"
title="Bill Payments"
to="/bill-payment"
/>


<ActionCard
icon="📜"
title="Transaction History"
to="/transactions"
/>


<ActionCard
icon="👤"
title="My Profile"
to="/profile"
/>


</div>

</div>

);

}


export default QuickActions;
