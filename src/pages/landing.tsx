import Contact from "../features/landing/contact";
import Home from "../features/landing/home";
import Navbar from "../features/landing/navbar";
import FeaturesSection from "../features/landing/why";

const Landing = () => {
  return (
    <div className="tracking-wider">
      <Navbar />
      <Home />
      <Contact />
      <FeaturesSection />
    </div>
  );
};

export default Landing;
