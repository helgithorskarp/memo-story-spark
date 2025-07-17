
import React, { useRef } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BookGallery from '@/components/BookGallery';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    let targetRef;
    
    switch (section) {
      case 'hero':
        targetRef = heroRef;
        break;
      case 'books':
        targetRef = booksRef;
        break;
      case 'how-it-works':
        targetRef = howItWorksRef;
        break;
      case 'faq':
        targetRef = faqRef;
        break;
      case 'cart':
        // Handle cart navigation - could open a modal or navigate to cart page
        console.log('Navigate to cart');
        return;
      default:
        return;
    }

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Navigation onNavigate={handleNavigate} />
        
        <div ref={heroRef}>
          <Hero onNavigate={handleNavigate} />
        </div>
        
        <div ref={booksRef}>
          <BookGallery />
        </div>
        
        <div ref={howItWorksRef}>
          <HowItWorks />
        </div>
        
        <Testimonials />
        
        <div ref={faqRef}>
          <FAQ />
        </div>
        
        <Footer />
      </div>
    </AppProvider>
  );
};

export default Index;
