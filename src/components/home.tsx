import "../App.css";
import "../css/style.css";
import { Link } from "react-router-dom";

function Home() {

    const user = JSON.parse(sessionStorage.getItem("user") || "null");

    return (

        <section id="home">

            {
                user && (
                    <h2>
                        Welcome, {user.name}
                    </h2>
                )
            }

            <h1 className="h-primary">
                Welcome to MediSync - A Smart Healthcare Management System
            </h1>

            <p>
                MediSync is a modern healthcare management system that connects patients, 
                doctors, hospitals, and administrators through one intelligent digital platform. 
                Our mission is to make healthcare faster, smarter, and more accessible by replacing 
                traditional paper-based processes with secure digital solutions.
                Whether you're scheduling an appointment, accessing medical records, or managing hospital operations, 
                MediSync provides a reliable and user-friendly experience.
            </p>

            <Link
                to="/book-demo"
                className="btn"
            >
                Book a Demo
            </Link>

        </section>

    );
}

export default Home;