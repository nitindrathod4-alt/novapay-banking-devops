import { useState } from "react";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";
import api from "../services/api";

function ChangePasswordPage(){

const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");


const changePassword=async()=>{

if(newPassword!==confirmPassword){
return alert("New password does not match");
}


try{

const res=await api.put("/users/change-password",{
oldPassword,
newPassword
});


alert(res.data.message);

setOldPassword("");
setNewPassword("");
setConfirmPassword("");


}catch(err){

alert(
err.response?.data?.message || "Password change failed"
);

}

};


return(

<div style={{display:"flex"}}>

<Sidebar/>

<div style={{
flex:1,
padding:"40px",
background:"#f3f4f6",
minHeight:"100vh"
}}>

<BackButton/>

<div style={{
background:"#fff",
padding:"30px",
maxWidth:"500px",
borderRadius:"15px"
}}>

<h1>🔐 Change Password</h1>


<input
type="password"
placeholder="Old Password"
value={oldPassword}
onChange={(e)=>setOldPassword(e.target.value)}
style={input}
/>


<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
style={input}
/>


<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
style={input}
/>


<button
onClick={changePassword}
style={button}
>
Update Password
</button>


</div>

</div>

</div>

);

}


const input={
width:"100%",
padding:"12px",
marginTop:"15px",
borderRadius:"8px",
border:"1px solid #ddd"
};


const button={
marginTop:"20px",
width:"100%",
padding:"12px",
background:"#059669",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
};


export default ChangePasswordPage;
