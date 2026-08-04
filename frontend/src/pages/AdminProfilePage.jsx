import { useEffect, useState } from "react";
import Sidebar from "../components/AdminSidebar";
import BackButton from "../components/BackButton";
import api from "../services/api";

function AdminProfilePage(){

const [user,setUser]=useState({});
const [photo,setPhoto]=useState(null);


useEffect(()=>{
loadProfile();
},[]);


const loadProfile=async()=>{

try{

const res=await api.get("/users");

const admin = res.data.users.find(
u => u.role === "admin"
);

setUser(admin || {});

}catch(err){
console.log(err);
}

};


const uploadPhoto=async()=>{

if(!photo)
return alert("Select photo");


const formData=new FormData();
formData.append("photo",photo);


try{

await api.post(`/users/${user._id}/photo`,formData,{
headers:{
"Content-Type":"multipart/form-data"
}
});


alert("Profile Photo Updated");
loadProfile();


}catch(err){

alert("Upload Failed");

}

};



return(

<div style={{display:"flex"}}>

<Sidebar/>


<div style={{
flex:1,
padding:"40px",
background:"#f1f5f9",
minHeight:"100vh"
}}>


<BackButton/>


<div style={{
background:"#fff",
padding:"35px",
borderRadius:"20px",
maxWidth:"600px",
margin:"auto",
textAlign:"center"
}}>


<h1>
👨‍💼 Admin Profile
</h1>


<img
src={
user.photo
? `http://13.203.173.169:5000${user.photo}`
: "https://ui-avatars.com/api/?name=Admin"
}
style={{
width:"160px",
height:"160px",
borderRadius:"50%",
objectFit:"cover"
}}
/>


<br/><br/>


<input
type="file"
accept="image/*"
onChange={(e)=>setPhoto(e.target.files[0])}
/>


<br/><br/>


<button
onClick={uploadPhoto}
style={{
background:"#2563eb",
color:"white",
padding:"12px 25px",
border:"none",
borderRadius:"10px"
}}
>
📷 Upload Photo
</button>


<hr/>


<p>👤 Name : {user.name}</p>
<p>🆔 Username : {user.username}</p>
<p>🔑 Role : Admin</p>


</div>

<div style={{
marginTop:"30px",
paddingTop:"20px",
borderTop:"1px solid #e5e7eb",
textAlign:"center",
color:"#475569"
}}>

<h3>Nitin Rathod</h3>

<p>DevOps • Cloud Engineer</p>

<p>📧 nitindrathod4@gmail.com</p>

<p>
<a
href="https://www.linkedin.com/in/nitin-rathod-2495b320a"
target="_blank"
style={{
color:"#2563eb",
textDecoration:"none",
marginRight:"15px"
}}
>
🔗 LinkedIn
</a>

<a
href="https://github.com/nitindrathod4-alt"
target="_blank"
style={{
color:"#111827",
textDecoration:"none"
}}
>
🐙 GitHub
</a>
</p>

</div>

</div>

</div>

);

}

export default AdminProfilePage;
