import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";


function Card({title, subtitle, icon, color, to}){

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
background:"var(--card-bg)",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 10px 25px rgba(0,0,0,.08)"
}}
>

<div style={{fontSize:"40px"}}>
{icon}
</div>

<h2 style={{color}}>
{title}
</h2>

<p style={{color:"#64748b"}}>
{subtitle}
</p>

</div>

</Link>
)

}



function AdminDashboard(){

const [recentUsers,setRecentUsers]=useState([]);
const [stats,setStats]=useState({
total:0,
active:0,
balance:0,
pendingKyc:0
});

const [transactions,setTransactions]=useState([]);

const transactionStats = {
deposits: transactions
.filter(t=>t.type==="deposit")
.reduce((sum,t)=>sum+t.amount,0),

withdraws: transactions
.filter(t=>t.type==="withdraw")
.reduce((sum,t)=>sum+t.amount,0),

transfers: transactions
.filter(t=>t.type==="transfer")
.reduce((sum,t)=>sum+t.amount,0),

count: transactions.length
};

useEffect(()=>{

const loadUsers=async()=>{

try{

const res=await api.get("/users");

const users=res.data.users;

setRecentUsers(
users
.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
.slice(0,5)
);


setStats({
total:users.length,
active:users.filter(u=>u.status==="Active").length,
balance:users.reduce((sum,u)=>sum+u.balance,0),
pendingKyc:users.filter(u=>u.kycStatus==="Pending").length
});

}
catch(err){
console.log(err);
}

};

loadUsers();


const loadTransactions=async()=>{

try{

const res=await api.get("/transactions/all");

console.log("TRANSACTIONS:", res.data);

setTransactions(
(res.data.transactions || []).slice(0,5)
);

}catch(err){
console.log(err);
}

};

loadTransactions();

},[]);


return(

<div className="layout" style={{display:"flex"}}>

<AdminSidebar />


<div
style={{
flex:1,
padding:"30px",
background:"var(--page-bg)",
minHeight:"100vh"
}}
>


<div
style={{
background:"var(--card-bg)",
padding:"25px",
borderRadius:"20px",
marginBottom:"30px",
boxShadow:"0 5px 15px rgba(0,0,0,.05)"
}}
>

<h1>
👨‍💼 NovaPay Admin Dashboard
</h1>

<p>
Welcome back, Administrator
</p>

</div>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"25px"
}}
>


<Card
icon="👥"
title={`Users ${stats.total}`}
subtitle="Total Customers"
color="#2563eb"
to="/admin/users"
/>


<Card
icon="🟢"
title={`Active ${stats.active}`}
subtitle="Active Users"
color="#16a34a"
to="/admin/users"
/>


<Card
icon="⏳"
title={`KYC ${stats.pendingKyc}`}
subtitle="Pending Verification"
color="#ca8a04"
to="/admin/kyc"
/>


<Card
icon="➕"
title="Add User"
subtitle="Create Account"
color="#16a34a"
to="/admin/add-user"
/>


<Card
icon="💰"
title="Deposit"
subtitle="Manage Deposit"
color="#059669"
to="/admin/deposit"
/>


<Card
icon="🏧"
title="Withdraw"
subtitle="Manage Withdraw"
color="#dc2626"
to="/admin/withdraw"
/>


<Card
icon="📜"
title="Transactions"
subtitle="View Transactions"
color="#9333ea"
to="/admin/transactions"
/>


<Card
icon="🪪"
title="KYC"
subtitle="Verify Documents"
color="#7c3aed"
to="/admin/kyc"
/>


<Card
icon="📊"
title={`₹ ${stats.balance.toLocaleString()}`}
subtitle="Total Balance"
color="#ea580c"
to="/admin/analytics"
/>


</div>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginTop:"30px"
}}
>

<div style={{
background:"var(--card-bg)",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 5px 15px rgba(0,0,0,.08)"
}}>
<h3>💰 Total Deposits</h3>
<h2>₹ {transactionStats.deposits.toLocaleString()}</h2>
</div>


<div style={{
background:"var(--card-bg)",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 5px 15px rgba(0,0,0,.08)"
}}>
<h3>🏧 Total Withdrawals</h3>
<h2>₹ {transactionStats.withdraws.toLocaleString()}</h2>
</div>


<div style={{
background:"var(--card-bg)",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 5px 15px rgba(0,0,0,.08)"
}}>
<h3>🔄 Total Transfers</h3>
<h2>₹ {transactionStats.transfers.toLocaleString()}</h2>
</div>


<div style={{
background:"var(--card-bg)",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 5px 15px rgba(0,0,0,.08)"
}}>
<h3>📜 Transactions</h3>
<h2>{transactionStats.count}</h2>
</div>


</div>


<div
style={{
marginTop:"30px",
background:"var(--card-bg)",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 10px 25px rgba(0,0,0,.08)"
}}
>

<h2>📊 Recent Transactions</h2>

{
transactions.map(t=>(

<div
key={t._id}
style={{
padding:"12px 0",
borderBottom:"1px solid #eee"
}}
>

<b>
{t.type.toUpperCase()}
</b>

&nbsp; ₹ {t.amount}

<br/>

<span style={{color:"#64748b"}}>
{t.sender?.username || "-"}
</span>

</div>

))
}

</div>


<div
style={{
marginTop:"30px",
background:"var(--card-bg)",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 10px 25px rgba(0,0,0,.08)"
}}
>

<h2>
🆕 Recent Registrations
</h2>


{
recentUsers.map((u)=>(
<div
key={u._id}
style={{
padding:"12px 0",
borderBottom:"1px solid #eee"
}}
>

<b>
👤 {u.name}
</b>

<br/>

<span style={{color:"#64748b"}}>
@{u.username}
</span>

<br/>

<small>
📅 {new Date(u.createdAt).toLocaleDateString()}
</small>


</div>
))
}


</div>


</div>

</div>

)

}


export default AdminDashboard;
