import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { ArrowRight, Loader2 } from 'lucide-react';
import { tables, DATABASE_ID, RECIPES_COLLECTION_ID, Query } from '@/lib/appwrite';
import { Recipe } from '@/types/recipe';
import { Models } from 'appwrite';

export const FeaturedRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedRecipes = async () => {
            try {
                const response = await tables.listRows({
                    databaseId: DATABASE_ID,
                    tableId: RECIPES_COLLECTION_ID,
                    queries: [
                        Query.orderDesc('$createdAt'),
                        Query.limit(4)
                    ]
                });

                // Helper to parse strings that might be comma-separated or JSON arrays
                const parseStringArray = (input: any): string[] => {
                    if (Array.isArray(input)) return input;
                    if (typeof input === 'string') {
                        try {
                            const parsed = JSON.parse(input);
                            if (Array.isArray(parsed)) return parsed;
                        } catch (e) {
                            return input.split(',').map(s => s.trim()).filter(s => s !== '');
                        }
                    }
                    return [];
                };

                const fetchedRecipes = response.rows.map((row: Models.Row) => {
                    const data = row as any;
                    return {
                        id: row.$id,
                        title: data.title,
                        description: data.description,
                        image: data.recipeImageUrl,
                        cookTime: data.cookTime,
                        prepTime: data.prepTime,
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
                }) as Recipe[];

                setRecipes(fetchedRecipes);
            } catch (err) {
                console.error('Failed to fetch featured recipes:', err);
                setError('Failed to load recipes.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedRecipes();
    }, []);

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

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="text-center py-10">
                        <p className="text-destructive">{error}</p>
                    </div>
                ) : recipes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recipes.map((recipe, index) => (
                            <div
                                key={recipe.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">No recipes found.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
