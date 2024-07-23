import { Carousel } from "antd";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Fazly Rabby",
    feedback: "Great library with a vast collection of books.",
  },
  {
    id: 2,
    name: "Abdullah",
    feedback: "A wonderful resource for Islamic literature.",
  },
];

const Testimonials = () => (
  <div className="py-12 bg-gray-100">
    <hr className="my-4"/>
    <h2 className="text-3xl text-center font-bold mb-8 underline">What Our Users Say</h2>
    <Carousel autoplay>
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="p-6"
        >
          <p className="text-xl">{testimonial.feedback}</p>
          <p className="mt-4 text-right">- {testimonial.name}</p>
        </motion.div>
      ))}
    </Carousel>
  </div>
);

export default Testimonials;
