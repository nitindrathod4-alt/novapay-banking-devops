import { useNavigate } from "react-router-dom";

function BackButton(){

const navigate = useNavigate();

return(
<button
onClick={()=>navigate(-1)}
style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"10px 18px",
borderRadius:"10px",
fontSize:"16px",
cursor:"pointer",
marginBottom:"20px"
}}
>
⬅ Back
</button>
);

}

export default BackButton;
