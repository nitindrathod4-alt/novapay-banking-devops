import {useEffect,useState} from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";


function AdminTicketsPage(){

const [tickets,setTickets]=useState([]);


useEffect(()=>{
loadTickets();
},[]);


const loadTickets=async()=>{

try{

const res=await api.get("/admin-tickets");

setTickets(res.data.tickets || []);

}catch(err){

console.log(err);

}

};


const updateTicket=async(id)=>{

try{

await api.put(`/admin-tickets/${id}`,{

status:"Resolved",
reply:"Your issue has been resolved"

});

alert("Ticket Updated");

loadTickets();


}catch(err){

alert("Update Failed");

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

<h1>🎫 Admin Support Tickets</h1>

{
tickets.map(t=>(

<div
key={t._id}
style={{
background:"var(--card-bg)",
padding:"20px",
borderRadius:"15px",
marginTop:"15px"
}}
>

<h3>{t.subject}</h3>

<p>User: {t.user?.username}</p>

<p>Category: {t.category}</p>

<p>Issue: {t.message}</p>

<p>Status: {t.status}</p>


<button
onClick={()=>updateTicket(t._id)}
style={{
background:"green",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"8px"
}}
>
✅ Resolve
</button>

</div>

))
}

</div>

</div>

);

}

export default AdminTicketsPage;
