import { Carousel, Rate } from "antd";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Fazly Rabby",
    feedback:
      "Great library with a vast collection of books. The interface is user-friendly and the search functionality is excellent.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Abdullah",
    feedback:
      "A wonderful resource for Islamic literature. I've found rare books here that I couldn't find anywhere else.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Atikur Rahman",
    feedback:
      "The coaching center has been instrumental in my Islamic studies. The teachers are knowledgeable and supportive.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 4,
    name: "Mohammed Ali",
    feedback:
      "I love the blog section. It's always updated with insightful articles on various Islamic topics.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const Testimonials = () => (
  <div className="p-4 border-b  border-gray-300">
    <h2 className="text-3xl text-center font-bold mb-8 text-indigo-800">
      What Our Users Say
    </h2>

    <Carousel autoplay effect="fade" className="max-w-3xl mx-auto">
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 bg-white rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-indigo-700">
                {testimonial.name}
              </h3>
              <Rate
                disabled
                defaultValue={testimonial.rating}
                className="text-yellow-500"
              />
            </div>
          </div>
          <p className="text-lg text-gray-700 italic">
            &ldquo;{testimonial.feedback}&rdquo;
          </p>
        </motion.div>
      ))}
    </Carousel>
  </div>
);

export default Testimonials;
