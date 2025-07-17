
export interface Child {
  id: string;
  name: string;
  pronouns: string;
  favoriteColor: string;
  photo?: string;
}

export interface Author {
  name: string;
  photo: string;
  bio: string;
}

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

export interface CartItem {
  bookId: string;
  format: 'ebook' | 'hardcover';
  quantity: number;
  price: number;
}
