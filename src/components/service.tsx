import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/style.css';

import doctors from '../images/doctor.jpeg';
import pharmacy from '../images/pharmacy.jpeg';
import testing from '../images/labtest.jpeg';
import ambulance from '../images/ambulance.jpeg';
import service from '../images/service.jpeg';
import vaccine from '../images/vaccine.jpeg';
import airplane from "../images/airplane.jpeg";

type ServiceItem = {
    _id?: string;
    title: string;
    category: string;
    description: string;
    doctors?: Array<{ name: string; profession: string; experience: number }>;
};

const serviceImages: Record<string, string> = {
    doctor: doctors,
    pharmacy: pharmacy,
    'lab-test': testing,
    ambulance: ambulance,
    hospital: service,
    vaccination: vaccine,
    airplane: airplane,
};

function Service() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/services')
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((error) => console.error('Failed to load services:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="services-container">
            <h1 className="h-primary center">Our Services</h1>
            <div id="services">
                {loading ? (
                    <p className="center">Loading services...</p>
                ) : (
                    services.map((item) => (
                        <div className="box" key={item._id || item.title}>
                            <img src={serviceImages[item.category] || service} alt={item.title} />
                            <h2 className="h-secondary center">{item.title}</h2>
                            <p className="center">{item.description}</p>
                            <Link to={`/services/${item.category}`}>View Details</Link>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default Service;