
import React from 'react';
import { UserPlus, BookOpen, ShoppingCart, Sparkles } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Add Your Child',
      description: 'Upload a photo and tell us about your little hero - their name, pronouns, and favorite color.',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: BookOpen,
      title: 'Pick a Story',
      description: 'Browse dozens of beautifully written tales across different themes and age ranges.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShoppingCart,
      title: 'Choose Your Format',
      description: 'Select between an instant e-book download or a premium hardcover keepsake.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-memo-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Simple Process
            </span>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-nunito">
            How It
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500"> Works</span>
          </h2>
          
          <p className="text-xl text-gray-600 font-poppins max-w-3xl mx-auto">
            Creating personalized stories for your child is as easy as 1, 2, 3.
            <br />
            <span className="font-semibold text-gray-700">
              Start building magical memories in minutes.
            </span>
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                {index + 1}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-4 font-nunito">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 font-poppins leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-pink-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-nunito">
              Ready to Create Magic?
            </h3>
            <p className="text-gray-600 mb-6 font-poppins">
              Join thousands of families creating personalized stories together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Your Story
              </button>
              <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all duration-300">
                See Examples
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
