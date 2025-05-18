import ImageCarousel from "@/features/landing/home-carousel";

import Contact from "../../features/landing/contact";
import Footer from "../../features/landing/footer";
import Navbar from "../../features/landing/navbar";
import FeaturesSection from "../../features/landing/why";

const Landing = () => {
  return (
    <div className="tracking-wider">
      <Navbar />
      <ImageCarousel />
      <Contact />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Landing;
