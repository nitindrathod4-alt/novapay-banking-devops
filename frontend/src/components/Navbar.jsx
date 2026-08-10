import { Link } from "react-router-dom";

function Navbar() {

const user =
JSON.parse(localStorage.getItem("user") === "undefined" ? "{}" : (localStorage.getItem("user") || "{}")) || {};

const logout = () => {

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/";

};

return (

<div
style={{
height:"78px",
background:"#ffffff",
borderBottom:"1px solid #e9edf2",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 32px",
position:"sticky",
top:0,
zIndex:100,
boxShadow:"0 3px 15px rgba(15,23,42,0.04)"
}}
>


{/* LOGO */}

<div
style={{
display:"flex",
alignItems:"center",
gap:"12px"
}}
>

<div
style={{
width:"48px",
height:"48px",
borderRadius:"12px",
background:"#9b1c31",
display:"flex",
alignItems:"center",
justifyContent:"center",
position:"relative",
boxShadow:"0 5px 12px rgba(155,28,49,0.25)"
}}
>

<div
style={{
fontSize:"25px",
fontWeight:"900",
color:"#ffffff",
letterSpacing:"-4px",
lineHeight:1
}}
>
NP
</div>

<div
style={{
position:"absolute",
fontSize:"8px",
fontWeight:"900",
color:"#ffffff",
bottom:"7px",
letterSpacing:"1px"
}}
>
NR
</div>

</div>


<div>

<div
style={{
fontSize:"21px",
fontWeight:"900",
lineHeight:"20px",
color:"#111827"
}}
>
NOVA<span style={{color:"#9b1c31"}}>PAY</span>
</div>

<div
style={{
fontSize:"9px",
fontWeight:"700",
letterSpacing:"1.5px",
color:"#94a3b8",
marginTop:"3px"
}}
>
NITIN RATHOD
</div>

</div>

</div>


{/* RIGHT */}

<div
style={{
display:"flex",
alignItems:"center",
gap:"12px"
}}
>


{/* SECURE */}

<div
style={{
display:"flex",
alignItems:"center",
gap:"7px",
fontSize:"12px",
fontWeight:"700",
color:"#166534",
background:"#f0fdf4",
padding:"9px 13px",
borderRadius:"20px"
}}
>

<span
style={{
width:"7px",
height:"7px",
borderRadius:"50%",
background:"#16a34a"
}}
></span>

Secure

</div>


{/* NOTIFICATION */}

<button
onClick={() => alert("No new notifications")}
style={{
width:"42px",
height:"42px",
borderRadius:"12px",
border:"1px solid #e5e7eb",
background:"#ffffff",
fontSize:"19px",
cursor:"pointer",
position:"relative"
}}
>
🔔

<span
style={{
position:"absolute",
top:"7px",
right:"7px",
width:"7px",
height:"7px",
borderRadius:"50%",
background:"#9b1c31",
border:"2px solid white"
}}
></span>

</button>


{/* PROFILE */}

<Link
to="/profile"
style={{
textDecoration:"none"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"9px",
padding:"6px 10px",
borderRadius:"12px",
border:"1px solid #e5e7eb",
background:"#ffffff"
}}
>

<div
style={{
width:"34px",
height:"34px",
borderRadius:"50%",
background:"#9b1c31",
color:"#ffffff",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontWeight:"800",
fontSize:"14px"
}}
>
{(user.name || user.username || "U")
.charAt(0)
.toUpperCase()}
</div>


<div
style={{
display:"flex",
flexDirection:"column"
}}
>

<strong
style={{
fontSize:"12px",
color:"#111827"
}}
>
{user.name || user.username || "User"}
</strong>

<span
style={{
fontSize:"10px",
color:"#94a3b8"
}}
>
My Profile
</span>

</div>

</div>

</Link>


{/* LOGOUT */}

<button
onClick={logout}
style={{
background:"#9b1c31",
color:"#ffffff",
border:"none",
padding:"10px 18px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"700",
fontSize:"13px"
}}
>
🚪 Logout
</button>

</div>

</div>

);

}

export default Navbar;
