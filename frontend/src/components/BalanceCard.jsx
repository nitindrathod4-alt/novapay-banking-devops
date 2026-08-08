import { useEffect, useState } from "react";
import api from "../services/api";

function BalanceCard(){

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

const [showBalance,setShowBalance]=useState(true);


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


const money=Number(user.balance || 0).toLocaleString("en-IN");


const maskedAccount=user.accountNumber
? `•••• •••• ${String(user.accountNumber).slice(-4)}`
: "-";


const detailStyle={
background:"#f8fafc",
borderRadius:"12px",
padding:"14px 16px",
border:"1px solid #edf0f3"
};


return(

<div
style={{
background:"#ffffff",
borderRadius:"22px",
padding:"28px",
border:"1px solid #e9edf2",
boxShadow:"0 10px 30px rgba(15,23,42,0.07)"
}}
>


{/* TOP */}

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"flex-start",
gap:"20px"
}}
>

<div>

<p
style={{
margin:"0 0 8px",
fontSize:"13px",
fontWeight:"700",
letterSpacing:"0.5px",
color:"#64748b"
}}
>
AVAILABLE BALANCE
</p>


<div
style={{
display:"flex",
alignItems:"center",
gap:"14px"
}}
>

<h1
style={{
margin:0,
fontSize:"40px",
fontWeight:"800",
color:"#9b1c31",
letterSpacing:"-1px"
}}
>
{showBalance ? `₹ ${money}` : "₹ •••••••"}
</h1>


<button
onClick={()=>setShowBalance(!showBalance)}
style={{
border:"none",
background:"#f8fafc",
borderRadius:"10px",
padding:"8px 11px",
cursor:"pointer",
fontSize:"17px"
}}
>
{showBalance ? "👁️" : "🙈"}
</button>

</div>


<p
style={{
margin:"8px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
Your funds are protected with NovaPay secure banking
</p>

</div>


{/* CARD ICON */}

<div
style={{
width:"58px",
height:"58px",
borderRadius:"16px",
background:"#fff1f2",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px"
}}
>
💳
</div>

</div>


{/* DIVIDER */}

<div
style={{
height:"1px",
background:"#edf0f3",
margin:"25px 0"
}}
/>


{/* ACCOUNT DETAILS */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(4,minmax(0,1fr))",
gap:"13px"
}}
>


<div style={detailStyle}>
<p
style={{
margin:"0 0 6px",
fontSize:"11px",
color:"#94a3b8",
fontWeight:"700",
textTransform:"uppercase"
}}
>
Account Holder
</p>

<strong
style={{
fontSize:"14px",
color:"#111827"
}}
>
{user.name || "-"}
</strong>
</div>


<div style={detailStyle}>
<p
style={{
margin:"0 0 6px",
fontSize:"11px",
color:"#94a3b8",
fontWeight:"700",
textTransform:"uppercase"
}}
>
Account Number
</p>

<strong
style={{
fontSize:"14px",
color:"#111827"
}}
>
{maskedAccount}
</strong>
</div>


<div style={detailStyle}>
<p
style={{
margin:"0 0 6px",
fontSize:"11px",
color:"#94a3b8",
fontWeight:"700",
textTransform:"uppercase"
}}
>
Account Type
</p>

<strong
style={{
fontSize:"14px",
color:"#111827"
}}
>
{user.accountType || "-"}
</strong>
</div>


<div style={detailStyle}>
<p
style={{
margin:"0 0 6px",
fontSize:"11px",
color:"#94a3b8",
fontWeight:"700",
textTransform:"uppercase"
}}
>
Status
</p>

<strong
style={{
fontSize:"14px",
color:"#16a34a"
}}
>
🟢 {user.status || "Active"}
</strong>
</div>


<div style={detailStyle}>
<p
style={{
margin:"0 0 6px",
fontSize:"11px",
color:"#94a3b8",
fontWeight:"700",
textTransform:"uppercase"
}}
>
Username
</p>

<strong
style={{
fontSize:"14px",
color:"#111827"
}}
>
{user.username || "-"}
</strong>
</div>


<div style={detailStyle}>
<p
style={{
margin:"0 0 6px",
fontSize:"11px",
color:"#94a3b8",
fontWeight:"700",
textTransform:"uppercase"
}}
>
Branch
</p>

<strong
style={{
fontSize:"14px",
color:"#111827"
}}
>
{user.branchName || "-"}
</strong>
</div>


<div style={detailStyle}>
<p
style={{
margin:"0 0 6px",
fontSize:"11px",
color:"#94a3b8",
fontWeight:"700",
textTransform:"uppercase"
}}
>
KYC Status
</p>

<strong
style={{
fontSize:"14px",
color:user.kycStatus === "Approved"
? "#16a34a"
: "#ea580c"
}}
>
{user.kycStatus || "Pending"}
</strong>
</div>


<div style={detailStyle}>
<p
style={{
margin:"0 0 6px",
fontSize:"11px",
color:"#94a3b8",
fontWeight:"700",
textTransform:"uppercase"
}}
>
Account Open Date
</p>

<strong
style={{
fontSize:"14px",
color:"#111827"
}}
>
{user.accountOpenDate
? new Date(user.accountOpenDate).toLocaleDateString("en-IN")
: "-"}
</strong>
</div>


</div>


{/* SECURITY FOOTER */}

<div
style={{
marginTop:"22px",
padding:"13px 16px",
background:"#f8fafc",
borderRadius:"12px",
display:"flex",
alignItems:"center",
gap:"10px",
fontSize:"12px",
color:"#64748b"
}}
>

<span style={{fontSize:"17px"}}>
🔐
</span>

<span>
Your account information is protected by NovaPay security.
</span>

</div>


</div>

);

}

export default BalanceCard;
