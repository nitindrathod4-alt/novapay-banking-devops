import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function ElectricityBillPage(){

const [board,setBoard]=useState("");
const [consumer,setConsumer]=useState("");
const [amount,setAmount]=useState("");


const payBill=async()=>{

try{

const res=await api.post("/bill/electricity",{
board,
consumer,
amount:Number(amount)
});


alert(res.data.message);

setBoard("");
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


<div
style={{
background:"var(--card-bg)",
padding:"30px",
borderRadius:"20px",
maxWidth:"500px",
boxShadow:"0 8px 20px rgba(0,0,0,.08)"
}}
>


<h1>⚡ Electricity Bill Payment</h1>


<select
value={board}
onChange={(e)=>setBoard(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"20px"
}}
>

<option value="">
Select Board
</option>

<option>MSEDCL</option>
<option>Tata Power</option>
<option>Adani Electricity</option>

</select>


<input
placeholder="Consumer Number"
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
placeholder="Bill Amount"
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
borderRadius:"10px"
}}
>
⚡ Pay Bill
</button>


</div>


</div>

</div>

);

}

export default ElectricityBillPage;
