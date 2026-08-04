import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function ResetPasswordPage(){

  const { id } = useParams();

  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");

  const resetPassword = async(e)=>{
    e.preventDefault();

    if(password !== confirm){
      alert("Passwords do not match");
      return;
    }

    try{

      await api.put(`/users/${id}/password`,{
        password
      });

      alert("✅ Password Reset Successfully");

      setPassword("");
      setConfirm("");

    }catch(err){

      alert(
        err.response?.data?.message ||
        "Reset Failed"
      );

    }
  };


  return(
    <div style={{
      minHeight:"100vh",
      background:"#f3f4f6",
      padding:"40px"
    }}>

      <Link to="/admin/users">
        ⬅ Back
      </Link>


      <h1>🔐 Reset User Password</h1>


      <form
        onSubmit={resetPassword}
        style={{
          background:"#fff",
          padding:"30px",
          maxWidth:"450px",
          borderRadius:"15px",
          marginTop:"30px",
          boxShadow:"0 8px 20px rgba(0,0,0,.1)"
        }}
      >

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"15px"
          }}
        />


        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e)=>setConfirm(e.target.value)}
          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"20px"
          }}
        />


        <button
          style={{
            width:"100%",
            padding:"12px",
            background:"#2563eb",
            color:"#fff",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer"
          }}
        >
          🔐 Update Password
        </button>


      </form>

    </div>
  );
}

export default ResetPasswordPage;
