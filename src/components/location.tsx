function Location(){
    return(
        <section className="location" id="location">
  <h2>Our Location</h2>
  <p>
    Visit our healthcare center for quality medical services and patient care.
  </p>

  <div className="location-card">
    <h3>Health Care Management System</h3>

    <p>
      📍 123 MediSyn Coorperation., Saket
      <br />
      New Delhi, Delhi - 110001
    </p>

    <p>📞 +91 98765 43210</p>

    <p>✉️ medisynccooperation@gmail.com</p>

    <a
      href="https://maps.google.com/?q=123+Medical+Avenue+New+Delhi"
      target="_blank"
      rel="noopener noreferrer"
      className="location-btn"
    >
      View on Google Maps
    </a>
  </div>
</section>
    );
}

export default Location;