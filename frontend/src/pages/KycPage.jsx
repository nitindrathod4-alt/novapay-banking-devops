import BackButton from "../components/BackButton";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function KycPage() {

const [aadhaarNumber,setAadhaarNumber]=useState("");
const [panNumber,setPanNumber]=useState("");

const [aadhaarFile,setAadhaarFile]=useState(null);
const [panFile,setPanFile]=useState(null);

const [status,setStatus]=useState("Pending");
const [message,setMessage]=useState("");


const submitKyc=async()=>{

if(!aadhaarNumber || !panNumber){

setMessage("Please enter Aadhaar and PAN numbers.");
return;

}

if(!aadhaarFile || !panFile){

setMessage("Please upload both Aadhaar and PAN documents.");

return;

}

try{

setMessage("Submitting KYC...");


await api.post("/profile/kyc",{
aadhaarNumber,
panNumber
});


const formData=new FormData();

formData.append("aadhaarDocument",aadhaarFile);
formData.append("panDocument",panFile);


await api.post(
"/profile/upload",
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);


setStatus("Pending");

setMessage(
"KYC submitted successfully. Your documents are under verification. ✅"
);


}catch(error){

console.log(error);

setMessage(
error.response?.data?.message ||
"KYC submission failed"
);

}

};


return(

<div
style={{
minHeight:"100vh",
background:"#f6f7f9",
display:"flex"
}}
>

<Sidebar/>


<div
style={{
flex:1,
padding:"30px 45px",
maxWidth:"1100px",
margin:"0 auto"
}}
>

<BackButton/>


{/* HEADER */}

<div
style={{
marginTop:"20px",
marginBottom:"25px"
}}
>

<p
style={{
margin:0,
fontSize:"12px",
fontWeight:"800",
letterSpacing:"1px",
color:"#9b1c31"
}}
>
NOVA PAY • VERIFICATION
</p>

<h1
style={{
margin:"7px 0 0",
fontSize:"30px",
fontWeight:"800",
color:"#111827"
}}
>
Complete Your KYC
</h1>

<p
style={{
margin:"6px 0 0",
fontSize:"14px",
color:"#64748b"
}}
>
Verify your identity to access secure banking services.
</p>

</div>


{/* STATUS */}

<div
style={{
background:"#fff7ed",
border:"1px solid #fed7aa",
borderRadius:"15px",
padding:"17px 20px",
marginBottom:"20px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
gap:"15px",
flexWrap:"wrap"
}}
>

<div>

<strong
style={{
display:"block",
fontSize:"14px",
color:"#9a3412"
}}
>
KYC Verification Status
</strong>

<span
style={{
display:"block",
marginTop:"4px",
fontSize:"12px",
color:"#c2410c"
}}
>
Your documents will be reviewed after submission.
</span>

</div>

<div
style={{
background:"#fef3c7",
color:"#92400e",
padding:"8px 14px",
borderRadius:"20px",
fontSize:"12px",
fontWeight:"800"
}}
>
🟡 {status}
</div>

</div>


{/* MAIN CARD */}

<div
style={{
background:"#ffffff",
borderRadius:"22px",
border:"1px solid #e9edf2",
boxShadow:"0 10px 30px rgba(15,23,42,0.06)",
overflow:"hidden"
}}
>


{/* CARD HEADER */}

<div
style={{
padding:"25px 30px",
borderBottom:"1px solid #edf0f3"
}}
>

<h2
style={{
margin:0,
fontSize:"19px",
color:"#111827"
}}
>
Identity Verification
</h2>

<p
style={{
margin:"5px 0 0",
fontSize:"12px",
color:"#94a3b8"
}}
>
Enter your identity details and upload the required documents.
</p>

</div>


<div
style={{
padding:"30px"
}}
>


{/* ID DETAILS */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
}}
>


<div>

<label style={labelStyle}>
🪪 Aadhaar Number
</label>

<input
type="text"
placeholder="Enter Aadhaar Number"
value={aadhaarNumber}
onChange={(e)=>setAadhaarNumber(e.target.value)}
style={inputStyle}
/>

<p style={hintStyle}>
Enter your 12-digit Aadhaar number.
</p>

</div>


<div>

<label style={labelStyle}>
💳 PAN Number
</label>

<input
type="text"
placeholder="Enter PAN Number"
value={panNumber}
onChange={(e)=>setPanNumber(e.target.value.toUpperCase())}
style={{
...inputStyle,
textTransform:"uppercase"
}}
/>

<p style={hintStyle}>
Enter your valid PAN number.
</p>

</div>

</div>


{/* DOCUMENTS */}

<div
style={{
marginTop:"28px",
paddingTop:"25px",
borderTop:"1px solid #edf0f3"
}}
>

<h3
style={{
margin:"0 0 5px",
fontSize:"17px",
color:"#111827"
}}
>
Upload Documents
</h3>

<p
style={{
margin:"0 0 20px",
fontSize:"12px",
color:"#94a3b8"
}}
>
Upload clear copies of your identity documents.
</p>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:"18px"
}}
>


{/* AADHAAR */}

<div
style={documentCard}
>

<div
style={{
fontSize:"28px",
marginBottom:"10px"
}}
>
🪪
</div>

<strong
style={{
display:"block",
fontSize:"14px",
color:"#111827"
}}
>
Aadhaar Document
</strong>

<p
style={{
fontSize:"12px",
color:"#94a3b8",
margin:"5px 0 15px"
}}
>
Upload Aadhaar card document.
</p>

<input
type="file"
accept="image/*,.pdf"
onChange={(e)=>setAadhaarFile(e.target.files[0])}
style={fileInputStyle}
/>

{
aadhaarFile &&

<div
style={{
marginTop:"10px",
fontSize:"12px",
color:"#15803d",
fontWeight:"700"
}}
>
✓ {aadhaarFile.name}
</div>

}

</div>


{/* PAN */}

<div
style={documentCard}
>

<div
style={{
fontSize:"28px",
marginBottom:"10px"
}}
>
💳
</div>

<strong
style={{
display:"block",
fontSize:"14px",
color:"#111827"
}}
>
PAN Document
</strong>

<p
style={{
fontSize:"12px",
color:"#94a3b8",
margin:"5px 0 15px"
}}
>
Upload PAN card document.
</p>

<input
type="file"
accept="image/*,.pdf"
onChange={(e)=>setPanFile(e.target.files[0])}
style={fileInputStyle}
/>

{
panFile &&

<div
style={{
marginTop:"10px",
fontSize:"12px",
color:"#15803d",
fontWeight:"700"
}}
>
✓ {panFile.name}
</div>

}

</div>

</div>

</div>


{/* SUBMIT */}

<button
onClick={submitKyc}
style={{
width:"100%",
marginTop:"30px",
padding:"15px",
background:"#9b1c31",
color:"#ffffff",
border:"none",
borderRadius:"12px",
fontSize:"16px",
fontWeight:"800",
cursor:"pointer",
boxShadow:"0 6px 15px rgba(155,28,49,0.20)"
}}
>
🪪 Submit KYC
</button>


{/* MESSAGE */}

{
message &&

<div
style={{
marginTop:"16px",
padding:"13px 15px",
borderRadius:"11px",
background:
message.includes("successfully")
?"#f0fdf4"
:"#fff7f7",
border:
message.includes("successfully")
?"1px solid #bbf7d0"
:"1px solid #fecdd3",
color:
message.includes("successfully")
?"#15803d"
:"#9b1c31",
fontSize:"13px",
fontWeight:"600"
}}
>
{message}
</div>

}


{/* SECURITY */}

<div
style={{
marginTop:"18px",
padding:"14px 15px",
borderRadius:"12px",
background:"#f8fafc",
fontSize:"12px",
color:"#64748b"
}}
>
🔒 Your KYC information and documents are handled securely.
</div>


</div>

</div>

</div>

</div>

);

}


const labelStyle={
display:"block",
marginBottom:"8px",
fontSize:"13px",
fontWeight:"700",
color:"#475569"
};

const inputStyle={
width:"100%",
padding:"14px 15px",
borderRadius:"11px",
border:"1px solid #dbe1e8",
fontSize:"15px",
outline:"none",
background:"#ffffff",
color:"#111827",
boxSizing:"border-box"
};

const hintStyle={
margin:"6px 0 0",
fontSize:"11px",
color:"#94a3b8"
};

const documentCard={
background:"#fafbfc",
border:"1px solid #e5e7eb",
borderRadius:"15px",
padding:"20px"
};

const fileInputStyle={
width:"100%",
padding:"10px",
border:"1px solid #dbe1e8",
borderRadius:"10px",
background:"#ffffff",
fontSize:"12px",
boxSizing:"border-box"
};

export default KycPage;
