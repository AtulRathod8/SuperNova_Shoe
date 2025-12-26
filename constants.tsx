
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'sn-001',
    name: 'Nebula X1',
    category: 'High-Top',
    price: 189.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    description: 'Engineered for the cosmic runner. The Nebula X1 features our proprietary Grav-Tech sole for weightless cushioning and a breathable star-mesh upper.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    color: 'Cosmic Purple',
    featured: true
  },
  {
    id: 'sn-002',
    name: 'Pulsar Runner',
    category: 'Running',
    price: 145.00,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    description: 'A flash of speed in every stride. The Pulsar Runner is designed for high-intensity training with a sleek aerodynamic profile.',
    sizes: ['6', '7', '8', '9', '10'],
    color: 'Solar Flare Red'
  },
  {
    id: 'sn-003',
    name: 'Quasar Street',
    category: 'Lifestyle',
    price: 129.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    description: 'Defy gravity in style. Quasar Street combines retro aesthetics with modern comfort for the ultimate urban explorer.',
    sizes: ['8', '9', '10', '11', '12', '13'],
    color: 'Void Black',
    featured: true
  },
  {
    id: 'sn-004',
    name: 'Aurora Lite',
    category: 'Lifestyle',
    price: 115.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    description: 'Inspired by the polar lights, these ultra-lightweight sneakers transition seamlessly from gym to street.',
    sizes: ['5', '6', '7', '8', '9', '10'],
    color: 'Glacial Blue'
  },
  {
    id: 'sn-005',
    name: 'Supercell Max',
    category: 'Basketball',
    price: 210.00,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800',
    description: 'Maximum impact protection for the vertical athlete. Explode through the atmosphere with Supercell Max.',
    sizes: ['9', '10', '11', '12', '13', '14'],
    color: 'Gravity Grey'
  },
  {
    id: 'sn-006',
    name: 'Titanium Glide',
    category: 'Training',
    price: 165.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate training companion. Durable, responsive, and ready for any challenge the galaxy throws your way.',
    sizes: ['7', '8', '9', '10', '11'],
    color: 'Stardust Silver'
  }
];
