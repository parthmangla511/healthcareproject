import { useState } from "react";
import "../css/ambulance.css";

type AmbulanceFormData = {
  name: string;
  age: string;
  pickup_location: string;
  drop_location: string;
  contact_number: string;
  email: string;
};

function Ambulance() {
  const [formData, setFormData] = useState<AmbulanceFormData>({
    name: "",
    age: "",
    pickup_location: "",
    drop_location: "",
    contact_number: "",
    email: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/ambulance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          age: "",
          pickup_location: "",
          drop_location: "",
          contact_number: "",
          email: "",
        });
      } else {
        setStatusMessage(data.message || "Unable to book ambulance right now.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Server error. Please try again later.");
    }
  };

  return (
    <main className="ambulance-page">
      <form className="ambulance-form" onSubmit={handleSubmit}>
        <p className="ambulance-form__eyebrow">24/7 Emergency Service</p>
        <h1>Book an Ambulance</h1>
        <p className="ambulance-form__intro">
          Share the patient and pickup details so we can arrange assistance quickly.
        </p>

        <label htmlFor="patient-name">Patient name</label>
        <input
          id="patient-name"
          type="text"
          name="name"
          placeholder="Enter the patient name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="patient-age">Age</label>
        <input
          id="patient-age"
          type="number"
          name="age"
          min="0"
          placeholder="Enter the age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="pickup-location">Pickup location</label>
        <input
          id="pickup-location"
          type="text"
          name="pickup_location"
          placeholder="Enter pickup location"
          value={formData.pickup_location}
          onChange={handleChange}
          required
        />

        <label htmlFor="drop-location">Drop location</label>
        <input
          id="drop-location"
          type="text"
          name="drop_location"
          placeholder="Enter hospital or drop location"
          value={formData.drop_location}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone-number">Contact number</label>
        <input
          id="phone-number"
          type="tel"
          name="contact_number"
          placeholder="Enter contact number"
          value={formData.contact_number}
          onChange={handleChange}
          required
        />

        <label htmlFor="email-id">Email ID</label>
        <input
          id="email-id"
          type="email"
          name="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Request Ambulance</button>
      </form>
    </main>
  );
}

export default Ambulance;
