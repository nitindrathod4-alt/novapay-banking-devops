import { Link } from "react-router-dom";

function AdminSidebar(){

const menu={
color:"#e2e8f0",
textDecoration:"none",
padding:"12px 15px",
borderRadius:"10px",
display:"block",
fontWeight:"600"
};

return(

<div
style={{
width:"250px",
minHeight:"100vh",
background:"#0f172a",
padding:"25px 15px",
boxSizing:"border-box"
}}
>

<h2 style={{
color:"white",
textAlign:"center"
}}>
🏦 NovaPay
</h2>

<p style={{
color:"#94a3b8",
textAlign:"center"
}}>
Admin Panel
</p>


<div style={{
display:"flex",
flexDirection:"column",
gap:"10px",
marginTop:"30px"
}}>

<Link to="/admin/profile" style={menu}>
👤 My Profile
</Link>

<Link to="/" style={menu}>
🏠 Dashboard
</Link>

<Link to="/admin/users" style={menu}>
👥 Users
</Link>

<Link to="/admin/add-user" style={menu}>
➕ Add User
</Link>

<Link to="/admin/deposit" style={menu}>
💰 Deposit
</Link>

<Link to="/admin/withdraw" style={menu}>
🏧 Withdraw
</Link>

<Link to="/admin/transactions" style={menu}>
📜 Transactions
</Link>

<Link to="/admin/kyc" style={menu}>
🪪 KYC
</Link>

<Link to="/admin/analytics" style={menu}>
📊 Analytics
</Link>

</div>


</div>

);

}

export default AdminSidebar;
