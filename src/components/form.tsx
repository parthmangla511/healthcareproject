import "../App.css";
import "../css/form.css";
import { useState } from "react";
import axios from "axios";

function DemoForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hospital: "",
    service: "",
    city: "",
    state: "",
    agree: false,
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agree: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/demo", formData);
      setStatusMessage(response.data?.notification || response.data?.message || "Demo booked successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        hospital: "",
        service: "",
        city: "",
        state: "",
        agree: false,
      });
    } catch (error: any) {
      setStatusMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="demo-container">
      <form onSubmit={handleSubmit}>
        <h2>Book an Appointment</h2>
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
          required/>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          required/>
        <label>Hospital Name:</label>
        <input
          type="text"
          name="hospital"
          placeholder="Enter hospital name"
          value={formData.hospital}
          onChange={handleChange}
          required/>
        <label>Select Service:</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required>
          <option value="">
            Select Service
          </option>
          <option value="Doctor Appointment">
            Doctor Appointment Booking
          </option>
          <option value="Pharmacy">
            Pharmacy
          </option>
          <option value="Lab Testing">
            Lab Testing Booking
          </option>
          <option value="Ambulance">
            Ambulance Service
          </option>
          <option value="Vaccination">
            Vaccination Service
          </option>
          <option value="Airplane">
            Airplane Service
          </option>
        </select>
        <label>Select City:</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required>
          <option value="">
            Select City
          </option>
          <option value="Delhi">
            New Delhi
          </option>
          <option value="Mumbai">
            Mumbai
          </option>
          <option value="Indore">
            Indore
          </option>
          <option value="Udaipur">
            Udaipur
          </option>
        </select>
        <label>Select State:</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required>
          <option value="">
            Select State
          </option>
          <option value="Delhi">
            Delhi
          </option>
          <option value="Maharashtra">
            Maharashtra
          </option>
          <option value="Madhya Pradesh">
            Madhya Pradesh
          </option>
          <option value="Rajasthan">
            Rajasthan
          </option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={formData.agree}
            onChange={handleCheckbox}
            required/>
          I agree to be contacted regarding this demo.
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Book Demo"}
        </button>
        {statusMessage && <p style={{ marginTop: "12px", color: "black" }}>{statusMessage}</p>}
      </form>
    </div>
  );
}

export default DemoForm;
