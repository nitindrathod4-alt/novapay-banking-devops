import BackButton from "../components/BackButton";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function BillPaymentPage(){

const [service,setService]=useState("");
const [provider,setProvider]=useState("");
const [consumer,setConsumer]=useState("");
const [amount,setAmount]=useState("");

const services=[
{
name:"Electricity",
icon:"⚡",
providers:["MSEDCL","Tata Power","Adani Electricity"]
},
{
name:"Water Bill",
icon:"💧",
providers:["Municipal Corporation"]
},
{
name:"DTH",
icon:"📺",
providers:["Tata Play","Airtel DTH","Dish TV"]
},
{
name:"Mobile Postpaid",
icon:"📱",
providers:["Jio","Airtel","Vi"]
},
{
name:"Broadband",
icon:"🌐",
providers:["Jio Fiber","Airtel Xstream"]
},
{
name:"Gas Bill",
icon:"🔥",
providers:["Indane Gas","HP Gas"]
}
];

const selectedService =
services.find(s=>s.name===service);

const payBill=async()=>{

try{

const res=await api.post("/bill/payment",{
service,
provider,
consumer,
amount:Number(amount)
});

alert(res.data.message);

setService("");
setProvider("");
setConsumer("");
setAmount("");

}catch(err){

alert(
err.response?.data?.message ||
"Bill Payment Failed"
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
maxWidth:"1200px",
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
NOVA PAY • BILL PAYMENTS
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
Pay Your Bills
</h1>

<p
style={{
margin:"6px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
Manage and pay your everyday bills securely.
</p>

</div>


{/* SERVICE CARD */}

<div
style={{
background:"#ffffff",
borderRadius:"22px",
padding:"30px",
border:"1px solid #e9edf2",
boxShadow:"0 10px 30px rgba(15,23,42,0.06)"
}}
>

<h2
style={{
margin:"0 0 5px",
fontSize:"20px",
color:"#111827"
}}
>
Choose a Service
</h2>

<p
style={{
margin:"0 0 22px",
fontSize:"13px",
color:"#64748b"
}}
>
Select the bill you want to pay.
</p>


{/* SERVICES */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:"14px"
}}
>

{services.map((item)=>(

<button
key={item.name}
onClick={()=>{
setService(item.name);
setProvider("");
}}
style={{
background:
service===item.name
?"#fff1f2"
:"#ffffff",
padding:"20px 12px",
borderRadius:"15px",
cursor:"pointer",
border:
service===item.name
?"2px solid #9b1c31"
:"1px solid #e5e7eb",
boxShadow:
service===item.name
?"0 6px 18px rgba(155,28,49,0.10)"
:"none"
}}
>

<div
style={{
fontSize:"30px",
marginBottom:"8px"
}}
>
{item.icon}
</div>

<div
style={{
fontWeight:"800",
fontSize:"13px",
color:
service===item.name
?"#9b1c31"
:"#334155"
}}
>
{item.name}
</div>

</button>

))}

</div>


{/* PAYMENT FORM */}

{
service &&

<div
style={{
marginTop:"30px",
paddingTop:"25px",
borderTop:"1px solid #edf0f3",
maxWidth:"700px"
}}
>

<div
style={{
padding:"15px",
background:"#fff7f7",
borderRadius:"13px",
border:"1px solid #fecdd3",
marginBottom:"20px"
}}
>

<strong
style={{
color:"#9b1c31",
fontSize:"14px"
}}
>
{selectedService.icon} {selectedService.name}
</strong>

<p
style={{
margin:"4px 0 0",
fontSize:"12px",
color:"#64748b"
}}
>
Enter your bill details below.
</p>

</div>


<label style={labelStyle}>
Provider
</label>

<select
value={provider}
onChange={(e)=>setProvider(e.target.value)}
style={inputStyle}
>

<option value="">
Select Provider
</option>

{selectedService.providers.map(p=>(

<option
key={p}
value={p}
>
{p}
</option>

))}

</select>


<label
style={{
...labelStyle,
marginTop:"20px"
}}
>
Consumer / Account Number
</label>

<input
placeholder="Enter consumer or account number"
value={consumer}
onChange={(e)=>setConsumer(e.target.value)}
style={inputStyle}
/>


<label
style={{
...labelStyle,
marginTop:"20px"
}}
>
Bill Amount
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

{[299,499,999,1499].map(price=>(

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


<button
onClick={payBill}
style={payButton}
>
📄 Pay Bill
</button>


<div
style={{
marginTop:"16px",
padding:"13px 15px",
borderRadius:"12px",
background:"#f8fafc",
fontSize:"12px",
color:"#64748b"
}}
>
🔒 Your payment is processed securely by NovaPay.
</div>

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

const payButton={
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

export default BillPaymentPage;
