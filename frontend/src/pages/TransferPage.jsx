import BackButton from "../components/BackButton";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function TransferPage() {

  const [mode,setMode] = useState("username");
  const [username,setUsername] = useState("");
  const [mobileNumber,setMobileNumber] = useState("");
  const [receiver,setReceiver] = useState(null);
  const [amount,setAmount] = useState("");

  const searchMobile = async()=> {
    try{
      const res = await api.get(
        `/transactions/user/mobile/${mobileNumber}`
      );

      setReceiver(res.data.user);

    }catch(err){
      alert(err.response?.data?.message || "User Not Found");
      setReceiver(null);
    }
  };


  const transferMoney = async()=>{

    try{

      const res = await api.post("/transactions/transfer",{
        username:
        mode==="mobile"
        ? receiver?.username
        : username,

        amount:Number(amount)
      });

      alert(res.data.message);

      setAmount("");
      setUsername("");
      setMobileNumber("");
      setReceiver(null);

    }catch(err){
      alert(
        err.response?.data?.message ||
        "Transfer Failed"
      );
    }
  };


return (

<div style={{display:"flex"}}>

<Sidebar/>

<div style={{
flex:1,
padding:"40px",
background:"#f1f5f9",
minHeight:"100vh"
}}>


<div style={{
background:"#fff",
maxWidth:"600px",
padding:"30px",
borderRadius:"20px",
boxShadow:"0 10px 25px rgba(0,0,0,0.1)"
}}>


<BackButton />

<h1>
💸 Send Money
</h1>


<p style={{color:"#64748b"}}>
Transfer money securely to another NovaPay user
</p>



<div style={{
display:"flex",
gap:"10px",
marginBottom:"25px"
}}>


<button
onClick={()=>setMode("username")}
style={{
flex:1,
padding:"12px",
border:"none",
borderRadius:"10px",
background:mode==="username"?"#2563eb":"#e2e8f0",
color:mode==="username"?"white":"black",
cursor:"pointer"
}}
>
🏦 Account
</button>


<button
onClick={()=>setMode("mobile")}
style={{
flex:1,
padding:"12px",
border:"none",
borderRadius:"10px",
background:mode==="mobile"?"#2563eb":"#e2e8f0",
color:mode==="mobile"?"white":"black",
cursor:"pointer"
}}
>
📱 Mobile
</button>


</div>



{
mode==="username" &&

<input
style={inputStyle}
placeholder="Enter Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

}



{
mode==="mobile" &&

<>

<div style={{display:"flex",gap:"10px"}}>

<input
style={inputStyle}
placeholder="Enter Mobile Number"
value={mobileNumber}
onChange={(e)=>setMobileNumber(e.target.value)}
/>

<button
onClick={searchMobile}
style={searchBtn}
>
Search
</button>

</div>


{
receiver &&

<div style={{
marginTop:"20px",
padding:"20px",
background:"#eff6ff",
borderRadius:"15px"
}}>

<h3>Receiver Details</h3>

<p>👤 {receiver.name}</p>
<p>📱 {receiver.mobileNumber}</p>
<p>🏦 {receiver.bankName}</p>
<p>💳 **** {receiver.accountNumber.slice(-4)}</p>

</div>

}

</>

}




<input
type="number"
style={inputStyle}
placeholder="Enter Amount ₹"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>



<button
onClick={transferMoney}
style={sendBtn}
>
💸 Send Money
</button>


</div>


</div>

</div>

);

}


const inputStyle={
width:"100%",
padding:"14px",
marginTop:"15px",
borderRadius:"10px",
border:"1px solid #cbd5e1",
fontSize:"16px"
};


const searchBtn={
padding:"12px 20px",
background:"#16a34a",
color:"white",
border:"none",
borderRadius:"10px",
cursor:"pointer"
};


const sendBtn={
width:"100%",
marginTop:"25px",
padding:"15px",
background:"#059669",
color:"white",
border:"none",
borderRadius:"12px",
fontSize:"18px",
cursor:"pointer"
};


export default TransferPage;
