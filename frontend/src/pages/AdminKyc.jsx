import { useEffect, useState } from "react";
import api from "../services/api";
import BackButton from "../components/BackButton";

function AdminKyc(){

const [users,setUsers]=useState([]);


const loadKyc=async()=>{

try{

const res=await api.get("/admin/kyc");
setUsers(res.data.users);

}catch(err){
console.log(err);
}

};


useEffect(()=>{
loadKyc();
},[]);



const approve=async(id)=>{

await api.put(`/admin/kyc/${id}/approve`);
loadKyc();

};


const reject=async(id)=>{

await api.put(`/admin/kyc/${id}/reject`);
loadKyc();

};



const statusBadge=(status)=>{

let bg="#f59e0b";

if(status==="Verified")
bg="#16a34a";

if(status==="Rejected")
bg="#dc2626";


return {

background:bg,
color:"white",
padding:"6px 14px",
borderRadius:"20px",
fontWeight:"600"

};

};



return(

<div style={{
minHeight:"100vh",
background:"#f1f5f9",
padding:"40px"
}}>


<BackButton/>


<div style={{
background:"#fff",
padding:"30px",
borderRadius:"20px",
boxShadow:"0 10px 25px rgba(0,0,0,.1)"
}}>


<h1>
🪪 Admin KYC Verification
</h1>


<p style={{
color:"#64748b"
}}>
Verify customer identity documents
</p>



<table style={{
width:"100%",
marginTop:"30px",
borderCollapse:"collapse"
}}>


<thead>

<tr>

{
["Name","Aadhaar","PAN","Documents","Status","Action"]
.map(h=>(

<th
key={h}
style={{
background:"#0f172a",
color:"white",
padding:"15px"
}}
>
{h}
</th>

))
}

</tr>

</thead>



<tbody>

{
users.map(user=>(

<tr key={user._id}>


<td style={td}>
{user.name}
</td>


<td style={td}>
{user.aadhaarNumber || "-"}
</td>


<td style={td}>
{user.panNumber || "-"}
</td>



<td style={td}>


<a
href={`http://13.203.173.169:5000/uploads/${user.aadhaarDocument}`}
target="_blank"
>
📄 Aadhaar
</a>


<br/>


<a
href={`http://13.203.173.169:5000/uploads/${user.panDocument}`}
target="_blank"
>
📄 PAN
</a>


</td>



<td style={td}>

<span style={statusBadge(user.kycStatus)}>
{user.kycStatus}
</span>

</td>



<td style={td}>


<button
onClick={()=>approve(user._id)}
style={approveBtn}
>
✅ Approve
</button>


<button
onClick={()=>reject(user._id)}
style={rejectBtn}
>
❌ Reject
</button>


</td>


</tr>

))
}


</tbody>


</table>


</div>


</div>

);

}



const td={
padding:"15px",
textAlign:"center",
borderBottom:"1px solid #e2e8f0"
};


const approveBtn={

background:"#16a34a",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"10px",
cursor:"pointer",
marginRight:"10px"

};


const rejectBtn={

background:"#dc2626",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"10px",
cursor:"pointer"

};



export default AdminKyc;
