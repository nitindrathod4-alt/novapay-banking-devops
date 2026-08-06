import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionsAdminPage(){

const [transactions,setTransactions]=useState([]);
const [username,setUsername]=useState("");
const [type,setType]=useState("");
const [from,setFrom]=useState("");
const [to,setTo]=useState("");


useEffect(()=>{
loadTransactions();
},[]);


const loadTransactions=async()=>{

try{

const res=await api.get("/transactions/all");

setTransactions(res.data.transactions || []);

}catch(err){

console.log(err);

}

};


const filterTransactions=async()=>{

try{

const res=await api.get("/transactions/filter",{
params:{
username,
type,
from,
to
}
});

setTransactions(res.data.transactions || []);

}catch(err){

console.log(err);

}

};



const resetFilters=()=>{

setUsername("");
setType("");
setFrom("");
setTo("");

loadTransactions();

};



const exportExcel=async()=>{

try{

const res=await api.get("/transactions/export",{
responseType:"blob"
});


const url=window.URL.createObjectURL(
new Blob([res.data])
);


const link=document.createElement("a");

link.href=url;

link.download="NovaPay-Transactions.xlsx";

link.click();


}catch(err){

console.log(err);

}

};



return(

<div style={{
padding:"30px",
background:"var(--page-bg)",
minHeight:"100vh"
}}>


<BackButton />

<h1>📜 All Transactions</h1>


<div style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
margin:"20px 0"
}}>


<input
placeholder="🔍 Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>


<select
value={type}
onChange={(e)=>setType(e.target.value)}
>

<option value="">All Types</option>
<option value="deposit">Deposit</option>
<option value="withdraw">Withdraw</option>
<option value="transfer">Transfer</option>

</select>


<input
type="date"
value={from}
onChange={(e)=>setFrom(e.target.value)}
/>


<input
type="date"
value={to}
onChange={(e)=>setTo(e.target.value)}
/>


<button onClick={filterTransactions}>
🔍 Filter
</button>


<button onClick={resetFilters}>
🔄 Reset
</button>


<button
onClick={exportExcel}
style={{
background:"#16a34a",
color:"white",
padding:"8px 15px",
border:"none",
borderRadius:"8px"
}}
>
📄 Export Excel
</button>


</div>



{
transactions.map((t)=>(


<div
key={t._id}
style={{
background:"var(--card-bg)",
padding:"25px",
borderRadius:"15px",
marginBottom:"20px",
boxShadow:"0 5px 15px rgba(0,0,0,.08)"
}}
>


<h3>
💳 Transaction #{t._id.slice(-8)}
</h3>


<p>
👤 Sender:
<b> {t.sender?.username || "-"}</b>
</p>


<p>
👤 Receiver:
<b> {t.receiver?.username || "-"}</b>
</p>


<p>
🔄 Type:
<b> {t.type}</b>
</p>


<p style={{
fontSize:"20px",
fontWeight:"bold",
color:t.type==="deposit"?"green":"red"
}}>
💰 Amount:
₹ {t.amount}
</p>


<p>
Status:

<span style={{
marginLeft:"10px",
padding:"5px 12px",
borderRadius:"20px",
background:"#dcfce7",
color:"#15803d",
fontWeight:"bold"
}}>
✅ {t.status}
</span>

</p>


<p>
📅 Date:
{new Date(t.createdAt).toLocaleString()}
</p>


</div>


))
}


</div>

);

}


export default TransactionsAdminPage;
