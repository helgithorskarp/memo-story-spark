
import { Book } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Little Explorer\'s Big Adventure',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    ageRange: '3-6',
    theme: 'Adventure',
    synopsis: 'Join [Child\'s Name] on an incredible journey through enchanted forests and magical caves. When curiosity leads to the biggest adventure yet, your child discovers that being brave doesn\'t mean you\'re never scared - it means you keep going anyway. Along the way, they\'ll meet talking animals, solve riddles with friendly forest creatures, and learn that the greatest treasures are often the friends we make along the way.',
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
    title: 'Princess [Child\'s Name] and the Magic Garden',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    ageRange: '4-8',
    theme: 'Fantasy',
    synopsis: 'In a kingdom far, far away, Princess [Child\'s Name] discovers a secret garden where flowers grant wishes and trees tell stories. But when the garden starts to wither, only acts of kindness can bring it back to life. Your child will learn that true magic comes from helping others and that even the smallest heart can hold the biggest dreams.',
    author: {
      name: 'Isabella Fairytale',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      bio: 'Award-winning fairy tale author who believes every child is royalty.'
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
    id: '3',
    title: '[Child\'s Name] and the Friendly Dragon',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    ageRange: '5-9',
    theme: 'Fantasy',
    synopsis: 'When [Child\'s Name] finds a lonely dragon hiding in the mountains, nobody believes dragons can be friendly. But your child sees past the scary exterior to find a gentle heart that just wants a friend. Together, they\'ll show the whole village that being different doesn\'t mean being dangerous, and that friendship can bloom in the most unexpected places.',
    author: {
      name: 'Thomas Dragonheart',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Fantasy author specializing in stories about misunderstood magical creatures.'
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
    title: 'Detective [Child\'s Name] Solves the Mystery',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    ageRange: '6-10',
    theme: 'Adventure',
    synopsis: 'The case of the missing library books has stumped everyone, but Detective [Child\'s Name] is on the case! Armed with a magnifying glass, a keen eye for clues, and an unshakeable sense of justice, your child will follow the trail of evidence through the school, interview suspects, and crack the case using logic, observation, and a little help from friends.',
    author: {
      name: 'Sherlock McMystery',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Former detective turned children\'s author, teaching kids about problem-solving.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1576319155264-99c7ad7d3136?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      ebook: 19,
      hardcover: 49
    }
  },
  {
    id: '5',
    title: 'Chef [Child\'s Name]\'s Magical Kitchen',
    cover: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop',
    ageRange: '3-7',
    theme: 'Learning',
    synopsis: 'In Chef [Child\'s Name]\'s kitchen, every recipe is an adventure! When your child discovers that their grandmother\'s old cookbook is actually magical, each dish they make helps someone in need. From soup that heals hurt feelings to cookies that bring families together, your little chef learns that cooking with love is the most important ingredient of all.',
    author: {
      name: 'Isabella Spatula',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      bio: 'Professional chef and mom, teaching kids that cooking is love made visible.'
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
    title: 'Captain [Child\'s Name] and the Pirate\'s Treasure',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    ageRange: '4-8',
    theme: 'Adventure',
    synopsis: 'Ahoy, matey! Captain [Child\'s Name] has found an old treasure map, but this isn\'t just any treasure hunt. Along the way to finding the buried gold, your brave little pirate discovers that the real treasure isn\'t gold or jewels - it\'s the courage to stand up for what\'s right, the loyalty of true friends, and the joy of helping others in need.',
    author: {
      name: 'Captain Storybeard',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: 'Maritime historian and storyteller, bringing ocean adventures to landlubbers.'
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
