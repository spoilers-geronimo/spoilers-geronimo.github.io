import { useState } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { StarRating } from '@/components/recipes/StarRating';
import { Button } from '@/components/ui/button';
import { mockRecipes } from '@/data/mockRecipes';
import { Clock, Timer, Users, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MainLayoutContext {
    isLoggedIn: boolean;
    setLoginModalOpen: (open: boolean) => void;
}

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { isLoggedIn, setLoginModalOpen } = useOutletContext<MainLayoutContext>();
    const [userRating, setUserRating] = useState(0);
    const [animationClass, setAnimationClass] = useState<'next' | 'prev' | ''>('');

    const recipe = mockRecipes.find((r) => r.id === id);
    const currentIndex = mockRecipes.findIndex((r) => r.id === id);
    const prevRecipe = currentIndex > 0 ? mockRecipes[currentIndex - 1] : null;
    const nextRecipe = currentIndex < mockRecipes.length - 1 ? mockRecipes[currentIndex + 1] : null;

    const handleNavigate = (direction: 'next' | 'prev') => {
        const targetRecipe = direction === 'next' ? nextRecipe : prevRecipe;
        if (!targetRecipe) return;

        // Trigger animation
        setAnimationClass(direction);

        // Wait for animation to finish before navigating
        setTimeout(() => {
            setAnimationClass('');
            navigate(`/recipe/${targetRecipe.id}`);
        }, 600); // 600ms matches animation duration approx
    };

    if (!recipe) {
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-display text-3xl font-bold mb-4">Recipe Not Found</h1>
                        <Link to="/recipes">
                            <Button>Back to Recipes</Button>
                        </Link>
                    </div>
                </main>
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

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 bg-wood-pattern py-4 sm:py-6">
                <div className="container">
                    {/* Back Button */}
                    <Link
                        to="/recipes"
                        className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors mb-4 bg-brown-warm/80 px-4 py-2 rounded-full backdrop-blur-sm text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Recipes
                    </Link>

                    {/* Open Book Container */}
                    <div className="relative">
                        {/* Book Navigation */}
                        <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20">
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full bg-background/90 shadow-lg hover:bg-background h-10 w-10 sm:h-12 sm:w-12 disabled:opacity-30"
                                onClick={() => handleNavigate('prev')}
                                disabled={!prevRecipe}
                            >
                                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                            </Button>
                        </div>
                        <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20">
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full bg-background/90 shadow-lg hover:bg-background h-10 w-10 sm:h-12 sm:w-12 disabled:opacity-30"
                                onClick={() => handleNavigate('next')}
                                disabled={!nextRecipe}
                            >
                                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                            </Button>
                        </div>

                        {/* The Open Book */}
                        <div className="open-book relative">
                            {/* Book Spine Shadow */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 via-black/20 to-black/10 z-10 pointer-events-none hidden lg:block" />

                            <div className="grid lg:grid-cols-2 bg-background shadow-2xl rounded-sm overflow-hidden">
                                {/* Left Page */}
                                <div className={`book-page-left relative p-5 sm:p-8 lg:p-10 border-r border-border/30 ${animationClass === 'prev' ? 'animate-page-flip-prev' : ''}`}>
                                    {/* Page texture */}
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />

                                    {/* Page curl effect */}
                                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-muted/50 to-transparent pointer-events-none hidden lg:block" />

                                    {/* Title Banner */}
                                    <div className="relative mb-6">
                                        <div className="bg-secondary/60 border-y border-primary/20 py-3 sm:py-4 px-4 text-center">
                                            <h1 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold tracking-wide text-foreground uppercase leading-tight">
                                                {recipe.title}
                                            </h1>
                                        </div>
                                        {/* Decorative corners */}
                                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-primary/40" />
                                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-primary/40" />
                                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-primary/40" />
                                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-primary/40" />
                                    </div>

                                    {/* Recipe Image */}
                                    <div className="relative mb-5">
                                        <div className="aspect-[16/10] overflow-hidden rounded-sm shadow-md">
                                            <img
                                                src={recipe.image}
                                                alt={recipe.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Quick Info Icons */}
                                    <div className="flex justify-center gap-6 sm:gap-8 mb-5 py-3 border-y border-dotted border-muted-foreground/30">
                                        <div className="text-center">
                                            <Timer className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-muted-foreground stroke-[1.5]" />
                                            <p className="text-[10px] sm:text-xs font-medium text-foreground">Prep</p>
                                            <p className="text-[10px] sm:text-xs text-muted-foreground">15 min</p>
                                        </div>
                                        <div className="text-center">
                                            <Clock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-muted-foreground stroke-[1.5]" />
                                            <p className="text-[10px] sm:text-xs font-medium text-foreground">Cook</p>
                                            <p className="text-[10px] sm:text-xs text-muted-foreground">{recipe.cookTime}</p>
                                        </div>
                                        <div className="text-center">
                                            <Users className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 text-muted-foreground stroke-[1.5]" />
                                            <p className="text-[10px] sm:text-xs font-medium text-foreground">Serves</p>
                                            <p className="text-[10px] sm:text-xs text-muted-foreground">{recipe.servings}</p>
                                        </div>
                                    </div>

                                    {/* Ingredients */}
                                    <div className="mb-5">
                                        <h2 className="font-display text-base sm:text-lg font-semibold text-foreground mb-3 italic">
                                            Ingredients
                                        </h2>
                                        <ul className="space-y-1.5 text-xs sm:text-sm">
                                            {recipe.ingredients.map((ingredient, index) => (
                                                <li key={index} className="flex items-start gap-2 text-foreground/90 font-body">
                                                    <span className="text-primary mt-0.5 text-xs">•</span>
                                                    <span>{ingredient}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Rating */}
                                    <div className="mb-4 py-3 border-t border-dotted border-muted-foreground/30">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-display text-xs font-medium text-foreground/80 mb-1">Rate this recipe:</p>
                                                <StarRating
                                                    rating={userRating || recipe.rating}
                                                    interactive
                                                    onRate={handleRate}
                                                    size="sm"
                                                />
                                            </div>
                                            {!isLoggedIn && (
                                                <span className="text-[10px] text-muted-foreground italic">
                                                    Sign in to rate
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                                        <img
                                            src={recipe.author.avatar}
                                            alt={recipe.author.name}
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                                        />
                                        <div>
                                            <p className="text-[10px] text-muted-foreground">Recipe by</p>
                                            <p className="font-display font-medium text-foreground text-xs">{recipe.author.name}</p>
                                        </div>
                                    </div>

                                    {/* Page Number */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                        <span className="text-xs text-muted-foreground/60 font-display">{currentIndex * 2 + 1}</span>
                                    </div>
                                </div>

                                {/* Right Page */}
                                <div className={`book-page-right relative p-5 sm:p-8 lg:p-10 bg-background ${animationClass === 'next' ? 'animate-page-flip-next' : ''}`}>
                                    {/* Page texture */}
                                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />

                                    {/* Page curl effect */}
                                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-muted/50 to-transparent pointer-events-none hidden lg:block" />

                                    {/* Preparation Title */}
                                    <div className="mb-6">
                                        <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground italic border-b-2 border-primary/30 pb-2 inline-block">
                                            Preparation
                                        </h2>
                                    </div>

                                    {/* Instructions - Point by Point */}
                                    <ol className="space-y-5">
                                        {recipe.instructions.map((instruction, index) => (
                                            <li key={index} className="flex gap-4 group">
                                                <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-display text-sm sm:text-base font-semibold text-primary">
                                                    {index + 1}
                                                </span>
                                                <p className="pt-1 text-foreground/90 font-body text-sm sm:text-base leading-relaxed">
                                                    {instruction}
                                                </p>
                                            </li>
                                        ))}
                                    </ol>

                                    {/* Notes Section */}
                                    <div className="mt-8 pt-6 border-t border-dotted border-muted-foreground/30">
                                        <p className="font-display text-sm font-medium text-foreground/80 italic mb-2">Chef's Notes:</p>
                                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                                            {recipe.description}
                                        </p>
                                    </div>

                                    {/* Category & Difficulty */}
                                    <div className="mt-8 pt-4 border-t border-border/30 flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground font-display tracking-widest uppercase">
                                            {recipe.category}
                                        </span>
                                        <span className="text-xs text-muted-foreground italic">
                                            Difficulty: {recipe.difficulty}
                                        </span>
                                    </div>

                                    {/* Page Number */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                        <span className="text-xs text-muted-foreground/60 font-display">{currentIndex * 2 + 2}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recipe Navigation Info */}
                        <div className="flex justify-between items-center mt-4 px-4 text-xs text-primary-foreground/70">
                            <span>{prevRecipe ? `← ${prevRecipe.title}` : ''}</span>
                            <span className="font-display">Page {currentIndex + 1} of {mockRecipes.length}</span>
                            <span>{nextRecipe ? `${nextRecipe.title} →` : ''}</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RecipeDetail;
