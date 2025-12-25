export interface Recipe {
    id: string;
    title: string;
    description: string;
    image: string;
    cookTime: string;
    prepTime: string;
    servings: number;
    difficultyLevel: 'easy' | 'medium' | 'hard';
    ingredients: string[];
    instructions: string[];
    author: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    rating: number;
    totalRatings: number;
    category: string;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}
