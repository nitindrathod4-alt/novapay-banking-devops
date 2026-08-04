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

<div style={{display:"flex"}}>

<Sidebar/>


<div
style={{
flex:1,
padding:"30px",
background:"#f8fafc",
minHeight:"100vh"
}}
>


<div
style={{
background:"#fff",
padding:"30px",
borderRadius:"20px",
maxWidth:"500px",
boxShadow:"0 8px 20px rgba(0,0,0,.08)"
}}
>

<BackButton />

<h1>
📱 Mobile Recharge
</h1>


<input
placeholder="Mobile Number"
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"20px"
}}
/>


<select
value={operator}
onChange={(e)=>setOperator(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginTop:"15px"
}}
>

<option value="">
Select Operator
</option>

<option>
Jio
</option>

<option>
Airtel
</option>

<option>
Vi
</option>

</select>



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
onClick={recharge}
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
📱 Recharge Now
</button>


</div>


</div>

</div>

);

}

export default MobileRechargePage;
