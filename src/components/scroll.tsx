import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {

    if (location.hash) {
      const element = document.getElementById(
        location.hash.replace("#", "")
      );

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth"
          });
        }, 100);
      }
    }
    else {
      window.scrollTo(0,0);
    }

  }, [location]);

  return null;
}

export default ScrollToSection;