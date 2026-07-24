import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>

      <h1>Healthcare Services</h1>

      <button
        onClick={() => navigate("/doctor-appointment")}
      >
        Doctor Appointment Booking
      </button>

    </div>
  );
};

export default Home;