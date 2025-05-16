import Contact from "../../features/landing/contact";
import Footer from "../../features/landing/footer";
import Home from "../../features/landing/home";
import Navbar from "../../features/landing/navbar";
import FeaturesSection from "../../features/landing/why";

const Landing = () => {
  return (
    <div className="tracking-wider">
      <Navbar />
      <Home />
      <Contact />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Landing;
