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

await api.put("/users/notification-settings",settings);

alert("✅ Notification Settings Updated");

}catch(err){

alert("Update Failed");

}

};



return(

<div className="layout" style={{display:"flex"}}>

<Sidebar/>

<div
style={{
flex:1,
padding:"40px",
background:"var(--page-bg)",
minHeight:"100vh"
}}
>

<BackButton/>

<h1>⚙️ Settings</h1>


<div
style={{
background:"var(--card-bg)",
padding:"25px",
borderRadius:"15px",
maxWidth:"600px"
}}
>


<h2>👤 Account Settings</h2>

<Link to="/profile">
<button style={btn}>
Edit Profile
</button>
</Link>










{
[
["transactionAlerts","Transaction Alerts"],
["emailAlerts","Email Alerts"],
["offers","Offers"]
].map(([key,label])=>(

<div
key={key}
style={{
display:"flex",
justifyContent:"space-between",
marginTop:"15px"
}}
>

<span>{label}</span>

<input
type="checkbox"
checked={settings[key]}
onChange={(e)=>
setSettings({
...settings,
[key]:e.target.checked
})
}
/>

</div>

))
}

<button
onClick={saveSettings}
style={btn}
>
Save Settings
</button>






</div>


</div>

</div>

);

}


const btn={
width:"100%",
padding:"12px",
marginTop:"10px",
background:"#2563eb",
color:"white",
border:"none",
borderRadius:"8px",
cursor:"pointer"
};


export default SettingsPage;
