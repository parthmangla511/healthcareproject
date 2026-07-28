function Review(){
    return(
    <section className="reviews" id="reviews">
        <h2>Reviews</h2>
    <h2>What Our Patients Say</h2>
    <p className="subtitle">Trusted by thousands of patients and healthcare professionals.</p>

    <div className="review-container">

        <div className="review-card">
            <img src="https://i.pravatar.cc/100?img=5" alt="Patient" />
            <h3>Sarah Johnson</h3>
            <div className="stars">★★★★★</div>
            <p>
                The Health Care Management System made booking appointments and accessing my medical records incredibly easy. The interface is user-friendly and secure.
            </p>
        </div>

        <div className="review-card">
            <img src="https://i.pravatar.cc/100?img=15" alt="Doctor" />
            <h3>Dr. Michael Brown</h3>
            <div className="stars">★★★★★</div>
            <p>
                Managing patient records, prescriptions, and appointments has never been easier. It saves valuable time and improves patient care.
            </p>
        </div>

        <div className="review-card">
            <img src="https://i.pravatar.cc/100?img=25" alt="Patient" />
            <h3>Emily Wilson</h3>
            <div className="stars">★★★★☆</div>
            <p>
                I love receiving appointment reminders and digital prescriptions. The platform is reliable, fast, and convenient for everyday healthcare needs.
            </p>
        </div>

    </div>
</section>
);
}

export default Review;