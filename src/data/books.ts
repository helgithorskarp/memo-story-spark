
import { Book } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: '[Child\'s Name] and the Frozen Kingdom',
    cover: '/lovable-uploads/501be7b5-eff5-455c-9cd4-4be6507cf2fb.png',
    ageRange: '4-10',
    theme: 'Fantasy',
    synopsis: 'When an eternal winter falls over the kingdom, Princess [Child\'s Name] must learn to control their magical ice powers. Together with their loyal friends, your child will discover that love is the most powerful magic of all. A heartwarming tale about embracing who you are and the strength that comes from family.',
    author: {
      name: 'Anna Snowheart',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      bio: 'Children\'s author inspired by Nordic folklore and winter magic.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '2',
    title: 'Princess [Child\'s Name]: A Cinderella Story',
    cover: '/lovable-uploads/dfb2f7c5-ffd6-40dc-9b17-3e3a74b20023.png',
    ageRange: '3-8',
    theme: 'Fantasy',
    synopsis: 'When Princess [Child\'s Name] loses their glass slipper at the royal ball, they discover that true magic isn\'t in fairy godmothers or pumpkin carriages - it\'s in kindness, courage, and believing in yourself. Your child will learn that every ending can be a new beginning, and that dreams really do come true for those who never give up.',
    author: {
      name: 'Belle Enchanted',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=100&h=100&fit=crop&crop=face',
      bio: 'Beloved fairy tale author who writes stories of brave princesses.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  }
];
