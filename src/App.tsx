import { useState } from 'react';
import { CartProvider } from '@/lib/cart';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <CartProvider>
      <div className="bg-slate-950 min-h-screen">
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main>
          <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <ProductGrid searchQuery={searchQuery} />
          <Features />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
