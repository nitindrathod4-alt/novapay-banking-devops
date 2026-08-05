import { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import api from "../services/api";

function UsersPage(){

const thStyle={
padding:"10px",
textAlign:"center",
verticalAlign:"middle",
background:"#0f172a",
color:"white"
};

const tdStyle={
padding:"10px",
textAlign:"center",
verticalAlign:"middle"
};

const userTdStyle={
padding:"10px",
textAlign:"left",
verticalAlign:"middle",
display:"table-cell"
};

const [users,setUsers]=useState([]);
const [search,setSearch]=useState("");

useEffect(()=>{
loadUsers();
},[]);


const loadUsers=async()=>{
const res=await api.get("/users");
setUsers(res.data.users);
};


const deleteUser=async(id,name)=>{
if(!window.confirm(`Delete ${name}?`)) return;

await api.delete(`/users/${id}`);
loadUsers();
};


const toggleStatus=async(id)=>{
await api.patch(`/users/users/${id}/status`);
loadUsers();
};


const deposit=async(id,name)=>{
let amount=prompt(`Deposit amount for ${name}`);

if(!amount)return;

await api.post(`/users/${id}/deposit`,{
amount:Number(amount)
});

loadUsers();
};


const withdraw=async(id,name)=>{
let amount=prompt(`Withdraw amount for ${name}`);

if(!amount)return;

await api.post(`/users/${id}/withdraw`,{
amount:Number(amount)
});

loadUsers();
};


const filtered=users.filter(u=>
u.name.toLowerCase().includes(search.toLowerCase()) ||
u.username.toLowerCase().includes(search.toLowerCase())
);


return(

<div style={{
padding:"35px",
background:"#f1f5f9",
minHeight:"100vh"
}}>


<h1>👥 User Management</h1>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px",
margin:"25px 0"
}}>


<div className="card">
<h3>Total Users</h3>
<h2>{users.length}</h2>
</div>


<div className="card">
<h3>Active Users</h3>
<h2>
{users.filter(u=>u.status==="Active").length}
</h2>
</div>


<div className="card">
<h3>Total Balance</h3>
<h2>
₹ {users.reduce((a,b)=>a+b.balance,0).toLocaleString()}
</h2>
</div>


</div>



<input
placeholder="🔍 Search User..."
value={search}
onChange={e=>setSearch(e.target.value)}
style={{
width:"100%",
padding:"14px",
borderRadius:"12px",
border:"1px solid #ddd",
marginBottom:"25px",
fontSize:"16px"
}}
/>



<div style={{
background:"white",
borderRadius:"18px",
boxShadow:"0 10px 25px rgba(0,0,0,.1)",
overflow:"hidden"
}}>


<table style={{
width:"100%",
borderCollapse:"collapse",
tableLayout:"fixed"
}}>


<thead>

<tr style={{
background:"#0f172a",
color:"white"
}}>

<th style={{width:"90px",...thStyle}}>Photo</th>
<th style={{
width:"220px",
...thStyle,
textAlign:"left",
paddingLeft:"20px"
}}>
User
</th>
<th style={{width:"120px",...thStyle}}>Role</th>
<th style={{width:"150px",...thStyle}}>Balance</th>
<th style={{width:"120px",...thStyle}}>Status</th>
<th style={{width:"140px",...thStyle}}>KYC</th>
<th style={{width:"180px",...thStyle}}>Actions</th>

</tr>

</thead>


<tbody>

{filtered.map(u=>(

<tr key={u._id}
style={{
borderBottom:"1px solid #eee"
}}
>


<td style={{
padding:"10px",
textAlign:"center",
verticalAlign:"middle"
}}>

<img
src={
u.photo
? `http://13.203.173.169:5000${u.photo}`
:`https://ui-avatars.com/api/?name=${u.name}`
}
onError={(e)=>{
e.target.src=`https://ui-avatars.com/api/?name=${u.name}`
}}
style={{
width:"55px",
height:"55px",
borderRadius:"50%",
objectFit:"cover"
}}
/>

</td>


<td style={userTdStyle}>
<div style={{
textAlign:"left"
}}>
<b style={{
fontSize:"16px"
}}>
{u.name}
</b>

<br/>

<span style={{
color:"#64748b",
fontSize:"14px"
}}>
👤 {u.username}
</span>
</div>
</td>


<td style={tdStyle}>

<span style={{
padding:"6px 14px",
borderRadius:"20px",
fontWeight:"bold",
background:u.role==="admin"?"#dbeafe":"#f1f5f9",
color:u.role==="admin"?"#1d4ed8":"#334155"
}}>
{u.role==="admin" ? "🛡 ADMIN" : "👤 USER"}
</span>

</td>


<td style={tdStyle}>
<b>
₹ {u.balance.toLocaleString()}
</b>
</td>


<td style={tdStyle}>

<span style={{
padding:"6px 14px",
borderRadius:"20px",
background:u.status==="Active"?"#dcfce7":"#fee2e2",
color:u.status==="Active"?"green":"red",
fontWeight:"bold"
}}>
{u.status}
</span>

</td>


<td style={tdStyle}>

<span style={{
padding:"6px 14px",
borderRadius:"20px",
fontWeight:"bold",
background:
u.kycStatus==="Verified"
?"#dcfce7"
:
u.kycStatus==="Rejected"
?"#fee2e2"
:"#fef3c7",

color:
u.kycStatus==="Verified"
?"green"
:
u.kycStatus==="Rejected"
?"red"
:"#92400e"
}}>

{
u.kycStatus==="Verified"
?"✅ Verified"
:
u.kycStatus==="Rejected"
?"❌ Rejected"
:"⏳ Pending"
}

</span>

</td>


<td style={tdStyle}>


<select
onChange={(e)=>{

const action=e.target.value;

if(action==="deposit")
deposit(u._id,u.username);

if(action==="withdraw")
withdraw(u._id,u.username);

if(action==="view")
window.location.href=`/admin/user/${u._id}`;

if(action==="delete")
deleteUser(u._id,u.username);

if(action==="lock")
toggleStatus(u._id);

if(action==="edit")
window.location.href=`/admin/edit-user/${u._id}`;

e.target.value="";

}}

style={{
padding:"8px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold"
}}

defaultValue=""
>

<option value="">⚙ Actions</option>

<option value="view">
👁 View Profile
</option>

<option value="deposit">
💰 Deposit
</option>

<option value="withdraw">
🏧 Withdraw
</option>

<option value="edit">
✏️ Edit User
</option>

<option value="delete">
🗑 Delete User
</option>

<option value="lock">
🔒 Block / Unblock
</option>

</select>


</td>


</tr>

))}


</tbody>

</table>

</div>


</div>

)

}

export default UsersPage;
