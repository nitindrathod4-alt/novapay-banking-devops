import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";
import api from "../services/api";

function ChangePasswordPage(){

const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [loading,setLoading]=useState(false);

const changePassword=async()=>{

if(!oldPassword || !newPassword || !confirmPassword){
return alert("Please fill all fields");
}

if(newPassword!==confirmPassword){
return alert("New password does not match");
}

if(newPassword.length<6){
return alert("New password must be at least 6 characters");
}

try{

setLoading(true);

const res=await api.put("/users/change-password",{
oldPassword,
newPassword
});

alert(res.data.message || "Password changed successfully");

setOldPassword("");
setNewPassword("");
setConfirmPassword("");

}catch(err){

alert(
err.response?.data?.message ||
"Password change failed"
);

}finally{

setLoading(false);

}

};


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
maxWidth:"900px",
margin:"0 auto"
}}
>

<BackButton/>


{/* HEADER */}

<div style={{marginTop:"20px",marginBottom:"25px"}}>

<p
style={{
margin:0,
fontSize:"12px",
fontWeight:"800",
letterSpacing:"1px",
color:"#9b1c31"
}}
>
NOVA PAY • SECURITY
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
Change Password
</h1>

<p
style={{
margin:"7px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
Keep your NovaPay account secure with a strong password.
</p>

</div>


{/* PASSWORD CARD */}

<div
style={{
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"20px",
padding:"30px",
boxShadow:"0 8px 25px rgba(15,23,42,.06)"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"15px",
marginBottom:"25px"
}}
>

<div
style={{
width:"50px",
height:"50px",
borderRadius:"14px",
background:"#fff1f2",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"24px"
}}
>
🔐
</div>

<div>

<h2
style={{
margin:0,
fontSize:"19px",
color:"#111827"
}}
>
Update your password
</h2>

<p
style={{
margin:"5px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
Enter your current password and choose a new one.
</p>

</div>

</div>


<label style={label}>
Current Password
</label>

<input
type="password"
placeholder="Enter current password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
style={input}
/>


<label style={label}>
New Password
</label>

<input
type="password"
placeholder="Enter new password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
style={input}
/>


<label style={label}>
Confirm New Password
</label>

<input
type="password"
placeholder="Confirm new password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
style={input}
/>


<div
style={{
marginTop:"15px",
padding:"12px 14px",
background:"#f8fafc",
borderRadius:"10px",
fontSize:"12px",
color:"#64748b"
}}
>
🔒 Password should contain at least 6 characters.
</div>


<button
onClick={changePassword}
disabled={loading}
style={{
marginTop:"22px",
width:"100%",
padding:"14px",
background:loading?"#94a3b8":"#9b1c31",
color:"#ffffff",
border:"none",
borderRadius:"11px",
fontSize:"15px",
fontWeight:"800",
cursor:loading?"not-allowed":"pointer",
boxShadow:"0 6px 15px rgba(155,28,49,.18)"
}}
>
{loading ? "Updating..." : "🔐 Update Password"}
</button>


</div>


{/* SECURITY INFO */}

<div
style={{
marginTop:"20px",
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"16px",
padding:"20px 24px"
}}
>

<strong
style={{
fontSize:"14px",
color:"#111827"
}}
>
🛡️ Security Tip
</strong>

<p
style={{
margin:"7px 0 0",
fontSize:"12px",
lineHeight:"1.6",
color:"#64748b"
}}
>
Never share your password, OTP or banking credentials with anyone.
</p>

</div>


</div>

</div>

);

}


const label={
display:"block",
marginTop:"18px",
fontSize:"13px",
fontWeight:"700",
color:"#334155"
};


const input={
width:"100%",
boxSizing:"border-box",
padding:"14px",
marginTop:"8px",
borderRadius:"10px",
border:"1px solid #cbd5e1",
fontSize:"14px",
outline:"none"
};


export default ChangePasswordPage;
