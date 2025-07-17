
import { Book } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Dragon Who Loved Colors',
    cover: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=600&fit=crop',
    ageRange: '3-6',
    theme: 'Adventure',
    synopsis: 'Join your child on a magical journey with Rosie, a friendly dragon who discovers that the most beautiful colors come from friendship and kindness.',
    author: {
      name: 'Emma Thompson',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=100&h=100&fit=crop&crop=face',
      bio: 'Award-winning children\'s author with 15 published books'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '2',
    title: 'Adventures in Dreamland',
    cover: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=600&fit=crop',
    ageRange: '4-8',
    theme: 'Fantasy',
    synopsis: 'Every night brings a new adventure as your child explores magical dreamlands filled with talking animals and enchanted forests.',
    author: {
      name: 'Michael Chen',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Pediatric psychologist turned storyteller, specializing in bedtime tales'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '3',
    title: 'The Kindness Garden',
    cover: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=600&fit=crop',
    ageRange: '5-9',
    theme: 'Friendship',
    synopsis: 'Watch your child learn about empathy and friendship while helping tend a magical garden where kindness makes flowers bloom.',
    author: {
      name: 'Sarah Williams',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      bio: 'Former teacher with a passion for character-building stories'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '4',
    title: 'Space Explorer Academy',
    cover: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop',
    ageRange: '6-10',
    theme: 'Science',
    synopsis: 'Blast off with your little astronaut as they discover planets, meet alien friends, and learn about the wonders of space.',
    author: {
      name: 'Dr. James Rodriguez',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'NASA educator and children\'s science communicator'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '5',
    title: 'The Little Chef\'s Kitchen',
    cover: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop',
    ageRange: '3-7',
    theme: 'Learning',
    synopsis: 'Your child becomes head chef in a whimsical kitchen where cooking teaches lessons about patience, creativity, and sharing.',
    author: {
      name: 'Isabella Martinez',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      bio: 'Culinary instructor and mother of three young foodies'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  }
];
