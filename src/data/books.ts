
import { Book } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: 'What Could [Child\'s Name] Be?',
    cover: '/lovable-uploads/6d112c7e-eb78-4a6f-b741-5479087afaee.png',
    ageRange: '3-8',
    theme: 'Educational',
    synopsis: 'Join [Child\'s Name] on an exciting journey through different careers and professions! From doctors and teachers to astronauts and artists, your child will explore endless possibilities for their future. This inspiring book helps children dream big and discover that they can become anything they set their mind to.',
    author: {
      name: 'Career Explorer',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Educational author specializing in career guidance for young minds.'
    },
    demoPages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop'
    ],
    language: 'English',
    price: {
      hardcover: 39.99
    }
  }
];
