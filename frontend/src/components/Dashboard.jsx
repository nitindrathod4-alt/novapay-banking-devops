import BalanceCard from "./BalanceCard";
import QuickActions from "./QuickActions";
import TransactionList from "./TransactionList";
import Navbar from "./Navbar";

function Dashboard() {

return (

<>
<Navbar />


<div
style={{
padding:"35px",
background:"#f8fafc",
minHeight:"100vh"
}}
>


<div
style={{
background:"#ffffff",
padding:"25px",
borderRadius:"18px",
boxShadow:"0 5px 15px rgba(0,0,0,0.06)",
marginBottom:"25px"
}}
>

<h1
style={{
margin:0,
color:"#0f172a"
}}
>
Welcome Back, Nitin 👋
</h1>


<p
style={{
color:"#64748b",
marginTop:"10px"
}}
>
Manage your NovaPay account securely
</p>


</div>



<BalanceCard />


<div style={{
marginTop:"25px"
}}>
<QuickActions />
</div>



<div style={{
marginTop:"25px"
}}>
<TransactionList />
</div>



</div>

</>

);

}

export default Dashboard;
