import DonationPage from "../../Components/DonationPage";
import FeaturedBooks from "../../Components/FeaturedBooks";
import Footer from "../../Components/Footer";
import Hero from "../../Components/Hero";
import Testimonials from "../../Components/Testimonials";
import Books from "./Books/Books";

const Home = () => {
  return (
    <div className="container mx-auto ">
      <Hero />
      <Books />
      <FeaturedBooks />
      <Testimonials />
      <DonationPage />
    </div>
  );
};

export default Home;
