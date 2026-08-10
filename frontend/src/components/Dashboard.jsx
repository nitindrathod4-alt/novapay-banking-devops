import { useEffect, useState } from "react";
import api from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import BalanceCard from "./BalanceCard";
import QuickActions from "./QuickActions";
import TransactionList from "./TransactionList";
import Navbar from "./Navbar";

function Dashboard(){

const user = JSON.parse(localStorage.getItem("user") === "undefined" ? "{}" : (localStorage.getItem("user") || "{}"));
const userName = user.name || user.username || "User";

const [spending,setSpending]=useState({
todaySpent:0,
totalSpent:0,
breakdown:{
transfer:0,
mobile_recharge:0,
bill_payment:0
}
});

useEffect(()=>{

const loadSpending=async()=>{

try{

const res=await api.get("/transactions/my-spending");

setSpending(res.data);

}catch(err){

console.log(err);

}

};

loadSpending();

},[]);


const spendingChart=[
{
name:"Transfer",
amount:spending.breakdown.transfer
},
{
name:"Recharge",
amount:spending.breakdown.mobile_recharge
},
{
name:"Bills",
amount:spending.breakdown.bill_payment
}
];


const money=(value)=>Number(value || 0).toLocaleString("en-IN");


return(

<div
style={{
minHeight:"100vh",
background:"#f6f7f9"
}}
>

<Navbar/>


<div
style={{
padding:"35px 45px",
maxWidth:"1500px",
margin:"auto"
}}
>


{/* HEADER */}

<div
style={{
background:"#ffffff",
borderRadius:"20px",
padding:"24px 28px",
marginBottom:"25px",
border:"1px solid #e9edf2",
boxShadow:"0 8px 25px rgba(15,23,42,0.06)",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
gap:"20px"
}}
>

<div>

<p
style={{
margin:"0 0 7px",
fontSize:"12px",
fontWeight:"800",
color:"#9b1c31",
letterSpacing:"1px"
}}
>
NOVA PAY • DIGITAL BANKING
</p>

<h1
style={{
margin:0,
fontSize:"30px",
fontWeight:"800",
color:"#111827",
letterSpacing:"-0.5px"
}}
>
Welcome Back, {userName} 👋
</h1>

<p
style={{
margin:"7px 0 0",
fontSize:"13px",
color:"#64748b"
}}
>
Manage your money securely and effortlessly.
</p>

</div>


<div
style={{
display:"flex",
alignItems:"center",
gap:"10px",
background:"#f8fafc",
padding:"11px 15px",
borderRadius:"13px",
border:"1px solid #edf0f3",
whiteSpace:"nowrap"
}}
>

<div
style={{
width:"9px",
height:"9px",
borderRadius:"50%",
background:"#16a34a"
}}
></div>

<div>

<p
style={{
margin:0,
fontSize:"11px",
fontWeight:"700",
color:"#94a3b8"
}}
>
ACCOUNT STATUS
</p>

<strong
style={{
fontSize:"13px",
color:"#166534"
}}
>
Active & Secure
</strong>

</div>

</div>

</div>


{/* BALANCE */}

<div
style={{
background:"#ffffff",
borderRadius:"20px",
padding:"8px",
boxShadow:"0 8px 25px rgba(15,23,42,0.07)",
border:"1px solid #edf0f3"
}}
>

<BalanceCard/>

</div>


{/* SPENDING CARDS */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,minmax(0,1fr))",
gap:"20px",
marginTop:"24px"
}}
>


<div
style={{
background:"#ffffff",
borderRadius:"18px",
padding:"24px",
border:"1px solid #edf0f3",
boxShadow:"0 6px 20px rgba(15,23,42,0.05)"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div>

<p
style={{
margin:0,
fontSize:"13px",
color:"#64748b",
fontWeight:"600"
}}
>
TODAY'S SPENDING
</p>

<h2
style={{
margin:"10px 0 0",
fontSize:"28px",
color:"#111827"
}}
>
₹ {money(spending.todaySpent)}
</h2>

</div>

<div
style={{
width:"48px",
height:"48px",
borderRadius:"14px",
background:"#fff1f2",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"22px"
}}
>
💳
</div>

</div>

</div>


<div
style={{
background:"#ffffff",
borderRadius:"18px",
padding:"24px",
border:"1px solid #edf0f3",
boxShadow:"0 6px 20px rgba(15,23,42,0.05)"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div>

<p
style={{
margin:0,
fontSize:"13px",
color:"#64748b",
fontWeight:"600"
}}
>
TOTAL SPENDING
</p>

<h2
style={{
margin:"10px 0 0",
fontSize:"28px",
color:"#9b1c31"
}}
>
₹ {money(spending.totalSpent)}
</h2>

</div>

<div
style={{
width:"48px",
height:"48px",
borderRadius:"14px",
background:"#fdf2f8",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"22px"
}}
>
📊
</div>

</div>

</div>

</div>


{/* SPENDING ANALYSIS */}

<div
style={{
background:"#ffffff",
borderRadius:"20px",
padding:"25px",
marginTop:"24px",
border:"1px solid #edf0f3",
boxShadow:"0 6px 20px rgba(15,23,42,0.05)"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"20px"
}}
>

<div>

<h2
style={{
margin:0,
fontSize:"20px",
color:"#111827"
}}
>
Spending Analysis
</h2>

<p
style={{
margin:"5px 0 0",
fontSize:"13px",
color:"#64748b"
}}
>
Your spending breakdown
</p>

</div>

<span
style={{
background:"#fff1f2",
color:"#9b1c31",
padding:"7px 12px",
borderRadius:"20px",
fontSize:"12px",
fontWeight:"700"
}}
>
Overview
</span>

</div>


<ResponsiveContainer width="100%" height={280}>

<BarChart
data={spendingChart}
margin={{
top:10,
right:20,
left:0,
bottom:5
}}
>

<XAxis
dataKey="name"
axisLine={false}
tickLine={false}
/>

<YAxis
axisLine={false}
tickLine={false}
/>

<Tooltip
formatter={(value)=>[`₹ ${money(value)}`,"Amount"]}
/>

<Bar
dataKey="amount"
fill="#9b1c31"
radius={[8,8,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>


{/* QUICK ACTIONS */}

<div
style={{
marginTop:"24px"
}}
>

<QuickActions/>

</div>


{/* TRANSACTIONS */}

<div
style={{
marginTop:"24px"
}}
>

<TransactionList/>

</div>


{/* FOOTER */}

<div
style={{
textAlign:"center",
marginTop:"40px",
paddingTop:"20px",
borderTop:"1px solid #e5e7eb",
fontSize:"12px",
color:"#94a3b8"
}}
>
NovaPay Digital Banking • Secure • Simple • Smart
</div>


</div>

</div>

);

}

export default Dashboard;
