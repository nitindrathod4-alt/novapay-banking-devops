import { useState } from "react";
import BackButton from "../components/BackButton";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function WithdrawPage(){

const [amount,setAmount]=useState("");

const withdraw=async()=>{

if(!amount || Number(amount)<=0){

alert("Please enter a valid amount");
return;

}

try{

const res=await api.post("/transactions/withdraw",{
amount:Number(amount)
});

alert(res.data.message);
setAmount("");

}catch(err){

alert(
err.response?.data?.message ||
"Withdraw Failed"
);

}

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
maxWidth:"1100px",
margin:"0 auto"
}}
>

<BackButton/>


{/* HEADER */}

<div
style={{
marginTop:"20px",
marginBottom:"28px"
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
NOVA PAY • CASH SERVICES
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
Withdraw Money
</h1>

<p
style={{
margin:"6px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
Withdraw money securely from your NovaPay account.
</p>

</div>


{/* WITHDRAW CARD */}

<div
style={{
background:"#ffffff",
borderRadius:"22px",
padding:"30px",
maxWidth:"650px",
border:"1px solid #e9edf2",
boxShadow:"0 10px 30px rgba(15,23,42,0.06)"
}}
>


{/* ICON */}

<div
style={{
width:"58px",
height:"58px",
borderRadius:"16px",
background:"#fff1f2",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"28px",
marginBottom:"20px"
}}
>
🏧
</div>


<h2
style={{
margin:"0 0 6px",
fontSize:"20px",
color:"#111827"
}}
>
Enter Withdrawal Amount
</h2>

<p
style={{
margin:"0 0 22px",
fontSize:"13px",
color:"#64748b"
}}
>
Choose an amount or enter your preferred amount.
</p>


<label
style={{
display:"block",
marginBottom:"8px",
fontSize:"13px",
fontWeight:"700",
color:"#475569"
}}
>
Withdrawal Amount
</label>


<div
style={{
position:"relative"
}}
>

<span
style={{
position:"absolute",
left:"15px",
top:"14px",
fontSize:"18px",
fontWeight:"800",
color:"#9b1c31"
}}
>
₹
</span>

<input
type="number"
placeholder="Enter amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
style={{
width:"100%",
padding:"14px 15px 14px 38px",
borderRadius:"11px",
border:"1px solid #dbe1e8",
fontSize:"16px",
outline:"none",
background:"#ffffff",
color:"#111827",
boxSizing:"border-box"
}}
/>

</div>


{/* QUICK AMOUNTS */}

<div
style={{
display:"flex",
gap:"9px",
flexWrap:"wrap",
marginTop:"15px"
}}
>

{[500,1000,2000,5000].map(price=>(

<button
key={price}
onClick={()=>setAmount(String(price))}
style={{
padding:"9px 16px",
borderRadius:"20px",
border:"1px solid #e5e7eb",
background:"#ffffff",
color:"#475569",
fontWeight:"700",
cursor:"pointer"
}}
>
₹{price.toLocaleString("en-IN")}
</button>

))}

</div>


{/* WITHDRAW BUTTON */}

<button
onClick={withdraw}
style={{
width:"100%",
marginTop:"25px",
padding:"15px",
background:"#9b1c31",
color:"#ffffff",
border:"none",
borderRadius:"12px",
fontSize:"16px",
fontWeight:"800",
cursor:"pointer",
boxShadow:"0 6px 15px rgba(155,28,49,0.20)"
}}
>
🏧 Withdraw Money
</button>


{/* SECURITY */}

<div
style={{
marginTop:"18px",
padding:"14px 15px",
borderRadius:"12px",
background:"#f8fafc",
fontSize:"12px",
color:"#64748b"
}}
>
🔒 Secure transaction • Your withdrawal is processed safely.
</div>


</div>

</div>

</div>

);

}

export default WithdrawPage;
