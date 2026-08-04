import { useEffect, useState } from "react";
import api from "../services/api";
import BackButton from "../components/BackButton";

function AdminDepositPage(){

const [users,setUsers]=useState([]);
const [userId,setUserId]=useState("");
const [amount,setAmount]=useState("");

useEffect(()=>{
loadUsers();
},[]);


const loadUsers=async()=>{
try{
const res=await api.get("/users");

setUsers(
res.data.users.filter(u=>u.role!=="admin")
);

}catch(err){
console.log(err);
}
};


const deposit=async()=>{

try{

const res=await api.post(`/users/${userId}/deposit`,{
amount:Number(amount)
});

alert(res.data.message);

setAmount("");
loadUsers();

}catch(err){

alert(
err.response?.data?.message ||
"Deposit Failed"
);

}

};


return(

<div style={{
minHeight:"100vh",
background:"#f1f5f9",
padding:"40px"
}}>


<BackButton />


<div style={{
maxWidth:"600px",
margin:"auto",
background:"#fff",
padding:"35px",
borderRadius:"20px",
boxShadow:"0 10px 30px rgba(0,0,0,.1)"
}}>


<h1 style={{
marginBottom:"10px"
}}>
🏦 Admin Deposit
</h1>


<p style={{
color:"#64748b",
marginBottom:"30px"
}}>
Credit money to customer account
</p>



<label>
Select Customer
</label>


<select
value={userId}
onChange={(e)=>setUserId(e.target.value)}
style={inputStyle}
>

<option value="">
Choose User
</option>


{
users.map(u=>(

<option
key={u._id}
value={u._id}
>

{u.name} • {u.username} • ₹{u.balance}

</option>

))
}

</select>



<label>
Deposit Amount
</label>


<input
type="number"
placeholder="Enter Amount ₹"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
style={inputStyle}
/>



<button
onClick={deposit}
style={buttonStyle}
>
💰 Confirm Deposit
</button>


</div>


</div>

);

}


const inputStyle={

width:"100%",
padding:"14px",
margin:"12px 0 20px",
borderRadius:"12px",
border:"1px solid #cbd5e1",
fontSize:"16px"

};


const buttonStyle={

width:"100%",
padding:"15px",
background:"#059669",
color:"white",
border:"none",
borderRadius:"12px",
fontSize:"17px",
cursor:"pointer"

};


export default AdminDepositPage;
