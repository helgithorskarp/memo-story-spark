import React, { useState } from 'react';
import { X, Star, ShoppingCart, ChevronLeft, ChevronRight, User, Heart } from 'lucide-react';
import { Book } from '@/types';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import AddChildModal from './AddChildModal';

interface BookDetailModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, isOpen, onClose }) => {
  const { selectedChild, addToCart } = useApp();
  const [selectedFormat, setSelectedFormat] = useState<'ebook' | 'hardcover'>('ebook');
  const [quantity, setQuantity] = useState(1);
  const [currentDemoPage, setCurrentDemoPage] = useState(0);
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);

  // Use personalized cover if available, otherwise use default book cover
  const coverImage = selectedChild?.personalizedCovers?.[book.id] || book.cover;
  const demoPages = selectedChild?.personalizedPages?.[book.id] || book.demoPages;

  const handleAddToCart = () => {
    const price = selectedFormat === 'ebook' ? book.price.ebook : book.price.hardcover;
    
    addToCart({
      bookId: book.id,
      format: selectedFormat,
      quantity,
      price
    });

    toast({
      title: "Added to cart!",
      description: `${book.title} (${selectedFormat}) has been added to your cart.`,
    });
  };

  const getPersonalizedText = (text: string) => {
    if (selectedChild) {
      return text.replace(/\[Child's Name\]/g, selectedChild.name)
                 .replace(/\{\{ChildName\}\}/g, selectedChild.name);
    }
    return text;
  };

  const nextDemoPage = () => {
    setCurrentDemoPage((prev) => (prev + 1) % demoPages.length);
  };

  const prevDemoPage = () => {
    setCurrentDemoPage((prev) => (prev - 1 + demoPages.length) % demoPages.length);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="relative">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 font-nunito">
                {selectedChild ? book.title.replace(/\[Child's Name\]/g, selectedChild.name) : book.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Book Cover & Demo */}
                <div className="space-y-6">
                  {/* Book Cover */}
                  <div className="relative">
                    <img
                      src={coverImage}
                      alt={`${book.title} cover`}
                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                    />
                    
                    {/* Personalization indicator */}
                    {selectedChild?.personalizedCovers?.[book.id] && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center space-x-2">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span>Personalized for {selectedChild.name}</span>
                        </span>
                      </div>
                    )}

                    {/* Age and theme badges */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <span className="bg-memo-peach text-gray-800 text-sm font-semibold px-3 py-1 rounded-full block">
                        Ages {book.ageRange}
                      </span>
                      <span className="bg-memo-blue text-gray-800 text-sm font-semibold px-3 py-1 rounded-full block">
                        {book.theme}
                      </span>
                    </div>
                  </div>

                  {/* Demo Preview Carousel */}
                  <div className="bg-memo-cream rounded-2xl p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 font-nunito">
                      Story Preview
                    </h3>
                    <div className="relative">
                      <img
                        src={demoPages[currentDemoPage]}
                        alt={`Demo page ${currentDemoPage + 1}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      
                      {/* Navigation buttons */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevDemoPage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 p-0"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextDemoPage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white h-8 w-8 p-0"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>

                      {/* Page indicators */}
                      <div className="flex justify-center mt-3 space-x-2">
                        {demoPages.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentDemoPage ? 'bg-orange-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-700 font-poppins">
                        {getPersonalizedText(`"And then ${selectedChild ? selectedChild.name : '[Your Child\'s Name]'} discovered that true courage comes from helping others..."`)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Details & Purchase */}
                <div className="space-y-6">
                  {/* Personalization Banner */}
                  <div className={`p-4 rounded-2xl ${selectedChild ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <div className="flex items-center space-x-3">
                      <Heart className={`w-5 h-5 ${selectedChild ? 'text-green-600' : 'text-yellow-600'}`} />
                      <div>
                        {selectedChild ? (
                          <div>
                            <p className="text-green-800 font-semibold">
                              Currently starring: {selectedChild.name}
                            </p>
                            {!selectedChild.personalizedCovers?.[book.id] && (
                              <p className="text-green-700 text-sm mt-1">
                                Want a personalized cover? We can create one with AI!
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="text-yellow-800 font-semibold mb-2">
                              Add a child to personalize this story
                            </p>
                            <Button
                              size="sm"
                              onClick={() => setIsAddChildModalOpen(true)}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            >
                              Add My Child
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 font-nunito">
                      Story Synopsis
                    </h3>
                    <p className="text-gray-600 font-poppins leading-relaxed">
                      {getPersonalizedText(book.synopsis)}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="bg-memo-blue/20 p-4 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 font-nunito">
                      Meet the Author
                    </h3>
                    <div className="flex items-center space-x-3">
                      <img
                        src={book.author.photo}
                        alt={book.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{book.author.name}</h4>
                        <p className="text-sm text-gray-600">{book.author.bio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Options */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 font-nunito">
                      Choose Your Format
                    </h3>
                    
                    <div className="space-y-3 mb-4">
                      <label className="flex items-center space-x-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="format"
                          value="ebook"
                          checked={selectedFormat === 'ebook'}
                          onChange={(e) => setSelectedFormat(e.target.value as 'ebook')}
                          className="text-orange-500"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">E-Book (PDF)</span>
                            <span className="text-xl font-bold text-orange-600">
                              ${book.price.ebook}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Instant download, read on any device
                          </p>
                        </div>
                      </label>
                      
                      <label className="flex items-center space-x-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="format"
                          value="hardcover"
                          checked={selectedFormat === 'hardcover'}
                          onChange={(e) => setSelectedFormat(e.target.value as 'hardcover')}
                          className="text-orange-500"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Physical Hardcover</span>
                            <span className="text-xl font-bold text-orange-600">
                              ${book.price.hardcover}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            High-quality keepsake, ships in 3-5 days
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <label className="text-sm font-medium text-gray-700">Quantity:</label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart - ${selectedFormat === 'ebook' ? book.price.ebook * quantity : book.price.hardcover * quantity}
                    </Button>
                  </div>

                  {/* Reviews */}
                  <div className="bg-memo-cream/50 p-4 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">(127 reviews)</span>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "My daughter absolutely loves seeing herself as the main character. The quality is amazing!"
                    </p>
                    <p className="text-xs text-gray-500 mt-1">- Sarah M., verified buyer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddChildModal 
        isOpen={isAddChildModalOpen}
        onClose={() => setIsAddChildModalOpen(false)}
      />
    </>
  );
};

export default BookDetailModal;
