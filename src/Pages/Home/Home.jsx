import FeaturedBooks from "../../Components/FeaturedBooks";
import Footer from "../../Components/Footer";
import Hero from "../../Components/Hero";
import LibraryStatistics from "../../Components/LibrayStatistics";
import Navbar from "../../Components/Navber";
import RecentAdditions from "../../Components/RecentAdditions";
import Testimonials from "../../Components/Testimonials";
import Books from "./Books/Books";
import Profile from "../shared/Profile/Profile";
import Coaching from "./LibrayCoaching/Coaching";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Hero />

      <Books />
      <FeaturedBooks />
      {/* <RecentAdditions /> */}
      <LibraryStatistics />
      <Testimonials />

      <Footer />
    </div>
  );
};

export default Home;
