import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import api from "../services/api";

function SettingsPage(){

const [settings,setSettings]=useState({
transactionAlerts:true,
emailAlerts:true,
offers:false
});

const [saving,setSaving]=useState(false);


useEffect(()=>{

loadSettings();

},[]);


const loadSettings=async()=>{

try{

const res=await api.get("/users/notification-settings");

setSettings(res.data.settings);

}catch(err){

console.log(err);

}

};


const saveSettings=async()=>{

try{

setSaving(true);

await api.put(
"/users/notification-settings",
settings
);

alert("✅ Notification Settings Updated");

}catch(err){

alert(
err.response?.data?.message ||
"Update Failed"
);

}finally{

setSaving(false);

}

};


const toggleSetting=(key)=>{

setSettings({
...settings,
[key]:!settings[key]
});

};


const settingItems=[

{
key:"transactionAlerts",
icon:"💳",
title:"Transaction Alerts",
description:"Get notified when money is transferred or a transaction is completed."
},

{
key:"emailAlerts",
icon:"✉️",
title:"Email Alerts",
description:"Receive important account and banking updates through email."
},

{
key:"offers",
icon:"🎁",
title:"Offers & Promotions",
description:"Receive updates about NovaPay offers, rewards and promotions."
}

];


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
maxWidth:"1050px",
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
NOVA PAY • ACCOUNT SETTINGS
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
Settings
</h1>

<p
style={{
margin:"7px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
Manage your notifications and account preferences.
</p>

</div>


{/* NOTIFICATION CARD */}

<div
style={{
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"20px",
boxShadow:"0 8px 25px rgba(15,23,42,.06)",
overflow:"hidden"
}}
>


<div
style={{
padding:"24px 28px",
borderBottom:"1px solid #edf0f3"
}}
>

<h2
style={{
margin:0,
fontSize:"19px",
color:"#111827"
}}
>
🔔 Notification Preferences
</h2>

<p
style={{
margin:"5px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
Choose which notifications you want to receive.
</p>

</div>


<div
style={{
padding:"10px 28px 20px"
}}
>

{
settingItems.map((item)=>(

<div
key={item.key}
style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
gap:"20px",
padding:"20px 0",
borderBottom:"1px solid #f1f5f9"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"15px"
}}
>

<div
style={{
width:"46px",
height:"46px",
borderRadius:"13px",
background:"#fff1f2",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"22px"
}}
>
{item.icon}
</div>


<div>

<strong
style={{
display:"block",
fontSize:"14px",
color:"#111827"
}}
>
{item.title}
</strong>

<p
style={{
margin:"5px 0 0",
fontSize:"12px",
lineHeight:"1.5",
color:"#94a3b8",
maxWidth:"650px"
}}
>
{item.description}
</p>

</div>

</div>


{/* TOGGLE */}

<button
onClick={()=>toggleSetting(item.key)}
aria-label={`Toggle ${item.title}`}
style={{
width:"52px",
height:"30px",
borderRadius:"20px",
border:"none",
padding:"3px",
cursor:"pointer",
background:
settings[item.key]
?"#9b1c31"
:"#cbd5e1",
transition:"0.2s",
flexShrink:0
}}
>

<div
style={{
width:"24px",
height:"24px",
borderRadius:"50%",
background:"#ffffff",
boxShadow:"0 2px 5px rgba(0,0,0,.15)",
transform:
settings[item.key]
?"translateX(22px)"
:"translateX(0)",
transition:"0.2s"
}}
/>

</button>

</div>

))

}


<button
onClick={saveSettings}
disabled={saving}
style={{
width:"100%",
marginTop:"25px",
padding:"14px",
background:saving?"#94a3b8":"#9b1c31",
color:"#ffffff",
border:"none",
borderRadius:"11px",
fontSize:"15px",
fontWeight:"800",
cursor:saving?"not-allowed":"pointer",
boxShadow:"0 6px 15px rgba(155,28,49,.18)"
}}
>
{saving ? "Saving..." : "💾 Save Settings"}
</button>


</div>

</div>


{/* SECURITY CARD */}

<div
style={{
marginTop:"20px",
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"18px",
padding:"22px 25px",
boxShadow:"0 6px 20px rgba(15,23,42,.04)"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"15px"
}}
>

<div
style={{
width:"44px",
height:"44px",
borderRadius:"12px",
background:"#f0fdf4",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"21px"
}}
>
🔒
</div>

<div>

<strong
style={{
display:"block",
fontSize:"14px",
color:"#111827"
}}
>
Your account is secure
</strong>

<p
style={{
margin:"5px 0 0",
fontSize:"12px",
color:"#64748b"
}}
>
Notification preferences are securely saved to your NovaPay account.
</p>

</div>

</div>

</div>


{/* QUICK SETTINGS */}

<div
style={{
marginTop:"20px",
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"15px"
}}
>


<Link
to="/change-password"
style={{
textDecoration:"none",
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"16px",
padding:"20px",
color:"#111827",
boxShadow:"0 5px 15px rgba(15,23,42,.04)"
}}
>

<div style={{fontSize:"25px"}}>
🔐
</div>

<strong
style={{
display:"block",
marginTop:"9px",
fontSize:"14px"
}}
>
Change Password
</strong>

<p
style={{
margin:"5px 0 0",
fontSize:"11px",
color:"#94a3b8"
}}
>
Update your account password securely.
</p>

</Link>


<Link
to="/profile"
style={{
textDecoration:"none",
background:"#ffffff",
border:"1px solid #e8ebef",
borderRadius:"16px",
padding:"20px",
color:"#111827",
boxShadow:"0 5px 15px rgba(15,23,42,.04)"
}}
>

<div style={{fontSize:"25px"}}>
👤
</div>

<strong
style={{
display:"block",
marginTop:"9px",
fontSize:"14px"
}}
>
My Profile
</strong>

<p
style={{
margin:"5px 0 0",
fontSize:"11px",
color:"#94a3b8"
}}
>
View and manage your profile details.
</p>

</Link>


</div>


</div>

</div>

);

}

export default SettingsPage;
