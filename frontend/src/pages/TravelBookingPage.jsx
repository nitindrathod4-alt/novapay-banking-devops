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
    {
      icon: "🚆",
      title: "Train",
      subtitle: "Comfortable rail travel",
    },
    {
      icon: "🚌",
      title: "Bus",
      subtitle: "Intercity bus booking",
    },
    {
      icon: "✈️",
      title: "Flight",
      subtitle: "Domestic & air travel",
    },
    {
      icon: "🏨",
      title: "Hotel",
      subtitle: "Stay & accommodation",
    },
  ];

  const selectedOption =
    travelOptions.find((item) => item.title === type);

  const bookNow = async () => {
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
        passengerName,
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
        background: "var(--page-bg)",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "30px 42px 50px",
          boxSizing: "border-box",
        }}
      >
        <BackButton />

        {!showForm && !booking && (
          <>
            <section
              style={{
                maxWidth: "1180px",
                margin: "24px auto 0",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg,#8f1930 0%,#b52d49 55%,#d05b70 100%)",
                  borderRadius: "24px",
                  padding: "34px 38px",
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow:
                    "0 14px 35px rgba(15,23,42,.14)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "220px",
                    height: "220px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,.16)",
                    right: "-55px",
                    top: "-90px",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,.12)",
                    right: "80px",
                    bottom: "-105px",
                  }}
                />

                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "12px",
                    fontWeight: "800",
                    letterSpacing: "1.4px",
                    opacity: ".86",
                  }}
                >
                  NOVA PAY • TRAVEL SERVICES
                </p>

                <h1
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: "800",
                  }}
                >
                  Travel Booking
                </h1>

                <p
                  style={{
                    margin: "10px 0 0",
                    maxWidth: "600px",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    opacity: ".9",
                  }}
                >
                  Plan your journey with a simple,
                  secure and convenient booking
                  experience.
                </p>
              </div>
            </section>

            <section
              style={{
                maxWidth: "1180px",
                margin: "28px auto 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  marginBottom: "16px",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: "#111827",
                      fontSize: "21px",
                    }}
                  >
                    Where would you like to go?
                  </h2>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#64748b",
                      fontSize: "13px",
                    }}
                  >
                    Choose a travel service to get
                    started.
                  </p>
                </div>

                <span
                  style={{
                    background: "#fff1f2",
                    color: "#9b1c31",
                    padding: "7px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  🔒 Secure Booking
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(220px,1fr))",
                  gap: "18px",
                }}
              >
                {travelOptions.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => {
                      setType(item.title);
                      setShowForm(true);
                    }}
                    style={{
                      background:
                        "var(--card-bg)",
                      border:
                        "1px solid #e5e7eb",
                      borderRadius: "18px",
                      padding: "24px",
                      cursor: "pointer",
                      boxShadow:
                        "0 7px 22px rgba(15,23,42,.06)",
                      transition:
                        "transform .2s ease, box-shadow .2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "54px",
                        height: "54px",
                        borderRadius: "15px",
                        background: "#fff1f2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "28px",
                        marginBottom: "18px",
                      }}
                    >
                      {item.icon}
                    </div>

                    <h3
                      style={{
                        margin: "0 0 6px",
                        color: "#111827",
                        fontSize: "18px",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        margin: "0 0 20px",
                        color: "#64748b",
                        fontSize: "13px",
                      }}
                    >
                      {item.subtitle}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        color: "#9b1c31",
                        fontWeight: "800",
                        fontSize: "13px",
                      }}
                    >
                      <span>Book Now</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {showForm && !booking && (
          <section
            style={{
              maxWidth: "850px",
              margin: "25px auto 0",
            }}
          >
            <div
              style={{
                background:
                  "var(--card-bg)",
                borderRadius: "22px",
                border:
                  "1px solid #e5e7eb",
                overflow: "hidden",
                boxShadow:
                  "0 10px 30px rgba(15,23,42,.08)",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg,#8f1930,#b52d49)",
                  padding: "25px 30px",
                  color: "#fff",
                }}
              >
                <p
                  style={{
                    margin: "0 0 5px",
                    fontSize: "12px",
                    opacity: ".8",
                    fontWeight: "700",
                    letterSpacing: "1px",
                  }}
                >
                  NOVA PAY • BOOKING
                </p>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                  }}
                >
                  {selectedOption?.icon}{" "}
                  {type} Booking
                </h2>
              </div>

              <div
                style={{
                  padding: "30px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(240px,1fr))",
                    gap: "18px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>
                      From
                    </label>

                    <input
                      placeholder="Enter departure"
                      value={from}
                      onChange={(e) =>
                        setFrom(e.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      To
                    </label>

                    <input
                      placeholder="Enter destination"
                      value={to}
                      onChange={(e) =>
                        setTo(e.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Travel Date
                    </label>

                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) =>
                        setTravelDate(
                          e.target.value
                        )
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>
                      Passenger Name
                    </label>

                    <input
                      placeholder="Enter passenger name"
                      value={passengerName}
                      onChange={(e) =>
                        setPassengerName(
                          e.target.value
                        )
                      }
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "24px",
                    padding: "14px 16px",
                    background: "#f8fafc",
                    borderRadius: "12px",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  🔐 Your booking request is
                  securely processed through
                  Nova Pay.
                </div>

                <button
                  onClick={bookNow}
                  disabled={loading}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "14px",
                    background: loading
                      ? "#94a3b8"
                      : "#9b1c31",
                    color: "#fff",
                    border: "none",
                    borderRadius: "11px",
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                    fontSize: "16px",
                    fontWeight: "800",
                  }}
                >
                  {loading
                    ? "Processing..."
                    : "🎫 Book Now"}
                </button>

                <button
                  onClick={() =>
                    setShowForm(false)
                  }
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    padding: "12px",
                    background: "#f1f5f9",
                    color: "#334155",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  ← Back to Travel Options
                </button>
              </div>
            </div>
          </section>
        )}

        {booking && (
          <section
            style={{
              maxWidth: "700px",
              margin: "45px auto 0",
            }}
          >
            <div
              style={{
                background:
                  "var(--card-bg)",
                borderRadius: "22px",
                border:
                  "1px solid #d1fae5",
                padding: "35px",
                textAlign: "center",
                boxShadow:
                  "0 12px 35px rgba(15,23,42,.10)",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  margin: "0 auto 18px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                }}
              >
                ✓
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#059669",
                  fontWeight: "800",
                  fontSize: "12px",
                  letterSpacing: "1px",
                }}
              >
                BOOKING SUCCESSFUL
              </p>

              <h1
                style={{
                  margin: "7px 0",
                  color: "#111827",
                  fontSize: "28px",
                }}
              >
                Booking Confirmed
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Your {booking.type} booking
                has been successfully created.
              </p>

              <div
                style={{
                  marginTop: "25px",
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "15px",
                  textAlign: "left",
                }}
              >
                <InfoRow
                  label="Booking ID"
                  value={booking.bookingId}
                />

                <InfoRow
                  label="Travel Type"
                  value={booking.type}
                />

                <InfoRow
                  label="From"
                  value={booking.from}
                />

                <InfoRow
                  label="To"
                  value={booking.to}
                />

                <InfoRow
                  label="Travel Date"
                  value={new Date(
                    booking.travelDate
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                />

                <InfoRow
                  label="Passenger"
                  value={booking.passengerName}
                />

                <InfoRow
                  label="Status"
                  value={booking.status}
                  last
                />
              </div>

              <button
                onClick={resetBooking}
                style={{
                  marginTop: "24px",
                  padding: "13px 25px",
                  background: "#9b1c31",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "800",
                }}
              >
                + New Booking
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function InfoRow({ label, value, last }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        padding: "12px 0",
        borderBottom: last
          ? "none"
          : "1px solid #e5e7eb",
        fontSize: "14px",
      }}
    >
      <span
        style={{
          color: "#64748b",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color:
            label === "Status"
              ? "#059669"
              : "#111827",
          textAlign: "right",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  color: "#475569",
  fontSize: "13px",
  fontWeight: "700",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "var(--card-bg)",
  color: "#111827",
  fontSize: "14px",
  outline: "none",
};

export default TravelBookingPage;
