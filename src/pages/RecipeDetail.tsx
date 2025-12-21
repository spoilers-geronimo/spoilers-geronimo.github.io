import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoginModal } from '@/components/auth/LoginModal';
import { StarRating } from '@/components/recipes/StarRating';
import { Button } from '@/components/ui/button';
import { mockRecipes } from '@/data/mockRecipes';
import { Clock, Timer, Users, ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RecipeDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const recipe = mockRecipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setLoginModalOpen(true)}
          onLogout={() => setIsLoggedIn(false)}
        />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Recipe Not Found</h1>
            <Link to="/recipes">
              <Button>Back to Recipes</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleRate = (rating: number) => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }
    setUserRating(rating);
    toast({
      title: "Thanks for rating!",
      description: `You rated this recipe ${rating} stars.`,
    });
  };

  const handleSave = () => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }
    toast({
      title: "Recipe saved!",
      description: "This recipe has been added to your collection.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setLoginModalOpen(true)}
        onLogout={() => setIsLoggedIn(false)}
      />

      <main className="flex-1 bg-wood-pattern py-8 sm:py-12 lg:py-16">
        <div className="container max-w-5xl">
          {/* Back Button */}
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors mb-6 bg-brown-warm/80 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Recipes
          </Link>

          {/* Recipe Book Page */}
          <div className="recipe-book-page bg-background shadow-2xl rounded-sm p-6 sm:p-10 lg:p-14 relative">
            {/* Page texture overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />
            
            {/* Title Banner */}
            <div className="relative mb-8 sm:mb-10">
              <div className="bg-secondary/60 border-y border-primary/20 py-4 sm:py-5 px-6 text-center">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide text-foreground uppercase">
                  {recipe.title}
                </h1>
              </div>
              {/* Decorative corners */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary/40" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary/40" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary/40" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary/40" />
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Ingredients */}
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-6 italic">
                  Ingredients
                </h2>
                <ul className="space-y-2.5 mb-8">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground/90 font-body text-sm sm:text-base">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>

                {/* Dotted Separator */}
                <div className="border-t border-dotted border-muted-foreground/30 my-8" />

                {/* Notes Section */}
                <div className="italic text-muted-foreground text-sm leading-relaxed">
                  <p className="font-display font-medium text-foreground/80 mb-2">Notes:</p>
                  <p>
                    {recipe.description}
                  </p>
                </div>

                {/* Rating Section */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="font-display text-sm font-medium text-foreground/80 mb-2">Rate this recipe:</p>
                  <div className="flex items-center gap-4">
                    <StarRating
                      rating={userRating || recipe.rating}
                      interactive
                      onRate={handleRate}
                      size="lg"
                    />
                    {!isLoggedIn && (
                      <span className="text-xs text-muted-foreground italic">
                        Sign in to rate
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Info, Image, Preparation */}
              <div>
                {/* Quick Info Icons */}
                <div className="flex justify-center gap-8 sm:gap-12 mb-8">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 flex items-center justify-center">
                      <Timer className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground stroke-[1.5]" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-foreground">Prep time:</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">15 min</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 flex items-center justify-center">
                      <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground stroke-[1.5]" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-foreground">Cook Time:</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{recipe.cookTime}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 flex items-center justify-center">
                      <Users className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground stroke-[1.5]" />
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-foreground">Servings:</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{recipe.servings}</p>
                  </div>
                </div>

                {/* Recipe Image */}
                <div className="relative mb-8">
                  <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-md">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-md h-8 w-8"
                      onClick={handleSave}
                    >
                      <Bookmark className="h-4 w-4 text-foreground" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-md h-8 w-8"
                    >
                      <Share2 className="h-4 w-4 text-foreground" />
                    </Button>
                  </div>
                </div>

                {/* Preparation Section */}
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-6 italic">
                  Preparation
                </h2>
                <div className="space-y-4 text-foreground/90 font-body text-sm sm:text-base leading-relaxed">
                  {recipe.instructions.map((instruction, index) => (
                    <p key={index}>
                      {instruction}
                    </p>
                  ))}
                </div>

                {/* Author Attribution */}
                <div className="mt-8 pt-6 border-t border-border/50 flex items-center gap-3">
                  <img
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">Recipe by</p>
                    <p className="font-display font-medium text-foreground text-sm">{recipe.author.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Number / Category Badge */}
            <div className="mt-10 pt-6 border-t border-border/30 flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-display tracking-widest uppercase">
                {recipe.category}
              </span>
              <span className="text-xs text-muted-foreground italic">
                {recipe.difficulty}
              </span>
            </div>
          </div>
        </div>
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

export default RecipeDetail;
