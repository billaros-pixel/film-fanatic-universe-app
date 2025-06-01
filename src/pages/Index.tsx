
import { useState } from 'react';
import { MovieHero } from '@/components/MovieHero';
import { MovieSearch } from '@/components/MovieSearch';
import { MovieGrid } from '@/components/MovieGrid';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('popular');

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      <MovieHero />
      <div className="container mx-auto px-4 py-8">
        <MovieSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <MovieGrid 
          searchQuery={searchQuery}
          category={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Index;
