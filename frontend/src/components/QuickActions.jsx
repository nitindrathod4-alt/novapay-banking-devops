import { Link } from "react-router-dom";

function ActionCard({icon,title,to}){

return(

<Link
to={to}
style={{
textDecoration:"none"
}}
>

<div
style={{
background:"#ffffff",
padding:"20px",
borderRadius:"16px",
textAlign:"center",
boxShadow:"0 6px 18px rgba(0,0,0,0.08)",
cursor:"pointer"
}}
>

<div style={{
fontSize:"35px"
}}>
{icon}
</div>


<h3
style={{
color:"#0f172a",
marginTop:"10px"
}}
>
{title}
</h3>


</div>

</Link>

);

}



function QuickActions(){

return(

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
gap:"20px",
marginBottom:"30px"
}}
>


<ActionCard
icon="💸"
title="Transfer"
to="/transfer"
/>




<ActionCard
icon="📱"
title="Mobile Recharge"
to="/mobile-recharge"
/>


<ActionCard
icon="📄"
title="Bill Payments"
to="/bill-payment"
/>


<ActionCard
icon="📜"
title="History"
to="/transactions"
/>


</div>

);

}


export default QuickActions;
