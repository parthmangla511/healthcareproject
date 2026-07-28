import "../App.css";
import "../css/form.css";
import axios from "axios";
import { useEffect, useState } from "react";

type ServiceOption = {
  _id?: string;
  title: string;
  category: string;
  description: string;
};

function DemoForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hospital: "",
    service: "",
    city: "",
    state: "",
    agree: false
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServiceOptions(data))
      .catch((error) => console.error("Failed to load services:", error));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      agree: e.target.checked
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post("http://localhost:5000/api/book-demo", formData);
      setStatus(response.data.message || "Appointment booked successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        hospital: "",
        service: "",
        city: "",
        state: "",
        agree: false
      });
    } catch (error: any) {
      setStatus(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-container">
      <form onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label>Hospital Name:</label>
        <input
          type="text"
          name="hospital"
          placeholder="Enter hospital name"
          value={formData.hospital}
          onChange={handleChange}
          required
        />
        <label>Select Service:</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Service</option>
          {serviceOptions.map((service) => (
            <option key={service._id || service.title} value={service.title}>
              {service.title} ({service.category})
            </option>
          ))}
        </select>
        <label>Select City:</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="">Select City</option>
          <option value="Delhi">New Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Indore">Indore</option>
          <option value="Udaipur">Udaipur</option>
        </select>
        <label>Select State:</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          <option value="Delhi">Delhi</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={formData.agree}
            onChange={handleCheckbox}
            required
          />
          I agree to be contacted regarding this appointment.
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
}

export default DemoForm;
