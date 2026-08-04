import { useEffect, useState } from "react";
import api from "../services/api";

function AdminKyc() {

  const thStyle = {
    padding:"15px",
    textAlign:"center",
    background:"#1e293b",
    color:"white",
    fontSize:"16px"
  };

  const tdStyle = {
    padding:"15px",
    textAlign:"center",
    borderBottom:"1px solid #e5e7eb"
  };

  const [users, setUsers] = useState([]);

  const loadKyc = async () => {
    try {
      const res = await api.get("/admin/kyc");
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };


  const approve = async (id) => {
    await api.put(`/admin/kyc/${id}/approve`);
    loadKyc();
  };


  const reject = async (id) => {
    await api.put(`/admin/kyc/${id}/reject`);
    loadKyc();
  };


  useEffect(() => {
    loadKyc();
  }, []);


  const statusStyle = (status) => {

    if(status === "Verified")
      return {color:"green", fontWeight:"bold"};

    if(status === "Rejected")
      return {color:"red", fontWeight:"bold"};

    return {color:"orange", fontWeight:"bold"};
  };


  return (
    <div style={{
      padding:"40px",
      background:"#f3f4f6",
      minHeight:"100vh"
    }}>

      <h1>🪪 Admin KYC Verification</h1>


      <table style={{
        width:"100%",
        background:"#fff",
        marginTop:"30px",
        borderCollapse:"separate",
        borderSpacing:"0",
        borderRadius:"12px",
        overflow:"hidden",
        boxShadow:"0 8px 20px rgba(0,0,0,0.1)"
      }}>

        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Aadhaar</th>
            <th style={thStyle}>PAN</th>
            <th style={thStyle}>Documents</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>


        <tbody>

        {users.map(user => (

          <tr key={user._id}>

            <td style={tdStyle}>{user.name}</td>

            <td style={tdStyle}>{user.aadhaarNumber}</td>

            <td style={tdStyle}>{user.panNumber}</td>


            <td>

              <a
                href={`http://13.203.173.169:5000/uploads/${user.aadhaarDocument}`}
                target="_blank"
              >
                📄 Aadhaar
              </a>

              <br />

              <a
                href={`http://13.203.173.169:5000/uploads/${user.panDocument}`}
                target="_blank"
              >
                📄 PAN
              </a>

            </td>


            <td style={statusStyle(user.kycStatus)}>
              {user.kycStatus}
            </td>


            <td>

              <button 
onClick={()=>approve(user._id)}
style={{
background:"#22c55e",
color:"white",
border:"none",
padding:"8px 16px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold"
}}>
✅ Approve
</button>


              <button
                onClick={()=>reject(user._id)}
                style={{
marginLeft:"10px",
background:"#ef4444",
color:"white",
border:"none",
padding:"8px 16px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"bold"
}}
              >
                ❌ Reject
              </button>

            </td>


          </tr>

        ))}

        </tbody>

      </table>

    </div>
  );
}


export default AdminKyc;
