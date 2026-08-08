import BackButton from "../components/BackButton";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function MobileRechargePage(){

const [mobile,setMobile]=useState("");
const [operator,setOperator]=useState("");
const [amount,setAmount]=useState("");

const recharge=async()=>{

try{

const res=await api.post("/recharge/mobile",{
mobile,
operator,
amount:Number(amount)
});

alert(res.data.message);

setMobile("");
setOperator("");
setAmount("");

}catch(err){

alert(
err.response?.data?.message ||
"Recharge Failed"
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
NOVA PAY • MOBILE SERVICES
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
Mobile Recharge
</h1>

<p
style={{
margin:"6px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
Recharge your mobile quickly and securely.
</p>

</div>


{/* RECHARGE CARD */}

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
📱
</div>


<label style={labelStyle}>
Mobile Number
</label>

<input
type="tel"
placeholder="Enter 10-digit mobile number"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
style={inputStyle}
/>


<label
style={{
...labelStyle,
marginTop:"20px"
}}
>
Mobile Operator
</label>

<select
value={operator}
onChange={(e)=>setOperator(e.target.value)}
style={inputStyle}
>

<option value="">
Select Operator
</option>

<option value="Jio">
Jio
</option>

<option value="Airtel">
Airtel
</option>

<option value="Vi">
Vi
</option>

<option value="BSNL">
BSNL
</option>

</select>


<label
style={{
...labelStyle,
marginTop:"20px"
}}
>
Recharge Amount
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
fontSize:"17px",
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
...inputStyle,
paddingLeft:"38px"
}}
/>

</div>


{/* QUICK AMOUNTS */}

<div
style={{
display:"flex",
gap:"9px",
flexWrap:"wrap",
marginTop:"14px"
}}
>

{[199,299,399,499].map(price=>(

<button
key={price}
onClick={()=>setAmount(String(price))}
style={{
padding:"8px 15px",
borderRadius:"20px",
border:"1px solid #e5e7eb",
background:"#ffffff",
color:"#475569",
fontWeight:"700",
cursor:"pointer"
}}
>
₹{price}
</button>

))}

</div>


{/* RECHARGE BUTTON */}

<button
onClick={recharge}
style={buttonStyle}
>
📱 Recharge Now
</button>


{/* SECURITY */}

<div
style={{
marginTop:"18px",
padding:"13px 15px",
borderRadius:"12px",
background:"#f8fafc",
fontSize:"12px",
color:"#64748b",
display:"flex",
alignItems:"center",
gap:"8px"
}}
>
🔒 Secure payment powered by NovaPay
</div>


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


const buttonStyle={
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


export default MobileRechargePage;
