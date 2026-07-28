import '../App.css';
import '../css/style.css';
function Contact(){
    return(
    <section id="contact">
            <h1 className="h-primary center">Contact Us</h1>
            <div id="contact-box">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" placeholder="Enter your name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="name" id="email" placeholder="Enter your email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number: </label>
                        <input type="phone" name="name" id="phone" placeholder="Enter your phone" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message: </label>
                        <textarea name="message" id="message" cols={30} rows={10}></textarea>
                    </div>
                    <div className="form-group">
                        <input type="submit"></input>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;