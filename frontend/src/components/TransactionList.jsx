import { Link } from "react-router-dom";

function TransactionList(){

return(

<Link
to="/transactions"
style={{
textDecoration:"none",
color:"inherit"
}}
>

<div
style={{
background:"#ffffff",
borderRadius:"20px",
padding:"22px",
border:"1px solid #e9edf2",
boxShadow:"0 8px 25px rgba(15,23,42,0.06)",
cursor:"pointer",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
transition:"all 0.2s ease"
}}
onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-3px)";
e.currentTarget.style.boxShadow="0 12px 30px rgba(15,23,42,0.10)";
}}
onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="0 8px 25px rgba(15,23,42,0.06)";
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
width:"52px",
height:"52px",
borderRadius:"15px",
background:"#fff1f2",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"25px"
}}
>
📜
</div>


<div>

<h2
style={{
margin:0,
fontSize:"18px",
fontWeight:"750",
color:"#111827"
}}
>
Recent Transactions
</h2>

<p
style={{
margin:"5px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
View your recent banking activity
</p>

</div>

</div>


<div
style={{
fontSize:"22px",
color:"#9b1c31",
fontWeight:"700"
}}
>
→
</div>


</div>

</Link>

);

}

export default TransactionList;
