import '../App.css';
import '../css/style.css';
import { useNavigate } from "react-router-dom";

import doctors from '../images/doctor.jpeg';
import pharmacy from '../images/pharmacy.jpeg';
import testing from '../images/labtest.jpeg';
import ambulance from '../images/ambulance.jpeg';
import service from '../images/service.jpeg';
import vaccine from '../images/vaccine.jpeg';
import airplane from "../images/airplane.jpeg";

function Service() {
    return (
        <section className="services-container">
            <h1 className="h-primary center">Our Services</h1>
            <div id="services">
                <div className="box">
                    <img src={doctors} alt="Doctor Appointment" />
                    <h2 className="h-secondary center">
                        Doctor Appointment Booking and Details
                    </h2>
                    <p className="center">
                        Book appointments with qualified healthcare professionals quickly and conveniently 
                        through MediSync. Patients can browse available doctors by specialty, view their 
                        schedules, and select a preferred date and time. The system sends instant booking 
                        confirmations and appointment reminders, helping reduce missed visits and making 
                        healthcare more accessible.
                    </p>
                </div>
                <div className="box">
                    <img src={pharmacy} alt="Pharmacy" />
                    <h2 className="h-secondary center">
                        Pharmacy
                    </h2>
                    <p className="center">
                        The Pharmacy Management module in MediSync simplifies the process of managing medicines, 
                        prescriptions, and inventory. Patients can easily view prescribed medicines, while 
                        pharmacists can efficiently dispense medications, monitor stock levels, and maintain 
                        accurate records. This ensures timely medicine availability, reduces errors, and 
                        improves overall healthcare services.
                    </p>
                </div>
                <div className="box">
                    <img src={testing} alt="Lab Testing" />
                    <h2 className="h-secondary center">
                        Lab Testing Booking
                    </h2>
                    <p className="center">
                        The Lab Testing Booking module in MediSync allows patients to schedule diagnostic
                         tests quickly and conveniently. Patients can choose from a wide range of 
                         laboratory tests, select their preferred date and time, and receive booking 
                         confirmations instantly. The system also enables doctors to review test results
                         digitally, ensuring faster diagnosis and better patient care.
                    </p>
                </div>
                <div className="box">
                    <img src={ambulance} alt="Ambulance service" />
                    <h2 className="h-secondary center">
                        Ambulance Booking
                    </h2>
                    <p className="center">
                        Need immediate medical assistance? Our 24/7 ambulance service ensures rapid response, 
                        GPS-enabled tracking, trained paramedics, and safe transportation to the nearest healthcare 
                        facility. Book an ambulance instantly during medical emergencies with just one click.
                        Fast, reliable, and fully equipped ambulances available 24/7 for emergency 
                        medical transportation. Our experienced medical staff ensure timely care and 
                        safe hospital transfers.
                    </p>
                </div>
                <div className="box">
                    <img src={service} alt="Ambulance service" />
                    <h2 className="h-secondary center">
                        Nearest Hospital and service
                    </h2>
                    <p className="center">
                        Find nearby hospitals and clinics easily with location-based search. 
                        Get details about healthcare centers, available doctors, emergency services, 
                        timings, and contact information.
                    </p>
                </div>
                <div className="box">
                    <img src={vaccine} alt="Vaccination service" />
                    <h2 className="h-secondary center">
                        Vaccination Service
                    </h2>
                    <p className="center">
                        Get easy access to vaccination services with MediSync.
                        Find available vaccines, nearby vaccination centers, schedule appointments, 
                        and maintain your vaccination records digitally.
                    </p>
                </div>
                <div className="box">
                    <img src={airplane} alt="Vaccination service" />
                    <h2 className="h-secondary center">
                        Airplane Service
                    </h2>
                    <p className="center">
                        A flight booking system that allows passengers to reserve airline tickets 
                        while providing quick assistance during medical emergencies. 
                        It includes features like emergency medical requests, priority support, 
                        ambulance coordination, and notifying airport/airline medical teams to ensure
                        passenger safety.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Service;