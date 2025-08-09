export interface Book {
  id: string;
  title: string;
  cover: string;
  ageRange: string;
  theme: string;
  synopsis: string;
  author: Author;
  demoPages: string[];
  language: string;
  price: {
    ebook: number;
    hardcover: number;
  };
}

export interface Author {
  name: string;
  photo: string;
  bio: string;
}

export interface Child {
  id: string;
  name: string;
  photo?: string;
  teddyPhoto?: string;
  pronouns?: string;
  favoriteColor?: string;
  personalizedCovers?: { [bookId: string]: string }; // AI-generated personalized cover URLs
  processedPhoto?: string; // Background removed photo
  personalizedPages?: { [bookId: string]: string[] }; // Personalized demo page images
}

export interface CartItem {
  bookId: string;
  format: 'ebook' | 'hardcover';
  quantity: number;
  price: number;
}
