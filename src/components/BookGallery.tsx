
import React, { useState } from 'react';
import { Star, Filter } from 'lucide-react';
import { books } from '@/data/books';
import { Book } from '@/types';
import BookCard from './BookCard';
import BookDetailModal from './BookDetailModal';
import { Button } from '@/components/ui/button';

const BookGallery: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filters, setFilters] = useState({
    age: '',
    theme: '',
    language: 'English'
  });
  const [showFilters, setShowFilters] = useState(false);

  const ageRanges = [...new Set(books.map(book => book.ageRange))];
  const themes = [...new Set(books.map(book => book.theme))];
  const languages = [...new Set(books.map(book => book.language))];

  const filteredBooks = books.filter(book => {
    return (
      (filters.age === '' || book.ageRange === filters.age) &&
      (filters.theme === '' || book.theme === filters.theme) &&
      (filters.language === '' || book.language === filters.language)
    );
  });

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  return (
    <>
      <section id="books" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-nunito">
              Choose Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500"> Adventure</span>
            </h2>
            <p className="text-xl text-gray-600 font-poppins max-w-3xl mx-auto">
              Dozens of beautifully written stories, each one waiting to feature your child as the hero.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </Button>
                <span className="text-sm text-gray-500">
                  {filteredBooks.length} of {books.length} books
                </span>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 bg-memo-cream rounded-xl animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                    <select
                      value={filters.age}
                      onChange={(e) => setFilters(prev => ({ ...prev, age: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">All Ages</option>
                      {ageRanges.map(age => (
                        <option key={age} value={age}>{age} years</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                      value={filters.theme}
                      onChange={(e) => setFilters(prev => ({ ...prev, theme: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">All Themes</option>
                      {themes.map(theme => (
                        <option key={theme} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={filters.language}
                      onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => handleBookClick(book)}
              />
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more stories.</p>
            </div>
          )}
        </div>
      </section>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
  );
};

export default BookGallery;
