import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import BookCard from "./BookCard";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://giyan-udoye.vercel.app/api/v1/books"
        );
        const featuredBooks = response.data.filter((book) => book.featured);
        setBooks(featuredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        message.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading featured books..." />
      </div>
    );
  }

  return (
    <div className="p-4 border-b  border-gray-300">
      <h2 className="text-2xl md:text-4xl text-center font-bold mb-6 md:mb-12 text-indigo-800 relative">
        <span className="relative z-10">Featured Books</span>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-1 bg-yellow-400"></span>
      </h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
      >
        {books.length > 0 ? (
          books.map((book) => (
            <SwiperSlide
              key={book._id}
              className="w-full sm:w-64 md:w-72 lg:w-80 xl:w-96"
            >
              <div className="p-2 md:p-4 transform transition duration-500 hover:scale-105">
                <BookCard
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  image={book.image}
                  id={book._id}
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-center text-lg md:text-xl text-gray-600">
              No featured books available
            </p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default FeaturedBooks;
