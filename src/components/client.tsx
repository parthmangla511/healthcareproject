import '../App.css';
import '../css/style.css';

import aiims from "../images/aiims.jpeg";
import doctor from "../images/doc.jpeg";
import appollo from "../images/appollo.jpeg";
import max from "../images/max.jpeg";
import fortis from "../images/fortis.jpeg";
import plus from "../images/plus.jpeg";

function Client(){
    return(
      <section id="client-section">
            <h1 className="h-primary center">Our Clients</h1>
            <div id="clients">
                <div className="client-item">
                    <img src={aiims} alt="Our Client" />
                </div>
                <div className="client-item">
                    <img src={doctor} alt="Our Client" />
                </div>
                <div className="client-item">
                    <img src={appollo} alt="Our Client" />
                </div>
                <div className="client-item">
                    <img src={max} alt="Our Client" />
                </div>
                <div className='client-item'>
                    <img src={fortis} alt='Our Client'/>
                </div>
                <div className='client-item'>
                    <img src={plus} alt='Our Client'/>
                </div>
            </div>
        </section>  
    );
}

export default Client;