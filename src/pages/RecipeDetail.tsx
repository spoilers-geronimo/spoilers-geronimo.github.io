import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoginModal } from '@/components/auth/LoginModal';
import { StarRating } from '@/components/recipes/StarRating';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockRecipes } from '@/data/mockRecipes';
import { Clock, Users, ChefHat, ArrowLeft, Bookmark, Share2 } from 'lucide-react';
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

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Back Button */}
          <Link
            to="/recipes"
            className="absolute top-6 left-6 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Recipes
          </Link>

          {/* Actions */}
          <div className="absolute top-6 right-6 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={handleSave}
            >
              <Bookmark className="h-5 w-5 text-white" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Share2 className="h-5 w-5 text-white" />
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <div className="container">
              <Badge className="mb-4 bg-primary">{recipe.category}</Badge>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
                {recipe.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <StarRating rating={recipe.rating} totalRatings={recipe.totalRatings} />
                <span className="flex items-center gap-1">
                  <Clock className="h-5 w-5" />
                  {recipe.cookTime}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-5 w-5" />
                  {recipe.servings} servings
                </span>
                <Badge
                  variant="outline"
                  className="border-white/50 text-white"
                >
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {recipe.description}
                </p>
              </section>

              {/* Ingredients */}
              <section className="glass-card rounded-xl p-6">
                <h2 className="font-display text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm text-primary font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Instructions */}
              <section>
                <h2 className="font-display text-2xl font-semibold mb-6">Instructions</h2>
                <ol className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-muted-foreground">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Card */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold mb-4">Recipe by</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <p className="font-medium">{recipe.author.name}</p>
                    <p className="text-sm text-muted-foreground">Home Cook</p>
                  </div>
                </div>
              </div>

              {/* Rate Recipe */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold mb-4">Rate this Recipe</h3>
                <StarRating
                  rating={userRating || recipe.rating}
                  interactive
                  onRate={handleRate}
                  size="lg"
                />
                {!isLoggedIn && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Sign in to rate this recipe
                  </p>
                )}
              </div>

              {/* Cook Info */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  Quick Info
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Cook Time</dt>
                    <dd className="font-medium">{recipe.cookTime}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Servings</dt>
                    <dd className="font-medium">{recipe.servings}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Difficulty</dt>
                    <dd className="font-medium">{recipe.difficulty}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium">{recipe.category}</dd>
                  </div>
                </dl>
              </div>
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
