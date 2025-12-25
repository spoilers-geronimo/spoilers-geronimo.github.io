import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/types/recipe';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
    recipe: Recipe;
    featured?: boolean;
}

export const RecipeCard = ({ recipe, featured = false }: RecipeCardProps) => {
    return (
        <Link to={`/recipe/${recipe.id}`}>
            <article
                className={cn(
                    "group relative bg-card rounded-xl overflow-hidden border border-border hover-lift",
                    featured && "md:col-span-2 md:row-span-2"
                )}
            >
                {/* Image Container */}
                <div className={cn("relative overflow-hidden", featured ? "h-80" : "h-48")}>
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary text-primary-foreground">
                        {recipe.category}
                    </Badge>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 text-orange-warm fill-orange-warm" />
                        <span className="text-sm font-medium">{recipe.rating}</span>
                    </div>

                    {/* Difficulty */}
                    <Badge
                        variant="outline"
                        className={cn(
                            "absolute bottom-4 left-4 border-background/50 text-background",
                            recipe.difficultyLevel === 'easy' && "bg-green-500/80",
                            recipe.difficultyLevel === 'medium' && "bg-yellow-500/80",
                            recipe.difficultyLevel === 'hard' && "bg-red-500/80"
                        )}
                    >
                        {recipe.difficultyLevel}
                    </Badge>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className={cn(
                        "font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2",
                        featured ? "text-2xl mb-3" : "text-lg mb-2"
                    )}>
                        {recipe.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {recipe.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {recipe.cookTime}
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {recipe.servings}
                            </span>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-2">
                            {/* <img
                                src={recipe.avatarauthor.}
                                alt={recipe.author.name}
                                className="w-6 h-6 rounded-full object-cover ring-2 ring-border"
                            /> */}
                            <span className="text-xs text-muted-foreground hidden sm:block">
                                {recipe.authorName}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
};
