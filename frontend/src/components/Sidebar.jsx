import { Link, useLocation } from "react-router-dom";

function Sidebar(){

const location = useLocation();

const menu = [
  { path:"/", label:"Dashboard", icon:"⌂" },
  { path:"/transfer", label:"Transfer Money", icon:"↗" },
  { path:"/withdraw", label:"Withdraw", icon:"↙" },
  { path:"/transactions", label:"Transactions", icon:"↔" },
  { path:"/mobile-recharge", label:"Mobile Recharge", icon:"▣" },
  { path:"/bill-payment", label:"Bill Payment", icon:"▤" },
  { path:"/travel", label:"Travel Booking", icon:"✈" },
  { path:"/kyc", label:"KYC", icon:"✓" },
  { path:"/tickets", label:"Support", icon:"?" },
  { path:"/profile", label:"My Profile", icon:"●" },
  { path:"/settings", label:"Settings", icon:"⚙" }
];

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href="/";
};

return (

<div
className="sidebar"
style={{
width:"250px",
minHeight:"100vh",
background:"#111827",
padding:"24px 16px",
display:"flex",
flexDirection:"column",
boxShadow:"4px 0 18px rgba(0,0,0,0.08)",
flexShrink:0
}}
>

<div
style={{
padding:"5px 10px 28px",
borderBottom:"1px solid rgba(255,255,255,0.10)",
marginBottom:"20px"
}}
>

<div
style={{
fontSize:"25px",
fontWeight:"800",
color:"#ffffff",
letterSpacing:"-0.5px"
}}
>
NOVA<span style={{color:"#c11235"}}>PAY</span>
</div>

<div
style={{
fontSize:"12px",
color:"#9ca3af",
marginTop:"5px"
}}
>
Digital Banking
</div>

</div>


<div
style={{
fontSize:"11px",
fontWeight:"700",
color:"#9ca3af",
padding:"0 10px 10px",
textTransform:"uppercase",
letterSpacing:"1px"
}}
>
Banking
</div>


<nav
style={{
display:"flex",
flexDirection:"column",
gap:"5px"
}}
>

{menu.map((item)=>{

const active =
item.path === "/"
? location.pathname === "/"
: location.pathname === item.path;

return (

<Link
key={item.path}
to={item.path}
style={{
display:"flex",
alignItems:"center",
gap:"13px",
padding:"11px 12px",
borderRadius:"9px",
textDecoration:"none",
fontSize:"14px",
fontWeight:active ? "700" : "500",
color:active ? "#ffffff" : "#cbd5e1",
background:active ? "#9b1c31" : "transparent",
transition:"all 0.2s ease"
}}
>

<span
style={{
width:"24px",
textAlign:"center",
fontSize:"17px"
}}
>
{item.icon}
</span>

<span>
{item.label}
</span>

</Link>

);

})}

</nav>


<div style={{marginTop:"auto"}}>

<div
style={{
height:"1px",
background:"rgba(255,255,255,0.10)",
margin:"20px 0 15px"
}}
/>

<button
onClick={logout}
style={{
width:"100%",
padding:"11px 12px",
border:"1px solid rgba(255,255,255,0.12)",
borderRadius:"9px",
background:"transparent",
color:"#f1f5f9",
cursor:"pointer",
fontSize:"14px",
fontWeight:"600",
textAlign:"left"
}}
>
🚪 &nbsp; Logout
</button>

</div>

</div>

);

}

export default Sidebar;
