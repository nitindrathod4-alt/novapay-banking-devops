import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        background: "transparent",
        color: "#111827",
        border: "1px solid #d1d5db",
        padding: "9px 16px",
        borderRadius: "10px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        marginBottom: "20px",
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#f1f5f9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span style={{ fontSize: "20px", lineHeight: 1 }}>←</span>
      Back
    </button>
  );
}

export default BackButton;
