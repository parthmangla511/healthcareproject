import { useState } from "react";
import "../css/vaccination.css";

type VaccinationFormData = {
  name: string;
  age: string;
  address: string;
  email: string;
  phoneNumber: string;
};

function Vaccination(){
    const [formData, setFormData] = useState<VaccinationFormData>({
        name: "",
        age: "",
        address: "",
        email: "",
        phoneNumber: "",
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
          const response = await fetch("http://localhost:5000/api/vaccinations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              age: Number(formData.age),
              contact_number: formData.phoneNumber,
            }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setFormData({
              name: "",
              age: "",
              address: "",
              email: "",
              phoneNumber: "",
            });
            setStatusMessage(data.message || "Vaccination request submitted successfully.");
          } else {
            setStatusMessage(data.message || "Unable to book vaccination right now.");
          }
        } catch (error) {
          console.error(error);
          setStatusMessage("Server error. Please try again later.");
        }
      };
    return(
        <main className="vaccination-page">
            <form className="vaccination-form" onSubmit={handleSubmit}>
                <p className="vaccination-form__eyebrow">Vaccination Service</p>
                <h1>Book a Vaccination</h1>
                <p className="vaccination-form__intro">Share the patient details to request a vaccination appointment.</p>
                <label htmlFor="patient-name">Patient Name:</label>
                <input id="patient-name" 
                type="text" name="name" 
                placeholder="Enter the patient name" 
                value={formData.name} onChange={handleChange} required />
                <label htmlFor="patient-age">Age:</label>
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
                <label htmlFor="patient-address">Address:</label>
                <input
          id="address"
          type="text"
          name="address"
          placeholder="Enter address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <label htmlFor="patient-email">Email ID:</label>
        <input
          id="patient-email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="patient-phone">Phone Number:</label>
        <input
          id="patient-phone"
          type="tel"
          name="phoneNumber"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        {statusMessage ? <p className="vaccination-form__status">{statusMessage}</p> : null}
        <button type="submit">Request Vaccination</button>
            </form>
        </main>
    );
}

export default Vaccination;
