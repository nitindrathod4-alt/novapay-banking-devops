import BackButton from "../components/BackButton";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function TravelBookingPage() {

  const [type, setType] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [passengerName, setPassengerName] = useState("");

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const travelOptions = [
    ["🚆", "Train"],
    ["🚌", "Bus"],
    ["✈️", "Flight"],
    ["🏨", "Hotel"]
  ];

  const confirmBooking = async () => {

    if (!from || !to || !travelDate || !passengerName) {
      alert("Please fill all booking details");
      return;
    }

    try {

      setLoading(true);

      const res = await api.post("/bookings", {
        type,
        from,
        to,
        travelDate,
        passengerName
      });

      setBooking(res.data.booking);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Booking Failed"
      );

    } finally {

      setLoading(false);

    }
  };


  const resetBooking = () => {

    setBooking(null);
    setType("");
    setShowForm(false);

    setFrom("");
    setTo("");
    setTravelDate("");
    setPassengerName("");

  };


  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--page-bg)"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "35px"
        }}
      >

        <BackButton />

        {!booking && !showForm && (

          <div
            style={{
              maxWidth: "900px",
              margin: "30px auto"
            }}
          >

            <h1
              style={{
                color: "#111827",
                marginBottom: "8px"
              }}
            >
              ✈️ Travel Booking
            </h1>

            <p
              style={{
                color: "#64748b",
                marginBottom: "30px"
              }}
            >
              Book your travel quickly and securely.
            </p>


            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",
                gap: "20px"
              }}
            >

              {travelOptions.map(([icon, name]) => (

                <div
                  key={name}
                  onClick={() => {
                    setType(name);
                    setShowForm(true);
                  }}
                  style={{
                    background: "var(--card-bg)",
                    padding: "30px 20px",
                    borderRadius: "18px",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow:
                      "0 8px 22px rgba(15,23,42,.08)",
                    border:
                      "1px solid #e5e7eb"
                  }}
                >

                  <div
                    style={{
                      fontSize: "42px",
                      marginBottom: "12px"
                    }}
                  >
                    {icon}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 15px",
                      color: "#111827"
                    }}
                  >
                    {name}
                  </h3>

                  <button
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "10px 22px",
                      borderRadius: "9px",
                      cursor: "pointer",
                      fontWeight: "700"
                    }}
                  >
                    Book Now
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}


        {!booking && showForm && (

          <div
            style={{
              maxWidth: "650px",
              margin: "30px auto",
              background: "var(--card-bg)",
              padding: "35px",
              borderRadius: "20px",
              boxShadow:
                "0 10px 30px rgba(15,23,42,.10)"
            }}
          >

            <h2
              style={{
                marginTop: 0,
                color: "#111827"
              }}
            >
              {type === "Train" && "🚆"}
              {type === "Bus" && "🚌"}
              {type === "Flight" && "✈️"}
              {type === "Hotel" && "🏨"}

              {" "}{type} Booking
            </h2>

            <p
              style={{
                color: "#64748b"
              }}
            >
              Enter your booking details.
            </p>


            <input
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              style={inputStyle}
            />


            <input
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              style={inputStyle}
            />


            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              style={inputStyle}
            />


            <input
              placeholder="Passenger Name"
              value={passengerName}
              onChange={(e) =>
                setPassengerName(e.target.value)
              }
              style={inputStyle}
            />


            <button
              onClick={confirmBooking}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "22px",
                padding: "14px",
                background:
                  loading ? "#94a3b8" : "#059669",
                color: "white",
                border: "none",
                borderRadius: "11px",
                cursor:
                  loading ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "700"
              }}
            >
              {loading
                ? "Confirming..."
                : "✅ Confirm Booking"}
            </button>


            <button
              onClick={() => setShowForm(false)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                background: "#f1f5f9",
                color: "#334155",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              ← Back
            </button>

          </div>

        )}


        {booking && (

          <div
            style={{
              maxWidth: "650px",
              margin: "50px auto",
              background: "var(--card-bg)",
              padding: "40px",
              borderRadius: "22px",
              textAlign: "center",
              boxShadow:
                "0 12px 35px rgba(15,23,42,.12)"
            }}
          >

            <div
              style={{
                fontSize: "55px"
              }}
            >
              ✅
            </div>

            <h1
              style={{
                color: "#059669",
                marginBottom: "8px"
              }}
            >
              Booking Confirmed!
            </h1>

            <p
              style={{
                color: "#64748b"
              }}
            >
              Your {booking.type} booking has been
              successfully confirmed.
            </p>


            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                background: "#f8fafc",
                borderRadius: "14px",
                textAlign: "left"
              }}
            >

              <p>
                <strong>🎫 Booking ID:</strong>{" "}
                {booking.bookingId}
              </p>

              <p>
                <strong>🚍 Type:</strong>{" "}
                {booking.type}
              </p>

              <p>
                <strong>📍 From:</strong>{" "}
                {booking.from}
              </p>

              <p>
                <strong>📍 To:</strong>{" "}
                {booking.to}
              </p>

              <p>
                <strong>📅 Date:</strong>{" "}
                {new Date(
                  booking.travelDate
                ).toLocaleDateString("en-IN")}
              </p>

              <p>
                <strong>👤 Passenger:</strong>{" "}
                {booking.passengerName}
              </p>

              <p>
                <strong>🟢 Status:</strong>{" "}
                <span
                  style={{
                    color: "#059669",
                    fontWeight: "700"
                  }}
                >
                  {booking.status}
                </span>
              </p>

            </div>


            <button
              onClick={resetBooking}
              style={{
                marginTop: "25px",
                padding: "13px 25px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700"
              }}
            >
              ✈️ New Booking
            </button>

          </div>

        )}

      </div>

    </div>

  );

}


const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  boxSizing: "border-box",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  background: "var(--card-bg)"
};


export default TravelBookingPage;
