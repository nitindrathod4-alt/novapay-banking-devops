import { Link } from "react-router-dom";

function Sidebar(){

const menu = {
color:"#e2e8f0",
textDecoration:"none",
padding:"12px 15px",
borderRadius:"10px",
display:"block",
fontWeight:"600"
};


return (

<div
style={{
width:"250px",
minHeight:"100vh",
background:"#0f172a",
padding:"25px 15px",
boxSizing:"border-box",
display:"flex",
flexDirection:"column",
justifyContent:"space-between"
}}
>


<div>

<h2 style={{
color:"white",
textAlign:"center"
}}>
🏦 NovaPay
</h2>


<p style={{
color:"#94a3b8",
textAlign:"center",
fontSize:"13px"
}}>
Digital Banking
</p>



<nav
style={{
display:"flex",
flexDirection:"column",
gap:"10px",
marginTop:"30px"
}}
>


<Link to="/" style={menu}>
🏠 Dashboard
</Link>


<Link to="/transfer" style={menu}>
💸 Transfer
</Link>




<Link to="/mobile-recharge" style={menu}>
📱 Mobile Recharge
</Link>



<Link to="/transactions" style={menu}>
📜 Transactions
</Link>


<Link to="/tickets" style={menu}>
🎫 Support Ticket
</Link>


<Link to="/travel" style={menu}>
🌍 Travel Booking
</Link>


<Link to="/profile" style={menu}>
👤 Profile
</Link>


<Link to="/kyc" style={menu}>
🪪 KYC Verification
</Link>


</nav>


</div>



<div
style={{
background:"#1e293b",
padding:"15px",
borderRadius:"12px",
color:"white",
textAlign:"center"
}}
>

<p>
👤 Customer
</p>


<button
style={{
width:"100%",
padding:"10px",
border:"none",
borderRadius:"8px",
background:"#059669",
color:"white",
cursor:"pointer"
}}

onClick={()=>{
localStorage.clear();
window.location.href="/";
}}

>
🚪 Logout
</button>


</div>


</div>

);

}

export default Sidebar;
