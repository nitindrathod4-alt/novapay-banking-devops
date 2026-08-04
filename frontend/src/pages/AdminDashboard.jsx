import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";


function Card({title, subtitle, icon, color, to}){

return(
<Link
to={to}
style={{
textDecoration:"none",
color:"inherit"
}}
>

<div
style={{
background:"#fff",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 10px 25px rgba(0,0,0,.08)"
}}
>

<div style={{fontSize:"40px"}}>
{icon}
</div>

<h2 style={{color}}>
{title}
</h2>

<p style={{color:"#64748b"}}>
{subtitle}
</p>

</div>

</Link>
)

}



function AdminDashboard(){

return(

<div style={{display:"flex"}}>

<AdminSidebar />


<div
style={{
flex:1,
padding:"30px",
background:"#f8fafc",
minHeight:"100vh"
}}
>


<div
style={{
background:"#fff",
padding:"25px",
borderRadius:"20px",
marginBottom:"30px",
boxShadow:"0 5px 15px rgba(0,0,0,.05)"
}}
>

<h1>
👨‍💼 NovaPay Admin Dashboard
</h1>

<p>
Welcome back, Administrator
</p>

</div>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"25px"
}}
>


<Card
icon="👥"
title="Users"
subtitle="Manage Customers"
color="#2563eb"
to="/admin/users"
/>


<Card
icon="➕"
title="Add User"
subtitle="Create Account"
color="#16a34a"
to="/admin/add-user"
/>


<Card
icon="💰"
title="Deposit"
subtitle="Manage Deposit"
color="#059669"
to="/admin/deposit"
/>


<Card
icon="🏧"
title="Withdraw"
subtitle="Manage Withdraw"
color="#dc2626"
to="/admin/withdraw"
/>


<Card
icon="📜"
title="Transactions"
subtitle="View Transactions"
color="#9333ea"
to="/admin/transactions"
/>


<Card
icon="🪪"
title="KYC"
subtitle="Verify Documents"
color="#7c3aed"
to="/admin/kyc"
/>


<Card
icon="📊"
title="Analytics"
subtitle="System Reports"
color="#ea580c"
to="/admin/analytics"
/>


</div>


</div>

</div>

)

}


export default AdminDashboard;
