import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function TransactionsPage() {

const [transactions,setTransactions]=useState([]);
const [search,setSearch]=useState("");
const [filter,setFilter]=useState("all");


useEffect(()=>{
loadTransactions();
},[]);


const loadTransactions=async()=>{

try{

const res=await api.get("/transactions/history");

setTransactions(res.data.transactions || []);

}catch(err){

console.log(err);

}

};



const filteredTransactions = transactions.filter((t)=>{

const text =
(
t.type +
JSON.stringify(t.details)
).toLowerCase();


const matchSearch =
text.includes(search.toLowerCase());


const matchFilter =
filter==="all" ||
t.type===filter;


return matchSearch && matchFilter;

});


const downloadReceipt = async(id)=>{

try{

const res = await api.get(`/receipt/${id}`,{
responseType:"blob"
});


const url = window.URL.createObjectURL(
new Blob([res.data])
);


const link=document.createElement("a");

link.href=url;
link.download="NovaPay_Receipt.pdf";

document.body.appendChild(link);

link.click();

link.remove();


}catch(err){

alert("Receipt Download Failed");

}

};



const getTitle=(t)=>{

if(t.type==="transfer")
return "💸 Money Transfer";

if(t.type==="deposit")
return "💰 Deposit";

if(t.type==="withdraw")
return "🏧 Withdraw";

if(t.type==="mobile_recharge")
return "📱 Mobile Recharge";

if(t.type==="bill_payment")
return "📄 Bill Payment";

return t.type;

};



return(

<div style={{display:"flex"}}>

<Sidebar/>


<div
style={{
flex:1,
padding:"30px",
background:"#f8fafc",
minHeight:"100vh"
}}
>


<BackButton />

<h1>📜 Transaction History</h1>

<div style={{display:"flex",gap:"15px",marginTop:"20px"}}>

<input
placeholder="🔍 Search Transaction"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
padding:"12px",
flex:1,
borderRadius:"10px",
border:"1px solid #ddd"
}}
/>

<select
value={filter}
onChange={(e)=>setFilter(e.target.value)}
style={{
padding:"12px",
borderRadius:"10px"
}}
>

<option value="all">All</option>
<option value="transfer">Transfer</option>
<option value="deposit">Deposit</option>
<option value="withdraw">Withdraw</option>
<option value="mobile_recharge">Mobile Recharge</option>
<option value="bill_payment">Bill Payment</option>

</select>

</div>



<table
style={{
width:"100%",
marginTop:"25px",
borderCollapse:"collapse",
background:"white",
borderRadius:"15px",
overflow:"hidden",
boxShadow:"0 8px 20px rgba(0,0,0,0.08)"
}}
>

<thead>
<tr>
<th style={{padding:"15px",textAlign:"center"}}>Type</th>
<th style={{padding:"15px",textAlign:"center"}}>ID</th>
<th style={{padding:"15px",textAlign:"center"}}>Mode</th>
<th style={{padding:"15px",textAlign:"center"}}>Date</th>
<th style={{padding:"15px",textAlign:"center"}}>Amount</th>
<th style={{padding:"15px",textAlign:"center"}}>Status</th>
<th style={{padding:"15px",textAlign:"center"}}>Receipt</th>
</tr>
</thead>

<tbody>


{
transactions.length===0 ?

<p>No Transactions Found</p>


:

filteredTransactions.map((t)=>(

<tr
key={t._id}
style={{
borderBottom:"1px solid #e5e7eb",
textAlign:"center"
}}
>

<td style={{padding:"15px"}}>{getTitle(t)}</td>

<td style={{padding:"15px"}}>{t._id.slice(-6)}</td>

<td style={{padding:"15px"}}>
{
t.type==="bill_payment"
? t.details?.service
: t.type==="mobile_recharge"
? t.details?.operator
: t.details?.mode || "-"
}
</td>


<td style={{padding:"15px"}}>
{new Date(t.createdAt).toLocaleString()}
</td>


<td style={{
padding:"15px",
fontWeight:"bold",
color:t.type==="deposit"?"green":"red"
}}>
₹ {t.amount}
</td>


<td style={{
padding:"15px",
color:"green",
fontWeight:"bold"
}}>
✅ {t.status}
</td>


<td>
<button
onClick={()=>downloadReceipt(t._id)}
style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"8px 12px",
borderRadius:"8px",
cursor:"pointer"
}}
>
📄 Receipt
</button>
</td>


</tr>

))
}

</tbody>

</table>


</div>

</div>


);

}


export default TransactionsPage;
