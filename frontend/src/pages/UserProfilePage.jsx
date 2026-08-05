import BackButton from "../components/BackButton";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function UserProfilePage(){

const {id}=useParams();

const [user,setUser]=useState(null);


useEffect(()=>{
loadUser();
},[]);


const loadUser=async()=>{
try{
const res=await api.get(`/users/${id}`);
setUser(res.data.user);
}
catch(err){
console.log(err);
}
};


if(!user){
return <h2>Loading...</h2>;
}


return(

<div style={{
padding:"40px",
background:"#f1f5f9",
minHeight:"100vh"
}}>

<BackButton />

<h1>👤 User Profile</h1>


<div style={{
display:"grid",
gridTemplateColumns:"300px 1fr",
gap:"25px"
}}>


{/* Profile Card */}

<div style={{
background:"white",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 8px 20px rgba(0,0,0,.1)",
textAlign:"center"
}}>


<img
src={
user.photo
? `http://13.203.173.169:5000${user.photo}`
:
`https://ui-avatars.com/api/?name=${user.name}`
}
style={{
width:"120px",
height:"120px",
borderRadius:"50%",
objectFit:"cover"
}}
/>


<h2>{user.name}</h2>

<p>@{user.username}</p>


<span style={{
padding:"8px 15px",
borderRadius:"20px",
background:user.status==="Active"?"#dcfce7":"#fee2e2",
color:user.status==="Active"?"green":"red",
fontWeight:"bold"
}}>
{user.status}
</span>


</div>



{/* Details */}

<div style={{
background:"white",
padding:"30px",
borderRadius:"18px",
boxShadow:"0 8px 20px rgba(0,0,0,.1)"
}}>


<h2>🏦 Account Details</h2>


<p><b>Account Number:</b> {user.accountNumber}</p>

<p><b>IFSC:</b> {user.ifsc}</p>

<p><b>Branch:</b> {user.branchName}</p>

<p><b>Account Type:</b> {user.accountType}</p>


<h2>💰 Financial</h2>

<h1>
₹ {user.balance.toLocaleString()}
</h1>


<h2>🔐 KYC</h2>


<span style={{
padding:"8px 15px",
borderRadius:"20px",
background:user.kycStatus==="Verified"?"#dcfce7":"#fef3c7",
fontWeight:"bold"
}}>
{
user.kycStatus==="Verified"
?"✅ Verified"
:"⏳ Pending"
}
</span>


<p>
<b>Aadhaar:</b> {user.aadhaarNumber || "Not Added"}
</p>


<p>
<b>PAN:</b> {user.panNumber || "Not Added"}
</p>


</div>


</div>


</div>

)

}

export default UserProfilePage;
