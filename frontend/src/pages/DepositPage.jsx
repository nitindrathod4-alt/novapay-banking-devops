import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function DepositPage(){

const [amount,setAmount]=useState("");

const deposit=async()=>{

try{

const res=await api.post("/transactions/deposit",{
amount:Number(amount)
});

alert(res.data.message);
setAmount("");

}catch(err){

alert(err.response?.data?.message || "Deposit Failed");

}

};


return(

<div style={{display:"flex"}}>

<Sidebar/>

<div style={{flex:1,padding:"30px"}}>

<h1>💰 Deposit Money</h1>


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
onClick={deposit}
style={{
background:"#059669",
color:"white",
padding:"12px 25px",
border:"none",
borderRadius:"8px"
}}
>
Deposit
</button>


</div>

</div>

)

}

export default DepositPage;
