import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { ArrowRight } from 'lucide-react';
import { mockRecipes } from '@/data/mockRecipes';

export const FeaturedRecipes = () => {
  const featuredRecipes = mockRecipes.slice(0, 4);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Featured <span className="text-primary">Recipes</span>
            </h2>
            <p className="text-muted-foreground">
              Handpicked favorites from our community
            </p>
          </div>
          <Link to="/recipes">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <div
              key={recipe.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
