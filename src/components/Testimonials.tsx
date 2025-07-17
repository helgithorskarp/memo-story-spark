
import React from 'react';
import { Star, Quote, Shield, Leaf, Heart } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Mother of 2',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=100&h=100&fit=crop&crop=face',
      quote: 'My daughter Emma absolutely loves seeing herself as the main character. The quality is amazing and the stories are beautifully written!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Father of 1',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      quote: 'We\'ve bought 5 different books now. Alex gets so excited every time we read about his adventures. Worth every penny!',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Grandmother',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      quote: 'Perfect gift for my grandson. The hardcover quality is exceptional and he treasures his personalized story book.',
      rating: 5
    }
  ];

  const trustBadges = [
    {
      icon: Shield,
      title: 'GDPR Compliant',
      description: 'Photos deleted upon request'
    },
    {
      icon: Leaf,
      title: 'FSC Paper',
      description: 'Sustainably sourced materials'
    },
    {
      icon: Heart,
      title: '50K+ Happy Kids',
      description: 'Trusted by families worldwide'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-nunito">
            What Parents
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500"> Say</span>
          </h2>
          <p className="text-xl text-gray-600 font-poppins max-w-3xl mx-auto">
            Real families sharing their MeMo moments
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-memo-cream rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-orange-500 mb-4" />
              
              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 font-poppins leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="bg-memo-blue/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center font-nunito">
            Why Parents Trust MeMo
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <badge.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 font-nunito">{badge.title}</h4>
                  <p className="text-sm text-gray-600 font-poppins">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-memo-peach to-memo-blue rounded-2xl p-8 inline-block max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-nunito">
              Get New Stories First
            </h3>
            <p className="text-gray-700 mb-6 font-poppins">
              Be the first to know when we release new personalized stories and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
