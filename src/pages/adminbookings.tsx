import { useEffect, useState } from "react";

type Booking = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  hospital: string;
  service: string;
  city: string;
  state: string;
  agree: boolean;
  createdAt: string;
};

function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = JSON.parse(sessionStorage.getItem("user") || "null");

  const loadBookings = () => {
    fetch("http://localhost:5000/api/book-demo")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error("Failed to load bookings:", err);
        setError("Unable to load bookings.");
      })
      .finally(() => setLoading(false));
  };

  const deleteBooking = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/book-demo/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      alert(data.message);
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  const updateBooking = async (id: string, currentService: string) => {
    const updatedService = window.prompt("Update service:", currentService);
    if (!updatedService || !updatedService.trim()) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/book-demo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ service: updatedService.trim() }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, service: updatedService.trim() } : booking
        )
      );
      alert(data.message);
    } catch (err: any) {
      alert(err.message || "Update failed");
    }
  };

  const exportToCsv = () => {
    if (bookings.length === 0) {
      alert("No bookings to export.");
      return;
    }

    const headers = ["Name", "Email", "Phone", "Hospital", "Service", "City", "State", "Consent", "Booked On"];
    const rows = bookings.map((booking) => [
      booking.name,
      booking.email,
      booking.phone,
      booking.hospital,
      booking.service,
      booking.city,
      booking.state,
      booking.agree ? "Yes" : "No",
      new Date(booking.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "appointment-bookings.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="demo-container">
        <h2>Access denied</h2>
        <p>Please login with the admin account to view bookings.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="demo-container"><h2>Loading bookings...</h2></div>;
  }

  return (
    <div className="demo-container">
      <h2>Admin - Appointment Bookings</h2>
      <button onClick={exportToCsv} style={{ marginBottom: "16px" }}>Export to CSV</button>

      {error && <p style={{ color: "#fca5a5" }}>{error}</p>}

      {bookings.length === 0 ? (
        <p>No appointment bookings found yet.</p>
      ) : (
        <div>
          {bookings.map((booking) => (
            <div key={booking._id} style={{ border: "1px solid #dbeafe", borderRadius: "10px", padding: "16px", marginBottom: "12px", background: "rgba(255,255,255,0.05)" }}>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Hospital:</strong> {booking.hospital}</p>
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>City:</strong> {booking.city}</p>
              <p><strong>State:</strong> {booking.state}</p>
              <p><strong>Consent:</strong> {booking.agree ? "Yes" : "No"}</p>
              <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
              <button onClick={() => updateBooking(booking._id, booking.service)}>Edit</button>
              <button onClick={() => deleteBooking(booking._id)} style={{ marginLeft: "8px" }}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBookings;
