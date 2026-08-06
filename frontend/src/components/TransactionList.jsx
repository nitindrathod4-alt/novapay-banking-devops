import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionList() {

const [transactions,setTransactions]=useState([]);


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


const currentUser =
JSON.parse(localStorage.getItem("user"))?.username;



const getTitle=(t)=>{

if(t.type==="deposit") return "Deposit";

if(t.type==="withdraw") return "Withdraw";


if(t.type==="transfer"){

if(t.sender?.username===currentUser)
return `Transfer to ${t.receiver?.username || "-"}`;

return `Transfer from ${t.sender?.username || "-"}`;

}


return t.type;

};



const getAmount=(t)=>{

if(t.type==="deposit")
return {
text:`+ ₹${t.amount}`,
color:"#059669"
};


if(t.type==="withdraw")
return {
text:`- ₹${t.amount}`,
color:"#dc2626"
};


if(t.type==="transfer"){

if(t.sender?.username===currentUser)

return {
text:`- ₹${t.amount}`,
color:"#059669"
};


return {
text:`+ ₹${t.amount}`,
color:"#059669"
};

}


return {
text:`₹${t.amount}`,
color:"#334155"
};

};



return (

<div
style={{
background:"var(--card-bg)",
padding:"25px",
borderRadius:"20px",
boxShadow:"0 8px 20px rgba(0,0,0,0.06)"
}}
>


<h2
style={{
color:"#0f172a",
marginBottom:"20px"
}}
>
📜 Recent Transactions
</h2>



{
transactions.length===0 ?

<p style={{color:"#64748b"}}>
No Transactions Found
</p>


:

<div>

{
transactions.map(t=>{


const amount=getAmount(t);


return(

<div
key={t._id}
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px",
borderBottom:"1px solid #e2e8f0"
}}
>


<div>

<h4
style={{
margin:0,
color:"#0f172a"
}}
>
{t.type==="deposit"?"💰":
t.type==="withdraw"?"🏧":"💸"}
{" "}
{getTitle(t)}
</h4>


<p
style={{
margin:"5px 0 0",
color:"#64748b",
fontSize:"13px"
}}
>
{new Date(t.createdAt).toLocaleDateString()}
</p>


</div>



<strong
style={{
color:amount.color,
fontSize:"18px"
}}
>
{amount.text}
</strong>


</div>


)

})

}

</div>

}


</div>

);

}


export default TransactionList;
