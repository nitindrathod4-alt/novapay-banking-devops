import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../services/api";

function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState({});

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin-tickets");

      setTickets(res.data.tickets || []);

    } catch (err) {
      console.log("Tickets Error:", err);
      alert("Unable to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id, status) => {
    try {
      await api.put(`/admin-tickets/${id}`, {
        status,
        reply: reply[id] || "",
      });

      alert(
        status === "Resolved"
          ? "✅ Ticket resolved"
          : "✅ Reply sent"
      );

      setReply((prev) => ({
        ...prev,
        [id]: "",
      }));

      loadTickets();

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to update ticket"
      );
    }
  };

  const openTickets = tickets.filter(
    (t) => t.status !== "Resolved"
  ).length;

  const resolvedTickets = tickets.filter(
    (t) => t.status === "Resolved"
  ).length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f6f8",
      }}
    >

      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "35px 45px",
          overflowX: "hidden",
        }}
      >

        <div style={{ marginBottom: "30px" }}>

          <div
            style={{
              color: "#9d1730",
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "1.5px",
            }}
          >
            CUSTOMER SERVICE
          </div>

          <h1
            style={{
              margin: "7px 0",
              fontSize: "32px",
              color: "#172033",
            }}
          >
            Support Tickets
          </h1>

          <p style={{ color: "#64748b" }}>
            Manage customer requests and resolve support issues.
          </p>

        </div>


        {/* SUMMARY */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <SummaryCard
            icon="🎫"
            title="Total Tickets"
            value={tickets.length}
          />

          <SummaryCard
            icon="📩"
            title="Open Tickets"
            value={openTickets}
          />

          <SummaryCard
            icon="✓"
            title="Resolved"
            value={resolvedTickets}
            green
          />

        </div>


        {/* HEADER */}

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "22px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <div>
            <h2 style={{ margin: 0 }}>
              Customer Requests
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
              }}
            >
              Review and respond to customer tickets.
            </p>
          </div>

          <button
            onClick={loadTickets}
            style={{
              padding: "10px 18px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#fff",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            ↻ Refresh
          </button>

        </div>


        {/* TICKETS */}

        {loading ? (

          <div
            style={{
              background: "#fff",
              padding: "60px",
              textAlign: "center",
              borderRadius: "18px",
            }}
          >
            Loading tickets...
          </div>

        ) : tickets.length === 0 ? (

          <div
            style={{
              background: "#fff",
              padding: "70px",
              textAlign: "center",
              borderRadius: "18px",
            }}
          >
            <div style={{ fontSize: "45px" }}>
              🎫
            </div>

            <h3>No Support Tickets</h3>

            <p style={{ color: "#64748b" }}>
              There are currently no customer requests.
            </p>

          </div>

        ) : (

          tickets.map((ticket) => {

            const resolved =
              ticket.status === "Resolved";

            return (
              <div
                key={ticket._id}
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "25px",
                  marginBottom: "18px",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 6px 20px rgba(15,23,42,.05)",
                }}
              >

                {/* TOP */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >

                  <div>

                    <h2
                      style={{
                        margin: 0,
                        color: "#172033",
                      }}
                    >
                      {ticket.subject}
                    </h2>

                    <div
                      style={{
                        marginTop: "10px",
                        color: "#64748b",
                        fontSize: "14px",
                      }}
                    >
                      👤{" "}
                      <b>
                        {ticket.user?.username ||
                          "Unknown"}
                      </b>

                      {"   "}

                      • Category:{" "}
                      <b>
                        {ticket.category}
                      </b>
                    </div>

                  </div>


                  <span
                    style={{
                      height: "fit-content",
                      padding: "7px 14px",
                      borderRadius: "20px",
                      background: resolved
                        ? "#dcfce7"
                        : "#fff4d6",
                      color: resolved
                        ? "#15803d"
                        : "#a16207",
                      fontWeight: "800",
                    }}
                  >
                    {ticket.status}
                  </span>

                </div>


                {/* CUSTOMER MESSAGE */}

                <div
                  style={{
                    marginTop: "20px",
                    background: "#f8fafc",
                    borderRadius: "12px",
                    padding: "18px",
                    borderLeft:
                      "4px solid #9d1730",
                  }}
                >

                  <b
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                    }}
                  >
                    CUSTOMER ISSUE
                  </b>

                  <p
                    style={{
                      marginBottom: 0,
                      color: "#334155",
                      lineHeight: "1.6",
                    }}
                  >
                    {ticket.message}
                  </p>

                </div>


                {/* EXISTING REPLY */}

                {ticket.reply && (

                  <div
                    style={{
                      marginTop: "15px",
                      background: "#ecfdf5",
                      padding: "15px",
                      borderRadius: "12px",
                      borderLeft:
                        "4px solid #059669",
                    }}
                  >

                    <b
                      style={{
                        color: "#047857",
                      }}
                    >
                      ADMIN REPLY
                    </b>

                    <p
                      style={{
                        marginBottom: 0,
                        color: "#334155",
                      }}
                    >
                      {ticket.reply}
                    </p>

                  </div>

                )}


                {/* REPLY */}

                {!resolved && (

                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >

                    <textarea
                      placeholder="Write reply to customer..."
                      value={reply[ticket._id] || ""}
                      onChange={(e) =>
                        setReply({
                          ...reply,
                          [ticket._id]:
                            e.target.value,
                        })
                      }
                      rows={3}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "13px",
                        borderRadius: "10px",
                        border:
                          "1px solid #dbe1e8",
                        resize: "vertical",
                        fontFamily: "inherit",
                      }}
                    />


                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "12px",
                      }}
                    >

                      <button
                        onClick={() =>
                          updateTicket(
                            ticket._id,
                            "Open"
                          )
                        }
                        style={{
                          padding: "11px 18px",
                          border: "none",
                          borderRadius: "10px",
                          background: "#2563eb",
                          color: "#fff",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        📩 Send Reply
                      </button>


                      <button
                        onClick={() =>
                          updateTicket(
                            ticket._id,
                            "Resolved"
                          )
                        }
                        style={{
                          padding: "11px 18px",
                          border: "none",
                          borderRadius: "10px",
                          background: "#059669",
                          color: "#fff",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        ✓ Reply & Resolve
                      </button>

                    </div>

                  </div>

                )}

              </div>
            );
          })

        )}

      </main>

    </div>
  );
}


function SummaryCard({
  icon,
  title,
  value,
  green = false,
}) {

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "22px",
        border: "1px solid #e2e8f0",
      }}
    >

      <div style={{ fontSize: "25px" }}>
        {icon}
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: "800",
          marginTop: "10px",
          color: green
            ? "#059669"
            : "#172033",
        }}
      >
        {value}
      </div>

      <div
        style={{
          color: "#64748b",
          marginTop: "5px",
        }}
      >
        {title}
      </div>

    </div>
  );
}


export default AdminTicketsPage;
