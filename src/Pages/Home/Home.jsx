import FeaturedBooks from "../../Components/FeaturedBooks";
import Footer from "../../Components/Footer";
import Hero from "../../Components/Hero";
import LibraryStatistics from "../../Components/LibrayStatistics";
import Navbar from "../../Components/Navber";
import RecentAdditions from "../../Components/RecentAdditions";
import Testimonials from "../../Components/Testimonials";
import Books from "../Books/Books";
import Profile from "../Profile/Profile";

const Home = () => {

    
  return (
    <div className="p-6">

      <Hero />

      <Books />
      <FeaturedBooks />
      <RecentAdditions />
    {/* <LibraryStatistics />
    <Testimonials /> */}
      <Footer />
    </div>
  );
};

export default Home;
