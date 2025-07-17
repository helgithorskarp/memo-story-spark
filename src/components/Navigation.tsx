
import React, { useState } from 'react';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import AddChildModal from './AddChildModal';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { selectedChild, getCartItemCount } = useApp();
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Books', action: () => onNavigate('books') },
    { label: 'Add a Child', action: () => setIsAddChildModalOpen(true) },
    { label: 'How It Works', action: () => onNavigate('how-it-works') },
    { label: 'FAQ', action: () => onNavigate('faq') }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate('hero')}
            >
              <div className="text-2xl font-bold text-gray-800 font-nunito">
                <span className="text-orange-500">Me</span>
                <span className="text-blue-500">Mo</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {selectedChild && (
                <div className="hidden sm:flex items-center space-x-2 bg-memo-cream px-3 py-1 rounded-full">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {selectedChild.name}
                  </span>
                </div>
              )}
              
              <button 
                className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => onNavigate('cart')}
              >
                <ShoppingCart className="w-6 h-6" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                {selectedChild && (
                  <div className="flex items-center space-x-2 bg-memo-cream px-3 py-2 rounded-lg">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Starring: {selectedChild.name}
                    </span>
                  </div>
                )}
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-gray-900 font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AddChildModal 
        isOpen={isAddChildModalOpen}
        onClose={() => setIsAddChildModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
