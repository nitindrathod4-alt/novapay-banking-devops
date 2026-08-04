import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function UserProfilePage(){

  const { id } = useParams();

  const [user,setUser] = useState(null);


  useEffect(()=>{
    loadUser();
  },[]);


  const loadUser = async()=>{
    try{
      const res = await api.get(`/users/${id}`);
      setUser(res.data.user);
    }
    catch(err){
      console.log(err);
    }
  };


  if(!user){
    return <h2>Loading...</h2>;
  }


  return(
    <div style={{
      padding:"40px",
      background:"#f3f4f6",
      minHeight:"100vh"
    }}>

      <Link to="/admin/users">
        ⬅ Back
      </Link>

      <h1>👤 User Profile</h1>


      <div style={{
        background:"#fff",
        padding:"30px",
        borderRadius:"15px",
        maxWidth:"600px"
      }}>

        <h2>{user.name}</h2>

        <p>Username : {user.username}</p>
        <p>Account Number : {user.accountNumber}</p>
        <p>IFSC : {user.ifsc}</p>
        <p>Branch : {user.branchName}</p>
        <p>Account Type : {user.accountType}</p>
        <p>Balance : ₹ {user.balance}</p>
        <p>Status : {user.status}</p>
        <p>KYC Status : {user.kycStatus}</p>

      </div>

    </div>
  );
}

export default UserProfilePage;
