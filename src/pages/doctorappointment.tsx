import { useNavigate } from "react-router-dom";
import ananya from "../images/ananya.jpeg";
import rohan from "../images/rohan.jpeg";
import rajeev from "../images/doc.jpeg";
import rajat from "../images/rajat.jpeg";
import "../css/doctorappointment.css";

function DoctorAppointment() {
    const navigate = useNavigate();

    return (
        <main className="appointment-page">
            <section className="appointment-panel" aria-labelledby="appointment-heading">
                <p className="appointment-page__eyebrow">MediSync Care</p>
                <h1 id="appointment-heading">Doctor details</h1>
                <p className="appointment-page__intro">Choose a qualified doctor and request an appointment with their clinic.</p>

                <div className="doctor-container">
                    <article className="doctor-card">
                        <img className="doctor-card__image" src={ananya} alt="Dr. Ananya Sharma" />
                        <div className="doctor-card__content">
                            <h2>Dr. Ananya Sharma</h2>
                            <p className="doctor-card__specialty">Cardiologist</p>
                            <div className="doctor-details">
                                <p><strong>Experience:</strong> 12 years</p>
                                <p><strong>Qualification:</strong> MBBS,MD (Cardiology)</p>
                                <p><strong>Clinic name:</strong> MediSync Heart Care Clinic</p>
                                <p><strong>Clinic address:</strong> 42 Park Street, Kolkata, West Bengal-700016</p>
                                <p><strong>Phone number:</strong>+91 98765 43210</p>
                                <p><strong>Available:</strong> Mon–Sat, 10:00 AM-10:00 PM</p>
                            </div>
                            <button className="doctor-book-button" type="button" onClick={() => navigate("/book-appointment")}>Book Appointment</button>
                        </div>
                    </article>
                </div>
                <div className="doctor-container">
                    <article className="doctor-card">
                        <img className="doctor-card__image" src={rohan} alt="Dr. Rohan Mehta" />
                        <div className="doctor-card__content">
                            <h2>Dr. Rohan Mehta</h2>
                            <p className="doctor-card__specialty">Neurologist</p>
                            <div className="doctor-details">
                                <p><strong>Experience:</strong> 15 years</p>
                                <p><strong>Qualification:</strong> MBBS, MD (Pediatrics),DNB (Neurology)</p>
                                <p><strong>Clinic name:</strong> Solaris Hospital</p>
                                <p><strong>Clinic address:</strong> Mithakhali,Navrangpura,Ahmedabad,Gujarat</p>
                                <p><strong>Phone Number:</strong> +91 98765 43211</p>
                                <p><strong>Available:</strong> Mon–Sun, 10:00 AM–11:00 PM</p>
                            </div>
                            <button className="doctor-book-button" type="button" onClick={() => navigate("/book-appointment")}>Book Appointment</button>
                        </div>
                    </article>
                </div>
                <div className="doctor-container">
                    <article className="doctor-card">
                        <img className="doctor-card__image" src={rajeev} alt="Dr. Rajeev Maheshwari" />
                        <div className="doctor-card__content">
                            <h2>Dr. Rajeev Maheshwari</h2>
                            <p className="doctor-card__specialty">Orthopedic</p>
                            <div className="doctor-details">
                                <p><strong>Experience:</strong> 42 years</p>
                                <p><strong>Qualification:</strong> MBBS,MS - Orthopaedic</p>
                                <p><strong>Clinic name:</strong> Maheshwari bone clinic</p>
                                <p><strong>Clinic address:</strong> C-1/14, Pvr road, Prashant Vihar, Sector 14, Rohini, Delhi, 110085</p>
                                <p><strong>Phone Number:</strong> 088606 37274</p>
                                <p><strong>Available:</strong> Mon–Sun, 6:00 AM–8:30 PM</p>
                            </div>
                            <button className="doctor-book-button" type="button" onClick={() => navigate("/book-appointment")}>Book Appointment</button>
                        </div>
                    </article>
                </div>
                <div className="doctor-container">
                    <article className="doctor-card">
                        <img className="doctor-card__image" src={rajat} alt="Dr. Rajat Gupta" />
                        <div className="doctor-card__content">
                            <h2>Dr. Rajat Gupta</h2>
                            <p className="doctor-card__specialty">Plastic Surgeon</p>
                            <div className="doctor-details">
                                <p><strong>Experience:</strong> 16 years</p>
                                <p><strong>Qualification:</strong> MBBS,MS in General Surgery,DNB in General Surgery</p>
                                <p><strong>Clinic name:</strong> Fortis Hospital</p>
                                <p><strong>Clinic address:</strong> Cabin no- 444, AA-299, Shaheed Udham Singh Marg, AA Block, Poorbi Shalimar Bagh, Shalimar Bagh, New Delhi, Delhi, 110088</p>
                                <p><strong>Phone Number:</strong> 084483 39575</p>
                                <p><strong>Available:</strong> Mon–Sun, 9:00 AM–10:00 PM</p>
                            </div>
                            <button className="doctor-book-button" type="button" onClick={() => navigate("/book-appointment")}>Book Appointment</button>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default DoctorAppointment;
