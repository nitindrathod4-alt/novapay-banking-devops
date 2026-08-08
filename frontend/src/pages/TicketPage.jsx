import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function TicketPage() {

const [subject,setSubject]=useState("");
const [category,setCategory]=useState("Transaction");
const [message,setMessage]=useState("");
const [tickets,setTickets]=useState([]);

useEffect(()=>{
loadTickets();
},[]);


const loadTickets=async()=>{

try{

const res=await api.get("/tickets/my");

setTickets(res.data.tickets || []);

}catch(err){

console.log(err);

}

};


const createTicket=async()=>{

if(!subject.trim() || !message.trim()){

alert("Please enter subject and describe your issue.");

return;

}

try{

await api.post("/tickets",{
subject,
category,
message
});

alert("Ticket Created Successfully");

setSubject("");
setMessage("");

loadTickets();

}catch(err){

alert(
err.response?.data?.message ||
"Ticket Failed"
);

}

};


const getStatusStyle=(status)=>{

if(status==="Resolved"){

return {
background:"#dcfce7",
color:"#166534"
};

}

if(status==="In Progress"){

return {
background:"#dbeafe",
color:"#1d4ed8"
};

}

return {
background:"#fef3c7",
color:"#92400e"
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
maxWidth:"1200px",
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
NOVA PAY • CUSTOMER SUPPORT
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
How can we help you?
</h1>

<p
style={{
margin:"7px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
Create a support ticket and our team will help you resolve your issue.
</p>

</div>


{/* SUPPORT CARDS */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
gap:"15px",
marginBottom:"25px"
}}
>

<div style={helpCard}>
<div style={iconStyle}>💸</div>
<strong>Transactions</strong>
<p style={smallText}>Transfer related issues</p>
</div>

<div style={helpCard}>
<div style={iconStyle}>📄</div>
<strong>Bill Payments</strong>
<p style={smallText}>Payment related help</p>
</div>

<div style={helpCard}>
<div style={iconStyle}>📱</div>
<strong>Recharge</strong>
<p style={smallText}>Recharge related issues</p>
</div>

<div style={helpCard}>
<div style={iconStyle}>👤</div>
<strong>Account</strong>
<p style={smallText}>Account assistance</p>
</div>

</div>


{/* CREATE TICKET */}

<div
style={{
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"20px",
boxShadow:"0 8px 25px rgba(15,23,42,.06)",
overflow:"hidden",
marginBottom:"25px"
}}
>

<div
style={{
padding:"23px 28px",
borderBottom:"1px solid #edf0f3"
}}
>

<h2
style={{
margin:0,
fontSize:"19px",
color:"#111827"
}}
>
🎫 Create Support Ticket
</h2>

<p
style={{
margin:"5px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
Tell us what went wrong and we'll take care of it.
</p>

</div>


<div
style={{
padding:"28px"
}}
>


<label style={labelStyle}>
Subject
</label>

<input
placeholder="Example: Money transfer failed"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
style={inputStyle}
/>


<label
style={{
...labelStyle,
marginTop:"20px"
}}
>
Category
</label>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
style={inputStyle}
>

<option>Transaction</option>
<option>Bill Payment</option>
<option>Recharge</option>
<option>Account</option>

</select>


<label
style={{
...labelStyle,
marginTop:"20px"
}}
>
Describe your issue
</label>

<textarea
placeholder="Please explain your issue in detail..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
style={{
...inputStyle,
height:"130px",
resize:"vertical",
fontFamily:"inherit"
}}
/>


<button
onClick={createTicket}
style={{
width:"100%",
marginTop:"22px",
padding:"14px",
background:"#9b1c31",
color:"#ffffff",
border:"none",
borderRadius:"11px",
fontSize:"15px",
fontWeight:"800",
cursor:"pointer",
boxShadow:"0 6px 15px rgba(155,28,49,.18)"
}}
>
🎫 Create Ticket
</button>


</div>

</div>


{/* MY TICKETS */}

<div
style={{
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"20px",
boxShadow:"0 8px 25px rgba(15,23,42,.05)",
overflow:"hidden"
}}
>

<div
style={{
padding:"23px 28px",
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
📋 My Support Tickets
</h2>

<p
style={{
margin:"5px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
Track your submitted support requests.
</p>

</div>

<div
style={{
background:"#f1f5f9",
padding:"7px 12px",
borderRadius:"20px",
fontSize:"12px",
fontWeight:"800",
color:"#475569"
}}
>
{tickets.length} Ticket{tickets.length===1?"":"s"}
</div>

</div>


<div
style={{
padding:"20px 28px"
}}
>

{
tickets.length===0 ?

<div
style={{
textAlign:"center",
padding:"35px 10px",
color:"#94a3b8"
}}
>

<div style={{fontSize:"38px"}}>
🎫
</div>

<strong
style={{
display:"block",
marginTop:"8px",
color:"#475569"
}}
>
No support tickets yet
</strong>

<p
style={{
fontSize:"12px",
marginTop:"5px"
}}
>
Your submitted tickets will appear here.
</p>

</div>

:

<div
style={{
display:"grid",
gap:"14px"
}}
>

{
tickets.map((t)=>(

<div
key={t._id}
style={{
border:"1px solid #e5e7eb",
borderRadius:"14px",
padding:"18px",
background:"#fafbfc"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
gap:"15px",
alignItems:"flex-start",
flexWrap:"wrap"
}}
>

<div>

<strong
style={{
fontSize:"15px",
color:"#111827"
}}
>
{t.subject}
</strong>

<div
style={{
marginTop:"6px",
fontSize:"12px",
color:"#64748b"
}}
>
Category: {t.category}
</div>

</div>


<div
style={{
...getStatusStyle(t.status),
padding:"6px 11px",
borderRadius:"20px",
fontSize:"11px",
fontWeight:"800"
}}
>
{t.status || "Pending"}
</div>

</div>


<div
style={{
marginTop:"13px",
padding:"12px",
background:"#ffffff",
borderRadius:"10px",
fontSize:"13px",
color:"#475569",
lineHeight:"1.6"
}}
>
{t.message}
</div>

</div>

))

}

</div>

}

</div>

</div>


{/* SECURITY */}

<div
style={{
marginTop:"18px",
padding:"14px 16px",
borderRadius:"12px",
background:"#f8fafc",
color:"#64748b",
fontSize:"12px"
}}
>
🔒 Your support conversations are securely linked to your NovaPay account.
</div>


</div>

</div>

);

}


const labelStyle={
display:"block",
fontSize:"13px",
fontWeight:"700",
color:"#475569",
marginBottom:"8px"
};

const inputStyle={
width:"100%",
padding:"13px 14px",
border:"1px solid #dbe1e8",
borderRadius:"10px",
fontSize:"14px",
boxSizing:"border-box",
outline:"none",
background:"#ffffff",
color:"#111827"
};

const helpCard={
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"16px",
padding:"18px",
boxShadow:"0 5px 15px rgba(15,23,42,.04)"
};

const iconStyle={
fontSize:"25px",
marginBottom:"8px"
};

const smallText={
margin:"5px 0 0",
fontSize:"11px",
color:"#94a3b8"
};

export default TicketPage;
