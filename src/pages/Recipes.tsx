import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { LoginModal } from '@/components/auth/LoginModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockRecipes, categories } from '@/data/mockRecipes';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Recipes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setLoginModalOpen(true)}
        onLogout={() => setIsLoggedIn(false)}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-accent/5 kitchen-pattern">
          <div className="container text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Discover <span className="text-primary">Recipes</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our collection of delicious recipes shared by home cooks from around the world
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>
        </section>

        {/* Categories & Recipes */}
        <section className="py-12">
          <div className="container">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-full",
                    selectedCategory === category && "shadow-md"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Results */}
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe, index) => (
                  <div
                    key={recipe.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No recipes found. Try a different search or category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={() => setIsLoggedIn(true)}
      />
    </div>
  );
};

export default Recipes;
