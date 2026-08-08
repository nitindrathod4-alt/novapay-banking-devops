import BackButton from "../components/BackButton";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function TransferPage() {

const [mode,setMode] = useState("username");
const [username,setUsername] = useState("");
const [mobileNumber,setMobileNumber] = useState("");
const [receiver,setReceiver] = useState(null);
const [amount,setAmount] = useState("");
const [confirm,setConfirm] = useState(false);

const searchMobile = async()=>{

try{

const res = await api.get(
`/transactions/user/mobile/${mobileNumber}`
);

setReceiver(res.data.user);

}catch(err){

alert(
err.response?.data?.message ||
"User Not Found"
);

setReceiver(null);

}

};


const transferMoney = async()=>{

if(!amount || Number(amount)<=0){

alert("Please enter valid amount");
return;

}

if(mode==="username" && !username){

alert("Please enter receiver username");
return;

}

if(mode==="mobile" && !receiver){

alert("Please search receiver first");
return;

}

try{

const res = await api.post(
"/transactions/transfer",
{
username:
mode==="mobile"
? receiver?.username
: username,

amount:Number(amount)
}
);

alert(res.data.message);

setAmount("");
setUsername("");
setMobileNumber("");
setReceiver(null);
setConfirm(false);

}catch(err){

alert(
err.response?.data?.message ||
"Transfer Failed"
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
NOVA PAY • MONEY TRANSFER
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
Send Money
</h1>

<p
style={{
margin:"6px 0 0",
color:"#64748b",
fontSize:"14px"
}}
>
Transfer money securely to another NovaPay account.
</p>

</div>


{/* MAIN CARD */}

<div
style={{
background:"#ffffff",
borderRadius:"22px",
padding:"30px",
border:"1px solid #e9edf2",
boxShadow:"0 10px 30px rgba(15,23,42,0.06)",
maxWidth:"700px"
}}
>


{/* MODE */}

<p
style={{
margin:"0 0 10px",
fontSize:"13px",
fontWeight:"700",
color:"#475569"
}}
>
Choose transfer method
</p>


<div
style={{
display:"flex",
gap:"10px",
background:"#f8fafc",
padding:"6px",
borderRadius:"13px"
}}
>

<button
onClick={()=>setMode("username")}
style={{
flex:1,
padding:"13px",
border:"none",
borderRadius:"10px",
background:
mode==="username"
?"#9b1c31"
:"#f8fafc",
color:
mode==="username"
?"white"
:"#475569",
fontWeight:"700",
cursor:"pointer"
}}
>
🏦 Account
</button>


<button
onClick={()=>setMode("mobile")}
style={{
flex:1,
padding:"13px",
border:"none",
borderRadius:"10px",
background:
mode==="mobile"
?"#9b1c31"
:"#f8fafc",
color:
mode==="mobile"
?"white"
:"#475569",
fontWeight:"700",
cursor:"pointer"
}}
>
📱 Mobile
</button>

</div>


{/* USERNAME */}

{
mode==="username" &&

<div style={{marginTop:"22px"}}>

<label style={labelStyle}>
Receiver Username
</label>

<input
style={inputStyle}
placeholder="Enter receiver username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

</div>

}


{/* MOBILE */}

{
mode==="mobile" &&

<div style={{marginTop:"22px"}}>

<label style={labelStyle}>
Receiver Mobile Number
</label>

<div
style={{
display:"flex",
gap:"10px"
}}
>

<input
style={{
...inputStyle,
marginTop:0
}}
placeholder="Enter mobile number"
value={mobileNumber}
onChange={(e)=>setMobileNumber(e.target.value)}
/>

<button
onClick={searchMobile}
style={searchBtn}
>
Search
</button>

</div>


{
receiver &&

<div
style={{
marginTop:"15px",
padding:"15px",
borderRadius:"13px",
background:"#f0fdf4",
border:"1px solid #bbf7d0"
}}
>

<p
style={{
margin:0,
fontSize:"11px",
color:"#64748b",
fontWeight:"700"
}}
>
RECIPIENT FOUND
</p>

<strong
style={{
display:"block",
marginTop:"4px",
color:"#166534"
}}
>
{receiver.name}
</strong>

<span
style={{
fontSize:"12px",
color:"#64748b"
}}
>
@{receiver.username}
</span>

</div>

}

</div>

}


{/* AMOUNT */}

<div style={{marginTop:"22px"}}>

<label style={labelStyle}>
Transfer Amount
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
fontWeight:"700",
color:"#9b1c31"
}}
>
₹
</span>

<input
type="number"
style={{
...inputStyle,
paddingLeft:"38px"
}}
placeholder="0.00"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

</div>

</div>


{/* SEND */}

<button
onClick={()=>setConfirm(true)}
style={sendBtn}
>
💸 Send Money
</button>


{/* CONFIRM */}

{
confirm &&

<div
style={{
marginTop:"20px",
padding:"20px",
background:"#fff7f7",
border:"1px solid #fecdd3",
borderRadius:"15px"
}}
>

<h3
style={{
margin:"0 0 8px",
color:"#111827"
}}
>
Confirm Transfer
</h3>

<p
style={{
margin:"0 0 15px",
fontSize:"13px",
color:"#64748b"
}}
>
Please confirm that you want to transfer
<strong> ₹ {Number(amount || 0).toLocaleString("en-IN")}</strong>.
</p>


<button
onClick={transferMoney}
style={sendBtn}
>
✅ Confirm Transfer
</button>


<button
onClick={()=>setConfirm(false)}
style={{
width:"100%",
marginTop:"10px",
padding:"12px",
background:"#ffffff",
color:"#dc2626",
border:"1px solid #fecaca",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"700"
}}
>
Cancel
</button>

</div>

}

</div>

</div>

</div>

);

}


const labelStyle={
display:"block",
marginBottom:"8px",
fontSize:"13px",
fontWeight:"700",
color:"#475569"
};


const inputStyle={
width:"100%",
padding:"14px 15px",
borderRadius:"11px",
border:"1px solid #dbe1e8",
fontSize:"15px",
outline:"none",
background:"#ffffff",
color:"#111827",
boxSizing:"border-box"
};


const searchBtn={
padding:"0 22px",
background:"#9b1c31",
color:"#ffffff",
border:"none",
borderRadius:"11px",
cursor:"pointer",
fontWeight:"700"
};


const sendBtn={
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
};


export default TransferPage;
