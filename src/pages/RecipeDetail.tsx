import { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { StarRating } from '@/components/recipes/StarRating';
import { Button } from '@/components/ui/button';
import { Clock, Timer, Users, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HTMLFlipBook from 'react-pageflip';
import { tables, DATABASE_ID, RECIPES_COLLECTION_ID } from '@/lib/appwrite';
import { Recipe } from '@/types/recipe';
import { Models } from 'appwrite';

interface MainLayoutContext {
    isLoggedIn: boolean;
    setLoginModalOpen: (open: boolean) => void;
}

const RecipeDetail = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const { isLoggedIn, setLoginModalOpen } = useOutletContext<MainLayoutContext>();
    const [userRating, setUserRating] = useState(0);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) {
                setError('No recipe ID provided');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const row = await tables.getRow({
                    databaseId: DATABASE_ID,
                    tableId: RECIPES_COLLECTION_ID,
                    rowId: id
                });
                // Helper to parse strings that might be comma-separated or JSON arrays
                const parseStringArray = (input: any): string[] => {
                    if (Array.isArray(input)) return input;
                    if (typeof input === 'string') {
                        try {
                            const parsed = JSON.parse(input);
                            if (Array.isArray(parsed)) return parsed;
                        } catch (e) {
                            // If not JSON, split by comma
                            return input.split(',').map(s => s.trim()).filter(s => s !== '');
                        }
                    }
                    return [];
                };

                // Transform AppWrite row to Recipe type
                const data = row as any;
                const fetchedRecipe: Recipe = {
                    id: row.$id,
                    title: data.title,
                    description: data.description,
                    image: data.recipeImageUrl,
                    cookTime: data.cookTimeMinutes + " mins",
                    prepTime: data.prepTimeMinutes + " mins",
                    servings: data.servings,
                    difficultyLevel: data.difficultyLevel,
                    ingredients: parseStringArray(data.ingredients),
                    instructions: parseStringArray(data.instructions),
                    authorName: data.authorName,
                    authorAvatar: data.authorAvatar,
                    rating: data.rating,
                    totalRatings: data.totalRatings,
                    category: data.category,
                    createdAt: row.$createdAt,
                };

                setRecipe(fetchedRecipe);
            } catch (err) {
                console.error('Failed to fetch recipe:', err);
                setError('Failed to load recipe. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading recipe...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-display text-3xl font-bold mb-4">
                            {error ? 'Error Loading Recipe' : 'Recipe Not Found'}
                        </h1>
                        {error && <p className="text-destructive mb-4">{error}</p>}
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
                        {/* The Open Book */}
                        <div className="open-book relative">
                            {/* Book Spine Shadow */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 via-black/20 to-black/10 z-10 pointer-events-none hidden lg:block" />

                            <div className="grid lg:grid-cols-2 bg-background shadow-2xl rounded-sm overflow-hidden">
                                {/* <HTMLFlipBook width={600} height={800}> */}

                                {/* Left Page */}
                                <div className="book-page-left relative p-5 sm:p-8 lg:p-10 border-r border-border/30">
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
                                            <p className="text-[10px] sm:text-xs text-muted-foreground">{recipe.prepTime}</p>
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
                                        {/* <img
                                            src={recipe.author.avatar}
                                            alt={recipe.author.name}
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                                        /> */}
                                        <div>
                                            <p className="text-[10px] text-muted-foreground">Recipe by</p>
                                            <p className="font-display font-medium text-foreground text-xs">{recipe.authorName}</p>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Page */}
                                <div className="book-page-right relative p-5 sm:p-8 lg:p-10 bg-background">
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
                                            Difficulty: {recipe.difficultyLevel}
                                        </span>
                                    </div>

                                </div>
                                {/* </HTMLFlipBook> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default RecipeDetail;
