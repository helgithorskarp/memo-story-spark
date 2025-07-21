
import { Book } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: '[Child\'s Name] and the Wizard\'s Quest',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    ageRange: '6-12',
    theme: 'Fantasy',
    synopsis: 'When [Child\'s Name] receives a mysterious letter on their 11th birthday, they discover they\'re a wizard! Join your child as they enter a magical school, learn to cast spells, and embark on an epic quest to defeat the dark wizard. With courage, friendship, and a little magic, your child will discover that being different makes them powerful.',
    author: {
      name: 'Merlin Spellbinder',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Fantasy author who believes every child has magic within them.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '2',
    title: '[Child\'s Name] and the Frozen Kingdom',
    cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop',
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
    id: '3',
    title: 'Princess [Child\'s Name] and the Enchanted Rose',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    ageRange: '3-8',
    theme: 'Fantasy',
    synopsis: 'In a beautiful castle surrounded by rose gardens, Princess [Child\'s Name] discovers that true beauty comes from kindness and courage. When a spell threatens the kingdom, your child must use their pure heart and brave spirit to break the curse. A timeless tale about inner beauty, compassion, and the power of love.',
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
