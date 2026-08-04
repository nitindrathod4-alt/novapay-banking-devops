import { useEffect, useState } from "react";
import api from "../services/api";

function AdminWithdrawPage(){

const [users,setUsers]=useState([]);
const [userId,setUserId]=useState("");
const [amount,setAmount]=useState("");

useEffect(()=>{
loadUsers();
},[]);


const loadUsers=async()=>{

const res=await api.get("/users");

setUsers(
res.data.users.filter(u=>u.role!=="admin")
);

};


const withdraw=async()=>{

try{

const res=await api.post(`/users/${userId}/withdraw`,{
amount:Number(amount)
});

alert(res.data.message);

setAmount("");
loadUsers();

}catch(err){

alert(err.response?.data?.message || "Withdraw Failed");

}

};


return(

<div style={{padding:"30px"}}>

<h1>🏧 Admin Withdraw Money</h1>


<select
value={userId}
onChange={(e)=>setUserId(e.target.value)}
style={{
width:"100%",
padding:"12px",
marginBottom:"20px"
}}
>

<option value="">
Select User
</option>


{
users.map(u=>(

<option key={u._id} value={u._id}>

{u.name} ({u.username}) - ₹{u.balance}

</option>

))
}


</select>


<input
type="number"
placeholder="Amount"
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
🏧 Withdraw
</button>


</div>

);

}

export default AdminWithdrawPage;
