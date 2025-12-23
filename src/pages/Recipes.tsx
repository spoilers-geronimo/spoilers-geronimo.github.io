import { useState, useEffect } from 'react';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/mockRecipes';
import { Search, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { tables, DATABASE_ID, RECIPES_COLLECTION_ID } from '@/lib/appwrite';
import { Recipe } from '@/types/recipe';
import { Models } from 'appwrite';

const Recipes = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await tables.listRows({
                    databaseId: DATABASE_ID,
                    tableId: RECIPES_COLLECTION_ID
                });

                // Transform AppWrite rows to Recipe type
                const fetchedRecipes = response.rows.map((row: Models.Row) => {
                    const data = row as any;
                    return {
                        id: row.$id,
                        title: data.title,
                        description: data.description,
                        image: data.image,
                        cookTime: data.cookTime,
                        servings: data.servings,
                        difficulty: data.difficulty,
                        ingredients: data.ingredients,
                        instructions: data.instructions,
                        author: data.author ? JSON.parse(data.author) : { name: 'Unknown', avatar: '' },
                        rating: data.rating,
                        totalRatings: data.totalRatings,
                        category: data.category,
                        createdAt: row.$createdAt,
                    };
                }) as Recipe[];

                setRecipes(fetchedRecipes);
            } catch (err) {
                console.error('Failed to fetch recipes:', err);
                setError('Failed to load recipes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col">
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
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <p className="text-destructive text-lg">{error}</p>
                        </div>
                    ) : filteredRecipes.length > 0 ? (
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
        </div>
    );
};

export default Recipes;
