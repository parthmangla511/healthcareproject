import { useMemo, useState } from "react";
import "../css/vaccination.css";

type VaccinationFormData = {
  name: string;
  age: string;
  appointmentDate: string;
  appointmentType: string;
  slot: string;
  address: string;
  email: string;
  phoneNumber: string;
};

function Vaccination(){
    const dateOptions = useMemo(() => {
        const options: { value: string; label: string }[] = [];
        const now = new Date();
        for (let i = 0; i < 7; i += 1) {
            const date = new Date(now);
            date.setDate(now.getDate() + i);
            const value = date.toISOString().slice(0, 10);
            const label = date.toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
            });
            options.push({ value, label });
        }
        return options;
    }, []);

    const [formData, setFormData] = useState<VaccinationFormData>({
        name: "",
        age: "",
        appointmentDate: dateOptions[0]?.value || "",
        appointmentType: "Center Visit",
        slot: "",
        address: "",
        email: "",
        phoneNumber: "",
      });
      const [statusMessage, setStatusMessage] = useState("");
      const [ticket, setTicket] = useState<string | null>(null);
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
              name: formData.name,
              age: Number(formData.age),
              appointmentDate: formData.appointmentDate,
              appointmentType: formData.appointmentType,
              slot: formData.slot,
              address: formData.address,
              email: formData.email,
              contact_number: formData.phoneNumber,
            }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setFormData({
              name: "",
              age: "",
              appointmentDate: dateOptions[0]?.value || "",
              appointmentType: "Center Visit",
              slot: "",
              address: "",
              email: "",
              phoneNumber: "",
            });
            setStatusMessage(data.message || "Vaccination slot reserved successfully.");
            setTicket(data.ticketNumber || null);
          } else {
            setStatusMessage(data.message || "Unable to reserve vaccination slot right now.");
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
                <h1>Book a Vaccination Slot</h1>
                <p className="vaccination-form__intro">Share the patient details and choose a slot to reserve your vaccination.</p>
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
                <label htmlFor="appointment-date">Preferred date</label>
                <select id="appointment-date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required>
                    {dateOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label htmlFor="appointment-type">Choose type</label>
                <select id="appointment-type" name="appointmentType" value={formData.appointmentType} onChange={handleChange} required>
                    <option value="Center Visit">Center Visit</option>
                    <option value="Home Visit">Home Visit</option>
                </select>
                <label htmlFor="appointment-slot">Choose available slot</label>
                <select id="appointment-slot" name="slot" value={formData.slot} onChange={handleChange} required>
                    <option value="">Select a slot</option>
                    <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                    <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM</option>
                    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                    <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                </select>
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
        <button type="submit">Reserve Vaccination Slot</button>
        {ticket && (
            <section className="appointment-summary" aria-live="polite">
                <h2>Ticket details</h2>
                <p><strong>Ticket:</strong> {ticket}</p>
            </section>
        )}
            </form>
        </main>
    );
}

export default Vaccination;
