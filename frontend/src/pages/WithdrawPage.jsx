import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function WithdrawPage(){

const [amount,setAmount]=useState("");

const withdraw=async()=>{

try{

const res=await api.post("/transactions/withdraw",{
amount:Number(amount)
});

alert(res.data.message);
setAmount("");

}catch(err){

alert(err.response?.data?.message || "Withdraw Failed");

}

};


return(

<div style={{display:"flex"}}>

<Sidebar/>

<div style={{flex:1,padding:"30px"}}>

<h1>🏧 Withdraw Money</h1>


<input
type="number"
placeholder="Enter Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"20px"
}}
/>


<button
onClick={withdraw}
style={{
background:"#dc2626",
color:"white",
padding:"12px 25px",
border:"none",
borderRadius:"8px"
}}
>
Withdraw
</button>


</div>

</div>

)

}

export default WithdrawPage;
