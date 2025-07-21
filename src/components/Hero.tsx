
import React, { useState } from 'react';
import { BookOpen, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddChildModal from './AddChildModal';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-memo-cream via-white to-memo-blue/20 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
                <Sparkles className="w-8 h-8 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
                  Personalized Stories
                </span>
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 font-nunito leading-tight">
                Every Moment Is Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                  Child's Story
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 font-poppins leading-relaxed">
                Add your little hero, pick a tale, choose e‑book or hardcover.
                <br />
                <span className="font-semibold text-gray-700">
                  Watch them become the star of their own adventure.
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => onNavigate('books')}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Books
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-full transition-all duration-300"
                  onClick={() => setIsAddChildModalOpen(true)}
                >
                  <Star className="w-5 h-5 mr-2" />
                  Add My Child
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-memo-peach/40 to-memo-blue/40 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/lovable-uploads/501be7b5-eff5-455c-9cd4-4be6507cf2fb.png"
                    alt="Elsa from Frozen - example of personalized storybook"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6 bg-gradient-to-r from-memo-peach to-memo-blue">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-nunito">
                      "Once upon a time, [Your Child's Name] discovered..."
                    </h3>
                    <p className="text-gray-700 font-poppins">
                      Every story becomes uniquely theirs ✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
              <div className="absolute -bottom-8 -left-4 w-16 h-16 bg-pink-300 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-memo-peach/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-memo-blue/20 rounded-full blur-3xl"></div>
      </section>

      <AddChildModal 
        isOpen={isAddChildModalOpen}
        onClose={() => setIsAddChildModalOpen(false)}
      />
    </>
  );
};

export default Hero;
