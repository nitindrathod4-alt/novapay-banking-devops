import { useEffect, useState } from "react";
import api from "../services/api";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import BalanceCard from "./BalanceCard";
import QuickActions from "./QuickActions";
import TransactionList from "./TransactionList";
import Navbar from "./Navbar";

function Dashboard() {

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


return (

<>
<Navbar />


<div
style={{
padding:"35px",
background:"#f8fafc",
minHeight:"100vh"
}}
>


<div
style={{
background:"#ffffff",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 5px 15px rgba(0,0,0,0.06)",
marginBottom:"25px"
}}
>

<h1
style={{
margin:0,
color:"#0f172a"
}}
>
Welcome Back, Nitin 👋
</h1>


<p
style={{
color:"#64748b",
marginTop:"10px"
}}
>
Manage your NovaPay account securely
</p>


</div>



<BalanceCard />


<div
style={{
background:"#ffffff",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 5px 15px rgba(0,0,0,0.06)",
marginTop:"25px"
}}
>

<h2>📊 My Spending</h2>

<h3>
Today Spent:
₹ {spending.todaySpent.toLocaleString()}
</h3>

<h3>
Total Spent:
₹ {spending.totalSpent.toLocaleString()}
</h3>

</div>


<div
style={{
background:"#ffffff",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 5px 15px rgba(0,0,0,0.06)",
marginTop:"25px"
}}
>

<h2>📊 Spending Analysis</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={spendingChart}>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="amount"/>

</BarChart>

</ResponsiveContainer>

</div>


<div style={{
marginTop:"25px"
}}>
<QuickActions />
</div>



<div style={{
marginTop:"25px"
}}>
<TransactionList />
</div>



</div>

</>

);

}

export default Dashboard;
