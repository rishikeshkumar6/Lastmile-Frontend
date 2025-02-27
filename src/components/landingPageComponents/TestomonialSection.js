import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "Operations Manager, TrendMart",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    content:
      "Since implementing this platform, our order tracking efficiency has improved by 60%. The detailed order information has significantly reduced customer inquiries about shipping status.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    position: "E-commerce Director, FashionHub",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    content:
      "The advanced operational insights have transformed our logistics operations. We've reduced delivery errors by 45% and improved customer satisfaction scores by 38% in just three months.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    position: "Founder, GadgetZone",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    content:
      "The return management system has been a game-changer for our business. We've streamlined the entire process and reduced the time spent on handling returns by 70%.",
    rating: 4,
  },
];

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by E-commerce Sellers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our platform has helped sellers on Flipkart, Amazon, and
            other marketplaces improve their logistics operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600">{testimonial.position}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center bg-indigo-100 px-6 py-3 rounded-full">
            <span className="text-indigo-600 font-medium">
              Join 500+ sellers who have transformed their logistics operations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
