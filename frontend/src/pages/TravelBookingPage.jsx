import BackButton from "../components/BackButton";
import {useState} from "react";
import Sidebar from "../components/Sidebar";

function TravelBookingPage(){

const [type,setType]=useState("");
const [showForm,setShowForm]=useState(false);


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

<h1>🌍 Travel Booking</h1>


{
!showForm ?


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
marginTop:"30px"
}}
>


{
[
["🚆","Train"],
["🚌","Bus"],
["✈️","Flight"],
["🏨","Hotel"]
].map((item)=>(


<div
key={item[1]}
style={{
background:"var(--card-bg)",
padding:"25px",
borderRadius:"15px",
textAlign:"center",
boxShadow:"0 5px 15px #ddd"
}}
>

<h1>{item[0]}</h1>

<h3>{item[1]}</h3>


<button
onClick={()=>{
setType(item[1]);
setShowForm(true);
}}
style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"10px 20px",
borderRadius:"8px"
}}
>
Book Now
</button>


</div>


))
}


</div>


:


<div
style={{
background:"var(--card-bg)",
padding:"30px",
borderRadius:"15px",
marginTop:"30px"
}}
>


<h2>
{type} Booking
</h2>


<input
placeholder="From"
style={{width:"100%",padding:"12px",margin:"10px"}}
/>


<input
placeholder="To"
style={{width:"100%",padding:"12px",margin:"10px"}}
/>


<input
type="date"
style={{width:"100%",padding:"12px",margin:"10px"}}
/>


<input
placeholder="Passenger Name"
style={{width:"100%",padding:"12px",margin:"10px"}}
/>


<select
style={{width:"100%",padding:"12px",margin:"10px"}}
>

<option>Select Class</option>
<option>Sleeper</option>
<option>3AC</option>
<option>2AC</option>

</select>


<button
style={{
background:"#16a34a",
color:"white",
border:"none",
padding:"12px 25px",
borderRadius:"8px"
}}
>
✅ Confirm Booking
</button>


<button
onClick={()=>setShowForm(false)}
style={{
marginLeft:"15px",
padding:"12px 25px"
}}
>
Back
</button>


</div>


}


</div>

</div>

);

}

export default TravelBookingPage;
