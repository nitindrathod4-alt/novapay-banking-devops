import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import {
BarChart,
Bar,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";

function AnalyticsPage() {
  const [data, setData] = useState({
    totalUsers: 0,
    adminUsers: 0,
    totalBalance: 0,
    totalTransactions: 0,
  });

  const [loading, setLoading] = useState(true);

const [transactions,setTransactions]=useState([]);

const [users,setUsers]=useState([]);

const chartData=[
{
name:"Deposit",
amount:transactions
.filter(t=>t.type==="deposit")
.reduce((sum,t)=>sum+t.amount,0)
},
{
name:"Withdraw",
amount:transactions
.filter(t=>t.type==="withdraw")
.reduce((sum,t)=>sum+t.amount,0)
},
{
name:"Transfer",
amount:transactions
.filter(t=>t.type==="transfer")
.reduce((sum,t)=>sum+t.amount,0)
}
];


const kycStats={
verified:users.filter(u=>u.kycStatus==="Verified").length,
pending:users.filter(u=>u.kycStatus==="Pending").length,
rejected:users.filter(u=>u.kycStatus==="Rejected").length
};


const userGrowth = Object.values(
users.reduce((acc,u)=>{

const date = new Date(u.createdAt)
.toLocaleDateString();

if(!acc[date]){
acc[date]={
date,
users:0
};
}

acc[date].users++;

return acc;

}, {})
);


const stats={
deposits:transactions
.filter(t=>t.type==="deposit")
.reduce((sum,t)=>sum+t.amount,0),

withdraws:transactions
.filter(t=>t.type==="withdraw")
.reduce((sum,t)=>sum+t.amount,0),

transfers:transactions
.filter(t=>t.type==="transfer")
.reduce((sum,t)=>sum+t.amount,0),

count:transactions.length
};

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/users/analytics");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();


const loadTransactions=async()=>{

try{

const res=await api.get("/transactions/all");

setTransactions(res.data.transactions || []);

}catch(err){

console.log(err);

}

};

loadTransactions();


const loadUsers=async()=>{

try{

const res=await api.get("/users");

setUsers(res.data.users || []);

}catch(err){

console.log(err);

}

};


loadUsers();

  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <h1>📊 NovaPay Analytics</h1>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginTop:"30px"
}}
>

<div style={{background:"#fff",padding:"20px",borderRadius:"12px"}}>
<h3>💰 Total Deposits</h3>
<h2>₹ {stats.deposits.toLocaleString()}</h2>
</div>

<div style={{background:"#fff",padding:"20px",borderRadius:"12px"}}>
<h3>🏧 Total Withdrawals</h3>
<h2>₹ {stats.withdraws.toLocaleString()}</h2>
</div>

<div style={{background:"#fff",padding:"20px",borderRadius:"12px"}}>
<h3>🔄 Total Transfers</h3>
<h2>₹ {stats.transfers.toLocaleString()}</h2>
</div>

<div style={{background:"#fff",padding:"20px",borderRadius:"12px"}}>
<h3>📜 Total Transactions</h3>
<h2>{stats.count}</h2>
</div>

</div>


        <div
style={{
background:"#fff",
padding:"25px",
borderRadius:"15px",
marginTop:"30px"
}}
>

<h2>🔐 KYC Analytics</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"15px"
}}
>

<div>
<h3>✅ Verified</h3>
<h2>{kycStats.verified}</h2>
</div>


<div>
<h3>⏳ Pending</h3>
<h2>{kycStats.pending}</h2>
</div>


<div>
<h3>❌ Rejected</h3>
<h2>{kycStats.rejected}</h2>
</div>


</div>

</div>


<div
style={{
background:"#fff",
padding:"25px",
borderRadius:"15px",
marginTop:"30px"
}}
>

<h2>📈 User Growth</h2>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={userGrowth}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line dataKey="users"/>

</LineChart>

</ResponsiveContainer>

</div>


{loading ? (
          <h2>Loading...</h2>
        ) : (

<>

<div
style={{
background:"#fff",
padding:"25px",
borderRadius:"15px",
marginTop:"30px"
}}
>

<h2>📊 Transaction Analysis</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={chartData}>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="amount"/>

</BarChart>

</ResponsiveContainer>

</div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>👥 Total Users</h3>
              <h2>{data.totalUsers}</h2>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>👨‍💼 Admin Users</h3>
              <h2>{data.adminUsers}</h2>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>💰 Total Balance</h3>
              <h2>₹ {data.totalBalance}</h2>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>📜 Transactions</h3>
              <h2>{data.totalTransactions}</h2>
            </div>
          </div>

</>
        )}
      </div>
    </div>
  );
}

export default AnalyticsPage;
