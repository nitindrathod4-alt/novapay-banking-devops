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
return "Money Transfer";

if(t.type==="deposit")
return "Deposit";

if(t.type==="withdraw")
return "Withdraw";

if(t.type==="mobile_recharge")
return "Mobile Recharge";

if(t.type==="bill_payment")
return "Bill Payment";

return t.type;

};


const getIcon=(t)=>{

if(t.type==="transfer") return "💸";

if(t.type==="deposit") return "💰";

if(t.type==="withdraw") return "🏧";

if(t.type==="mobile_recharge") return "📱";

if(t.type==="bill_payment") return "📄";

return "💳";

};


const getAmount=(t)=>{

if(t.type==="deposit")
return {
prefix:"+ ",
color:"#15803d"
};

if(t.type==="withdraw")
return {
prefix:"- ",
color:"#dc2626"
};

if(t.type==="transfer")
return {
prefix:"- ",
color:"#dc2626"
};

if(
t.type==="mobile_recharge" ||
t.type==="bill_payment"
)
return {
prefix:"- ",
color:"#dc2626"
};

return {
prefix:"",
color:"#111827"
};

};


return(

<div
style={{
minHeight:"100vh",
background:"#f6f7f9",
display:"flex"
}}
>

<Sidebar/>


<div
style={{
flex:1,
padding:"30px 45px",
maxWidth:"1250px",
margin:"0 auto"
}}
>

<BackButton/>


{/* HEADER */}

<div
style={{
marginTop:"20px",
marginBottom:"25px"
}}
>

<p
style={{
margin:0,
fontSize:"12px",
fontWeight:"800",
letterSpacing:"1px",
color:"#9b1c31"
}}
>
NOVA PAY • ACCOUNT ACTIVITY
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
Transaction History
</h1>

<p
style={{
margin:"6px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
View and manage all your recent transactions.
</p>

</div>


{/* SEARCH + FILTER */}

<div
style={{
background:"#ffffff",
padding:"18px",
borderRadius:"18px",
border:"1px solid #e9edf2",
boxShadow:"0 6px 20px rgba(15,23,42,0.04)",
display:"flex",
gap:"12px",
flexWrap:"wrap",
marginBottom:"20px"
}}
>

<input
placeholder="🔍 Search transactions"
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
flex:1,
minWidth:"220px",
padding:"13px 15px",
borderRadius:"11px",
border:"1px solid #dbe1e8",
fontSize:"14px",
outline:"none"
}}
/>


<select
value={filter}
onChange={(e)=>setFilter(e.target.value)}
style={{
padding:"13px 15px",
borderRadius:"11px",
border:"1px solid #dbe1e8",
background:"#ffffff",
fontSize:"14px",
color:"#334155",
cursor:"pointer"
}}
>

<option value="all">
All Transactions
</option>

<option value="transfer">
Money Transfer
</option>

<option value="withdraw">
Withdraw
</option>

<option value="mobile_recharge">
Mobile Recharge
</option>

<option value="bill_payment">
Bill Payment
</option>

<option value="deposit">
Deposit
</option>

</select>

</div>


{/* TRANSACTIONS CARD */}

<div
style={{
background:"#ffffff",
borderRadius:"20px",
border:"1px solid #e9edf2",
boxShadow:"0 8px 25px rgba(15,23,42,0.05)",
overflow:"hidden"
}}
>

<div
style={{
padding:"22px 25px",
borderBottom:"1px solid #edf0f3",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div>

<h2
style={{
margin:0,
fontSize:"19px",
color:"#111827"
}}
>
Recent Transactions
</h2>

<p
style={{
margin:"4px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
{filteredTransactions.length} transaction(s) found
</p>

</div>

<div
style={{
background:"#fff1f2",
color:"#9b1c31",
padding:"8px 12px",
borderRadius:"20px",
fontSize:"11px",
fontWeight:"800"
}}
>
NOVA PAY
</div>

</div>


{
transactions.length===0 ?

<div
style={{
padding:"60px 20px",
textAlign:"center",
color:"#94a3b8"
}}
>

<div style={{fontSize:"42px"}}>
📜
</div>

<h3
style={{
color:"#475569",
margin:"12px 0 5px"
}}
>
No Transactions Yet
</h3>

<p style={{fontSize:"13px"}}>
Your transaction history will appear here.
</p>

</div>

:

filteredTransactions.length===0 ?

<div
style={{
padding:"50px 20px",
textAlign:"center",
color:"#94a3b8"
}}
>

<div style={{fontSize:"35px"}}>
🔍
</div>

<h3
style={{
color:"#475569"
}}
>
No matching transactions
</h3>

<p style={{fontSize:"13px"}}>
Try changing your search or filter.
</p>

</div>

:

<div>

{filteredTransactions.map((t)=>(

<div
key={t._id}
style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
gap:"15px",
padding:"19px 25px",
borderBottom:"1px solid #f1f5f9"
}}
>


{/* LEFT */}

<div
style={{
display:"flex",
alignItems:"center",
gap:"14px",
minWidth:0
}}
>

<div
style={{
width:"46px",
height:"46px",
borderRadius:"14px",
background:"#fff1f2",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"21px",
flexShrink:0
}}
>
{getIcon(t)}
</div>


<div
style={{
minWidth:0
}}
>

<strong
style={{
display:"block",
fontSize:"14px",
color:"#111827"
}}
>
{getTitle(t)}
</strong>

<span
style={{
display:"block",
fontSize:"12px",
color:"#94a3b8",
marginTop:"3px"
}}
>
{t.createdAt
?
new Date(t.createdAt).toLocaleString("en-IN")
:"Transaction"}
</span>

</div>

</div>


{/* RIGHT */}

<div
style={{
display:"flex",
alignItems:"center",
gap:"18px"
}}
>

<div
style={{
textAlign:"right"
}}
>

<strong
style={{
display:"block",
fontSize:"16px",
color:getAmount(t).color
}}
>
{getAmount(t).prefix}
₹ {Number(t.amount || 0).toLocaleString("en-IN")}
</strong>

<span
style={{
fontSize:"10px",
fontWeight:"700",
color:"#94a3b8"
}}
>
{t.type?.replace("_"," ").toUpperCase()}
</span>

</div>


<button
onClick={()=>downloadReceipt(t._id)}
style={{
padding:"8px 11px",
borderRadius:"9px",
border:"1px solid #e5e7eb",
background:"#ffffff",
color:"#475569",
fontSize:"12px",
fontWeight:"700",
cursor:"pointer"
}}
>
🧾 Receipt
</button>

</div>

</div>

))}

</div>

}

</div>

</div>

</div>

);

}

export default TransactionsPage;
