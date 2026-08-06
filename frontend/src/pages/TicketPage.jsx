import BackButton from "../components/BackButton";
import {useEffect,useState} from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";


function TicketPage(){

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



return(

<div className="layout" style={{display:"flex"}}>

<Sidebar/>


<div
style={{
flex:1,
padding:"30px",
background:"var(--page-bg)",
minHeight:"100vh"
}}
>


<BackButton />

<h1>🎫 Support Center</h1>


<div
style={{
background:"var(--card-bg)",
padding:"25px",
borderRadius:"15px",
maxWidth:"600px"
}}
>


<input
placeholder="Subject"
value={subject}
onChange={(e)=>setSubject(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"15px"
}}
/>


<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"15px"
}}
>

<option>Transaction</option>
<option>Bill Payment</option>
<option>Recharge</option>
<option>Account</option>

</select>


<textarea
placeholder="Describe your issue"
value={message}
onChange={(e)=>setMessage(e.target.value)}
style={{
width:"100%",
height:"120px",
padding:"12px"
}}
/>


<button
onClick={createTicket}
style={{
marginTop:"15px",
background:"#2563eb",
color:"white",
padding:"12px 25px",
border:"none",
borderRadius:"8px"
}}
>
🎫 Create Ticket
</button>


</div>


<h2 style={{marginTop:"30px"}}>
My Tickets
</h2>


{
tickets.map(t=>(

<div
key={t._id}
style={{
background:"var(--card-bg)",
padding:"20px",
marginTop:"15px",
borderRadius:"12px"
}}
>

<h3>{t.subject}</h3>

<p>Category: {t.category}</p>

<p>{t.message}</p>

<p>
Status: 🟡 {t.status}
</p>

</div>

))
}


</div>

</div>

);

}


export default TicketPage;
