import { FormEvent, useMemo, useState } from "react";
import "../css/doctorappointment.css";

function BookAppointment() {
    const dateOptions = useMemo(() => {
        const options = [];
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

    const [formData, setFormData] = useState({
        name: "",
        appointmentDate: dateOptions[0]?.value || "",
        appointmentType: "Hospital Visit",
        slot: "",
    });
    const [message, setMessage] = useState("");
    const [submittedAppointment, setSubmittedAppointment] = useState<{
        name: string;
        appointmentDate: string;
        appointmentType: string;
        slot: string;
        ticketNumber: string;
    } | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmittedAppointment({
                    name: formData.name,
                    appointmentDate: formData.appointmentDate,
                    appointmentType: formData.appointmentType,
                    slot: formData.slot,
                    ticketNumber: data.ticketNumber,
                });
                setMessage(data.message || "Slot booked successfully.");
                setFormData({
                    name: "",
                    appointmentDate: "",
                    appointmentType: "Hospital Visit",
                    slot: "",
                });
            } else {
                setMessage(data.message || "Unable to reserve slot.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <main className="appointment-page">
            <form className="appointment-form" onSubmit={handleSubmit}>
                <h1>Schedule a visit slot</h1>
                <p className="appointment-intro">
                    Choose a hospital visit or video consult slot and raise a ticket for your request.
                    This is an alternative to a traditional appointment booking flow.
                </p>
                <label htmlFor="patient-name">Your name</label>
                <input
                    id="patient-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />
                <label htmlFor="appointment-date">Preferred date</label>
                <select
                    id="appointment-date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                >
                    {dateOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <label htmlFor="appointment-type">Choose slot type</label>
                <select
                    id="appointment-type"
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleChange}
                    required
                >
                    <option value="Hospital Visit">Hospital Visit</option>
                    <option value="Video Consultation">Video Consultation</option>
                </select>
                <label htmlFor="appointment-slot">Choose available slot</label>
                <select
                    id="appointment-slot"
                    name="slot"
                    value={formData.slot}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a slot</option>
                    <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                    <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM</option>
                    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                    <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                    <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                </select>
                <br />
                <button type="submit">Reserve slot</button>
                {message && <p className="appointment-message" role="status">{message}</p>}
                {submittedAppointment && (
                    <section className="appointment-summary" aria-live="polite">
                        <h2>Ticket details</h2>
                        <p><strong>Ticket:</strong> {submittedAppointment.ticketNumber}</p>
                        <p><strong>Name:</strong> {submittedAppointment.name}</p>
                        <p><strong>Date:</strong> {submittedAppointment.appointmentDate}</p>
                        <p><strong>Type:</strong> {submittedAppointment.appointmentType}</p>
                        <p><strong>Slot:</strong> {submittedAppointment.slot}</p>
                    </section>
                )}
            </form>
        </main>
    );
}

export default BookAppointment;
