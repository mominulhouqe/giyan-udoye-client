import DonationPage from "../../Components/DonationPage";
import FeaturedBooks from "../../Components/FeaturedBooks";
import Hero from "../../Components/Hero";
import Testimonials from "../../Components/Testimonials";

import Books from "./Books/Books";
import LastPage from "./lastPage";

const Home = () => {
  return (
    <div className="container mx-auto ">
      <Hero />
      <Books />
      <FeaturedBooks />
     <LastPage />
      <Testimonials />
      <DonationPage />
    </div>
  );
};

export default Home;
