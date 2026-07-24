import "../App.css";
import "../css/form.css";
import { useState } from "react";
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
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const name = e.target.name;
  const value = e.target.value;
  setFormData({
    ...formData,
    [name]: value
  });

};
const handleCheckbox = (
  e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    agree: e.target.checked
  });
};
const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(formData);
};
  return (
    <div className="demo-container">
      <form onSubmit={handleSubmit}>
        <h2>Book a Demo</h2>
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
        <button type="submit">
          Book Demo
        </button>
      </form>
    </div>
  );
}

export default DemoForm;