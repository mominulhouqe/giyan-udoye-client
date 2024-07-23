import { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import BookCard from "./BookCard";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books"); // Fetch all books

        // Filter out only the featured books
        const featuredBooks = response.data.filter((book) => book.featured); // Adjust property based on your data
        setBooks(featuredBooks);
      } catch (error) {
        console.error("Error fetching books:", error); // Log error for debugging
        message.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <Spin tip="Loading featured books..." />;
  }

  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-3xl text-center font-bold mb-8">Featured Books</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2} // Show 3 slides at a time
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        breakpoints={{
          // Adjust slidesPerView for different screen sizes
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {books.length > 0 ? (
          books.map((book) => (
            <SwiperSlide key={book._id}>
              <BookCard   
                title={book.title}
                author={book.author}
                description={book.description}
                image={book.image} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-center">No featured books available</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default FeaturedBooks;
