function Navbar() {

const user = JSON.parse(localStorage.getItem("user"));


const logout = () => {

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/";

};


return (

<div
style={{
background:"#ffffff",
padding:"18px 30px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
boxShadow:"0 4px 12px rgba(0,0,0,0.06)"
}}
>


<h2
style={{
margin:0,
color:"#0f172a"
}}
>
🏦 NovaPay Banking
</h2>



<div
style={{
display:"flex",
alignItems:"center",
gap:"20px"
}}
>


<div
style={{
background:"#f1f5f9",
padding:"10px 15px",
borderRadius:"12px",
color:"#334155",
fontWeight:"600"
}}
>
👤 {user?.name || "User"}
</div>



<button
onClick={logout}
style={{
background:"#059669",
color:"white",
border:"none",
padding:"10px 20px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"bold"
}}
>
🚪 Logout
</button>


</div>


</div>

);

}

export default Navbar;
