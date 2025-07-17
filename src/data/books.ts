
import { Book } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Little Explorer\'s Big Adventure',
    cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop',
    ageRange: '3-6',
    theme: 'Adventure',
    synopsis: 'When curiosity leads to the biggest adventure yet, your child discovers that being brave doesn\'t mean you\'re never scared - it means you keep going anyway. Join them as they explore mysterious caves, meet friendly forest creatures, and learn that the greatest treasures are often the friends we make along the way.',
    author: {
      name: 'Maria Rodriguez',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=100&h=100&fit=crop&crop=face',
      bio: 'Former park ranger turned children\'s author, inspiring kids to love nature through stories.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '2',
    title: 'The Kindness Club',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    ageRange: '4-8',
    theme: 'Friendship',
    synopsis: 'Your child starts a special club at school where the only rule is to be kind. Watch as one small act of kindness grows into something amazing, teaching children that even the smallest gestures can make the biggest difference in someone\'s day.',
    author: {
      name: 'James Thompson',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Elementary school teacher for 20 years, passionate about social-emotional learning.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '3',
    title: 'The Secret Garden of Dreams',
    cover: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=400&h=600&fit=crop',
    ageRange: '5-9',
    theme: 'Fantasy',
    synopsis: 'Every night when your child falls asleep, they discover a magical garden where dreams grow on trees and wishes bloom like flowers. Together with Luna the dream fairy, they learn that the most beautiful dreams are the ones we share with others.',
    author: {
      name: 'Sarah Chen',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      bio: 'Pediatric sleep specialist and storyteller, helping children have sweet dreams.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '4',
    title: 'The Young Scientist\'s First Discovery',
    cover: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=400&h=600&fit=crop',
    ageRange: '6-10',
    theme: 'Science',
    synopsis: 'When your child\'s science fair project doesn\'t go as planned, they discover that the best inventions come from happy accidents. Join them as they learn about gravity, magnetism, and chemical reactions while solving problems with creativity and determination.',
    author: {
      name: 'Dr. Michael Patel',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Former NASA engineer turned education advocate, making science fun for kids.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1576319155264-99c7ad7fdc8d?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '5',
    title: 'The Little Chef\'s Big Recipe',
    cover: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop',
    ageRange: '3-7',
    theme: 'Learning',
    synopsis: 'Your child wants to cook a special meal for the family but doesn\'t know where to start. With help from Grandma\'s cookbook and a little kitchen magic, they learn that cooking is about more than just following recipes - it\'s about putting love into everything you make.',
    author: {
      name: 'Isabella Martinez',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      bio: 'Professional chef and mom, teaching kids that cooking is a life skill and an art.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0f06ba80409?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '6',
    title: 'The Superhero Next Door',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    ageRange: '4-8',
    theme: 'Adventure',
    synopsis: 'Your child discovers that being a superhero doesn\'t require superpowers - just a super heart. When the neighborhood faces a problem, they rally their friends and family to show that ordinary kids can do extraordinary things when they work together.',
    author: {
      name: 'Kevin Johnson',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Comic book writer and father, believing every child has a superhero inside them.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  }
];
