import { useEffect, useState } from "react";
import api from "../services/api";

function BalanceCard() {

const [user,setUser]=useState({
name:"",
username:"",
balance:0,
accountNumber:"",
accountType:"",
branchName:"",
kycStatus:"",
accountOpenDate:"",
status:""
});


useEffect(()=>{
loadBalance();
},[]);


const loadBalance=async()=>{

try{

const res=await api.get("/transactions/balance");

setUser(res.data.user);

localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);

}catch(err){

console.log(err);

}

};


return (

<div
style={{
background:"#ffffff",
padding:"30px",
borderRadius:"20px",
boxShadow:"0 8px 25px rgba(0,0,0,0.08)",
marginBottom:"25px"
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

<p style={{
color:"#64748b",
margin:0
}}>
Available Balance
</p>


<h1
style={{
fontSize:"42px",
color:"#059669",
margin:"10px 0"
}}
>
₹ {user.balance}
</h1>


</div>


<div
style={{
fontSize:"45px"
}}
>
💳
</div>


</div>



<hr
style={{
border:"none",
borderTop:"1px solid #e2e8f0",
margin:"25px 0"
}}
/>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"15px"
}}
>


<div>
<p style={{color:"#64748b"}}>
Account Holder
</p>

<strong>
{user.name}
</strong>
</div>


<div>
<p style={{color:"#64748b"}}>
Username
</p>

<strong>
{user.username}
</strong>
</div>


<div>
<p style={{color:"#64748b"}}>
Account Number
</p>

<strong>
{user.accountNumber || "-"}
</strong>
</div>


<div>
<p style={{color:"#64748b"}}>
Status
</p>

<strong style={{color:"#059669"}}>
🟢 Active
</strong>
</div>


<div>
<p style={{color:"#64748b"}}>
Account Type
</p>

<strong>
{user.accountType || "-"}
</strong>
</div>


<div>
<p style={{color:"#64748b"}}>
Branch
</p>

<strong>
{user.branchName || "-"}
</strong>
</div>


<div>
<p style={{color:"#64748b"}}>
KYC Status
</p>

<strong>
{user.kycStatus || "Pending"}
</strong>
</div>


<div>
<p style={{color:"#64748b"}}>
Account Open Date
</p>

<strong>
{user.accountOpenDate
? new Date(user.accountOpenDate).toLocaleDateString()
: "-"}
</strong>
</div>


</div>


</div>

);

}

export default BalanceCard;
