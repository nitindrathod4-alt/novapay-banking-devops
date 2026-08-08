import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function ProfilePage() {

const [user,setUser]=useState({});
const [photo,setPhoto]=useState(null);

useEffect(()=>{
loadProfile();
},[]);


const loadProfile=async()=>{

try{

const res=await api.get("/transactions/balance");

setUser(res.data.user);

}catch(err){

console.log(err);

}

};


const uploadPhoto=async()=>{

if(!photo){

return alert("Please choose a photo");

}

const formData=new FormData();

formData.append("photo",photo);

try{

await api.post(
`/users/${user._id}/photo`,
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);

alert("✅ Profile Photo Updated");

loadProfile();

}catch(err){

alert(
err.response?.data?.message ||
"Upload Failed"
);

}

};


const downloadStatement=async()=>{

try{

const res=await api.get(
"/statement/download",
{
responseType:"blob"
}
);

const url=window.URL.createObjectURL(
new Blob([res.data])
);

const link=document.createElement("a");

link.href=url;

link.download="NovaPay_Bank_Statement.pdf";

document.body.appendChild(link);

link.click();

link.remove();

}catch(err){

alert("Statement Download Failed");

}

};


const profileImage =
user.photo
? `http://13.203.173.169:5000${user.photo}?t=${Date.now()}`
: `https://ui-avatars.com/api/?name=${encodeURIComponent(
user.name || "User"
)}&background=9b1c31&color=fff&size=200`;


return(

<div
style={{
minHeight:"100vh",
background:"#f6f7f9",
display:"flex"
}}
>

<Sidebar/>


<div
style={{
flex:1,
padding:"30px 45px",
maxWidth:"1200px",
margin:"0 auto"
}}
>

<BackButton/>


{/* HEADER */}

<div
style={{
marginTop:"20px",
marginBottom:"25px"
}}
>

<p
style={{
margin:0,
fontSize:"12px",
fontWeight:"800",
letterSpacing:"1px",
color:"#9b1c31"
}}
>
NOVA PAY • PERSONAL BANKING
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
My Profile
</h1>

<p
style={{
margin:"6px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
Manage your personal and account information.
</p>

</div>


{/* PROFILE CARD */}

<div
style={{
background:"#ffffff",
borderRadius:"22px",
border:"1px solid #e9edf2",
boxShadow:"0 10px 30px rgba(15,23,42,0.06)",
overflow:"hidden"
}}
>


{/* PROFILE TOP */}

<div
style={{
background:"linear-gradient(135deg,#9b1c31,#7f1628)",
padding:"30px",
display:"flex",
alignItems:"center",
gap:"25px",
flexWrap:"wrap"
}}
>

<img
src={profileImage}
alt="Profile"
style={{
width:"115px",
height:"115px",
borderRadius:"50%",
objectFit:"cover",
border:"5px solid #ffffff",
boxShadow:"0 5px 15px rgba(0,0,0,.18)"
}}
/>


<div>

<h2
style={{
margin:0,
color:"#ffffff",
fontSize:"25px"
}}
>
{user.name || "User"}
</h2>

<p
style={{
margin:"7px 0",
color:"#fce7eb",
fontSize:"14px"
}}
>
@{user.username || "-"}
</p>

<div
style={{
display:"inline-block",
background:"#ffffff",
color:"#9b1c31",
padding:"6px 12px",
borderRadius:"20px",
fontSize:"11px",
fontWeight:"800"
}}
>
🟢 {user.status || "Active"}
</div>

</div>

</div>


{/* PHOTO UPLOAD */}

<div
style={{
padding:"25px 30px",
borderBottom:"1px solid #edf0f3"
}}
>

<h3
style={{
margin:"0 0 5px",
fontSize:"17px",
color:"#111827"
}}
>
Profile Photo
</h3>

<p
style={{
margin:"0 0 15px",
fontSize:"12px",
color:"#94a3b8"
}}
>
Update your profile picture.
</p>


<div
style={{
display:"flex",
gap:"12px",
alignItems:"center",
flexWrap:"wrap"
}}
>

<input
type="file"
accept="image/*"
onChange={(e)=>setPhoto(e.target.files[0])}
style={{
padding:"10px",
border:"1px solid #dbe1e8",
borderRadius:"10px",
background:"#ffffff"
}}
/>

<button
onClick={uploadPhoto}
style={{
background:"#9b1c31",
color:"#ffffff",
border:"none",
padding:"11px 18px",
borderRadius:"10px",
fontWeight:"700",
cursor:"pointer"
}}
>
📷 Update Photo
</button>

</div>

</div>


{/* ACCOUNT INFORMATION */}

<div
style={{
padding:"30px"
}}
>

<h3
style={{
margin:"0 0 5px",
fontSize:"19px",
color:"#111827"
}}
>
Account Information
</h3>

<p
style={{
margin:"0 0 22px",
fontSize:"12px",
color:"#94a3b8"
}}
>
Your NovaPay banking details.
</p>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"15px"
}}
>


<InfoCard
icon="👤"
label="Full Name"
value={user.name}
/>

<InfoCard
icon="🆔"
label="Username"
value={user.username}
/>

<InfoCard
icon="💰"
label="Available Balance"
value={`₹ ${Number(user.balance || 0).toLocaleString("en-IN")}`}
highlight
/>

<InfoCard
icon="💳"
label="Account Number"
value={user.accountNumber}
/>

<InfoCard
icon="🏦"
label="IFSC"
value={user.ifsc}
/>

<InfoCard
icon="💳"
label="Account Type"
value={user.accountType || "-"}
/>

<InfoCard
icon="🏢"
label="Branch"
value={user.branchName || "-"}
/>

<InfoCard
icon="🔐"
label="KYC Status"
value={user.kycStatus || "Pending"}
/>

<InfoCard
icon="📅"
label="Account Open Date"
value={
user.accountOpenDate
?
new Date(user.accountOpenDate).toLocaleDateString("en-IN")
:
"-"
}
/>

<InfoCard
icon="🟢"
label="Account Status"
value={user.status || "Active"}
highlight
/>

</div>


{/* ACTIONS */}

<div
style={{
marginTop:"28px",
paddingTop:"25px",
borderTop:"1px solid #edf0f3",
display:"flex",
gap:"12px",
flexWrap:"wrap"
}}
>

<a
href="/change-password"
style={{
background:"#111827",
color:"#ffffff",
padding:"13px 20px",
borderRadius:"11px",
textDecoration:"none",
fontSize:"14px",
fontWeight:"700"
}}
>
🔐 Change Password
</a>


<button
onClick={downloadStatement}
style={{
background:"#ffffff",
color:"#9b1c31",
border:"1px solid #9b1c31",
padding:"13px 20px",
borderRadius:"11px",
cursor:"pointer",
fontSize:"14px",
fontWeight:"700"
}}
>
📄 Download Bank Statement
</button>

</div>

</div>

</div>

</div>

</div>

);

}


function InfoCard({
icon,
label,
value,
highlight
}){

return(

<div
style={{
background:highlight?"#fff7f7":"#f8fafc",
border:highlight
?"1px solid #fecdd3"
:"1px solid #edf0f3",
borderRadius:"14px",
padding:"17px"
}}
>

<div
style={{
fontSize:"20px",
marginBottom:"8px"
}}
>
{icon}
</div>

<p
style={{
margin:0,
fontSize:"11px",
fontWeight:"700",
color:"#94a3b8"
}}
>
{label}
</p>

<strong
style={{
display:"block",
marginTop:"5px",
fontSize:"14px",
color:highlight?"#9b1c31":"#334155",
wordBreak:"break-word"
}}
>
{value || "-"}
</strong>

</div>

);

}


export default ProfilePage;
