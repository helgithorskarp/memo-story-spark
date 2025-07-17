
import React from 'react';
import { Star, Eye } from 'lucide-react';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const { selectedChild } = useApp();

  // Use personalized cover if available, otherwise use default book cover
  const coverImage = selectedChild?.personalizedCovers?.[book.id] || book.cover;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer animate-fade-in">
      <div className="relative overflow-hidden" onClick={onClick}>
        <img
          src={coverImage}
          alt={`${book.title} book cover`}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Personalization indicator when using custom cover */}
        {selectedChild?.personalizedCovers?.[book.id] && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Personalized</span>
            </span>
          </div>
        )}

        {/* Age badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-memo-peach text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
            Ages {book.ageRange}
          </span>
        </div>

        {/* Theme badge */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-memo-blue text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
            {book.theme}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white hover:bg-gray-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      <div className="p-4" onClick={onClick}>
        <h3 className="font-bold text-lg text-gray-800 mb-2 font-nunito group-hover:text-orange-600 transition-colors">
          {selectedChild ? book.title.replace(/\[Child's Name\]/g, selectedChild.name) : book.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 font-poppins line-clamp-2">
          {selectedChild 
            ? book.synopsis.replace(/\[Child's Name\]/g, selectedChild.name) 
            : book.synopsis.replace(/\[Child's Name\]/g, "[Your Child's Name]")
          }
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <img
              src={book.author.photo}
              alt={book.author.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-500 font-medium">
              {book.author.name}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">E-book</span>
            <span className="font-semibold text-gray-800">${book.price.ebook}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-gray-500">Hardcover</span>
            <span className="font-semibold text-gray-800">${book.price.hardcover}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
