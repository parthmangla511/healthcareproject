import { FormEvent, useState } from "react";
import "../css/labtesting.css";

type LabTestingFormData = {
    name: string;
    age: string;
    testType: string;
    appointmentDate: string;
    appointmentTime: string;
    contactNumber: string;
    email: string;
};

function LabTesting() {
    const [formData, setFormData] = useState<LabTestingFormData>({
        name: "",
        age: "",
        testType: "",
        appointmentDate: "",
        appointmentTime: "",
        contactNumber: "",
        email: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/lab-tests", {
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
                    testType: "",
                    appointmentDate: "",
                    appointmentTime: "",
                    contactNumber: "",
                    email: "",
                });
                setMessage(data.message || "Lab test booking submitted successfully.");
            } else {
                setMessage(data.message || "Unable to book lab test right now.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Server error. Please try again later.");
        }
    };

    return(
        <main className="labtesting-page">
            <form className="labtesting-form" onSubmit={handleSubmit}>
                <h1>Lab Testing Booking</h1>
                <p>Please provide your information to schedule a lab test appointment.</p>
                <label htmlFor="patient-name">Patient Name</label>
                <input id="patient-name" type="text" name="name" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} required/>
                <label htmlFor="patient-age">Age</label>
                <input id="patient-age" type="number" name="age" placeholder="Enter Your Age" value={formData.age} onChange={handleChange} required/>
                <label htmlFor="lab-test-select">Select Lab Test</label>
                <select id="lab-test-select" name="testType" value={formData.testType} onChange={handleChange} required>
                    <option value="">Select Lab test</option>
                    <option value="Blood Test">Blood Tests</option>
                    <option value="Urine Tests">Urine Tests</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Thyroid Tests">Thyroid Tests</option>
                    <option value="Heart Health Tests">Heart Health Tests</option>
                    <option value="Hormone Tests">Hormone Tests</option>
                    <option value="Infection Tests">Infection Tests</option>
                    <option value="Cancer Screening Tests">Cancer Screening Tests</option>
                    <option value="Allergy Tests">Allergy Tests</option>
                    <option value="Full Body Check-up Packages">Full Body Check-up Packages</option>
                </select>
                <label htmlFor="appointment-date">Appointment Date</label>
                <input id="appointment-date" type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required/>
                <label htmlFor="appointment-time">Appointment Time</label>
                <input id="appointment-time" type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required/>
                <label htmlFor="contact-number">Contact Number</label>
                <input id="contact-number" type="tel" name="contactNumber" placeholder="Enter Contact Number" value={formData.contactNumber} onChange={handleChange} required/>
                <label htmlFor="email-id">Email ID</label>
                <input id="email-id" type="email" name="email" placeholder="Enter Email Address" value={formData.email} onChange={handleChange} required/>
                {message ? <p className="labtesting-form__message">{message}</p> : null}
                <button type="submit">Book It</button>
            </form>
        </main>
    );
}

export default LabTesting;