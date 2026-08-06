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

<h1>📄 Bill Payments</h1>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:"20px",
marginTop:"25px"
}}
>


{services.map((item)=>(

<div
key={item.name}
onClick={()=>{

setService(item.name);
setProvider("");

}}
style={{
background:"var(--card-bg)",
padding:"25px",
borderRadius:"16px",
textAlign:"center",
cursor:"pointer",
boxShadow:"0 6px 18px rgba(0,0,0,.08)",
border:
service===item.name
?"3px solid #059669"
:"none"
}}
>


<div style={{
fontSize:"40px"
}}>
{item.icon}
</div>


<h3>
{item.name}
</h3>


</div>

))}


</div>



{
service &&

<div
style={{
background:"var(--card-bg)",
padding:"30px",
marginTop:"30px",
borderRadius:"18px",
maxWidth:"500px",
boxShadow:"0 6px 18px rgba(0,0,0,.08)"
}}
>


<h2>
{selectedService.icon} {service}
</h2>



<select
value={provider}
onChange={(e)=>setProvider(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"20px"
}}
>

<option value="">
Select Provider
</option>


{selectedService.providers.map(p=>(

<option key={p}>
{p}
</option>

))}


</select>



<input
placeholder="Consumer / Account Number"
value={consumer}
onChange={(e)=>setConsumer(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"15px"
}}
/>



<input
type="number"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"15px"
}}
/>



<button
onClick={payBill}
style={{
marginTop:"20px",
background:"#059669",
color:"white",
padding:"12px 25px",
border:"none",
borderRadius:"10px",
cursor:"pointer"
}}
>
📄 Pay Bill
</button>


</div>

}


</div>

</div>

);

}


export default BillPaymentPage;
