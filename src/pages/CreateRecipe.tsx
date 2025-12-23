import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { categories } from '@/data/mockRecipes';
import { Plus, X, Upload, ArrowLeft, Clock, Timer, Users, ChefHat } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


interface MainLayoutContext {
    isLoggedIn: boolean;
    setLoginModalOpen: (open: boolean) => void;
}

const CreateRecipe = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        cookTime: '',
        prepTime: '',
        servings: '',
        difficulty: '',
        image: null as File | null,
        imagePreview: '',
    });
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);
    const [focusIngredientIndex, setFocusIngredientIndex] = useState<number | null>(null);
    const [focusInstructionIndex, setFocusInstructionIndex] = useState<number | null>(null);
    const ingredientRefs = useRef<(HTMLInputElement | null)[]>([]);
    const instructionRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

    useEffect(() => {
        if (focusIngredientIndex !== null && ingredientRefs.current[focusIngredientIndex]) {
            ingredientRefs.current[focusIngredientIndex]?.focus();
            setFocusIngredientIndex(null);
        }
    }, [focusIngredientIndex, ingredients]);

    useEffect(() => {
        if (focusInstructionIndex !== null && instructionRefs.current[focusInstructionIndex]) {
            instructionRefs.current[focusInstructionIndex]?.focus();
            setFocusInstructionIndex(null);
        }
    }, [focusInstructionIndex, instructions]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({
                ...formData,
                image: file,
                imagePreview: URL.createObjectURL(file),
            });
        }
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
        setFocusIngredientIndex(ingredients.length);
    };
    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };
    const updateIngredient = (index: number, value: string) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);
    };

    const addInstruction = () => {
        setInstructions([...instructions, '']);
        setFocusInstructionIndex(instructions.length);
    };
    const removeInstruction = (index: number) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };
    const updateInstruction = (index: number, value: string) => {
        const updated = [...instructions];
        updated[index] = value;
        setInstructions(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Recipe submitted!",
            description: "Your recipe has been published successfully.",
        });
    }
    // const [ingredients, setIngredients] = useState(['']);
    // const [instructions, setInstructions] = useState(['']);

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setFormData({
    //             ...formData,
    //             image: file,
    //             imagePreview: URL.createObjectURL(file),
    //         });
    //     }
    // };
    return (


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
                    <form onSubmit={handleSubmit} className="open-book relative">
                        {/* Book Spine Shadow */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 via-black/20 to-black/10 z-10 pointer-events-none hidden lg:block" />

                        <div className="grid lg:grid-cols-2 bg-background shadow-2xl rounded-sm overflow-hidden">
                            {/* Left Page - Recipe Details */}
                            <div className="book-page-left relative p-5 sm:p-8 lg:p-10 border-r border-border/30">
                                {/* Page texture */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />

                                {/* Page curl effect */}
                                <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-muted/50 to-transparent pointer-events-none hidden lg:block" />

                                {/* Title Banner */}
                                <div className="relative mb-6">
                                    <div className="bg-secondary/60 border-y border-primary/20 py-3 sm:py-4 px-4 text-center">
                                        <h1 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold tracking-wide text-foreground uppercase leading-tight">
                                            Share Your Recipe
                                        </h1>
                                    </div>
                                    {/* Decorative corners */}
                                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-primary/40" />
                                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-primary/40" />
                                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-primary/40" />
                                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-primary/40" />
                                </div>

                                {/* Image Upload */}
                                <div className="mb-5">
                                    <Label className="font-display text-sm font-medium text-foreground/80 italic mb-2 block">Recipe Photo</Label>
                                    <div
                                        className="border-2 border-dashed border-border rounded-sm p-4 text-center cursor-pointer hover:border-primary/50 transition-colors aspect-[16/10] flex items-center justify-center"
                                        onClick={() => document.getElementById('image-upload')?.click()}
                                    >
                                        {formData.imagePreview ? (
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={formData.imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-sm"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 h-7 w-7"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFormData({ ...formData, image: null, imagePreview: '' });
                                                    }}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <Upload className="h-8 w-8" />
                                                <p className="text-sm">Click to upload</p>
                                                <p className="text-xs">PNG, JPG up to 10MB</p>
                                            </div>
                                        )}
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                {/* Recipe Title Input */}
                                <div className="mb-4">
                                    <Label htmlFor="title" className="font-display text-sm font-medium text-foreground/80 italic mb-2 block">Recipe Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., Grandma's Apple Pie"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        className="bg-background/50"
                                    />
                                </div>

                                {/* Quick Info Icons */}
                                <div className="flex justify-center gap-4 sm:gap-6 mb-5 py-3 border-y border-dotted border-muted-foreground/30">
                                    <div className="text-center flex-1">
                                        <Timer className="w-5 h-5 mx-auto mb-1 text-muted-foreground stroke-[1.5]" />
                                        <p className="text-[10px] font-medium text-foreground mb-1">Prep</p>
                                        <Input
                                            placeholder="15 min"
                                            value={formData.prepTime}
                                            onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                                            className="h-7 text-xs text-center bg-background/50"
                                        />
                                    </div>
                                    <div className="text-center flex-1">
                                        <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground stroke-[1.5]" />
                                        <p className="text-[10px] font-medium text-foreground mb-1">Cook</p>
                                        <Input
                                            placeholder="45 min"
                                            value={formData.cookTime}
                                            onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                                            className="h-7 text-xs text-center bg-background/50"
                                            required
                                        />
                                    </div>
                                    <div className="text-center flex-1">
                                        <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground stroke-[1.5]" />
                                        <p className="text-[10px] font-medium text-foreground mb-1">Serves</p>
                                        <Input
                                            type="number"
                                            placeholder="4"
                                            value={formData.servings}
                                            onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                                            className="h-7 text-xs text-center bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="font-display text-base sm:text-lg font-semibold text-foreground italic">
                                            Ingredients
                                        </h2>
                                        <Button type="button" variant="ghost" size="sm" onClick={addIngredient} className="h-7 text-xs">
                                            <Plus className="h-3 w-3 mr-1" />
                                            Add
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        {ingredients.map((ingredient, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-primary text-xs">•</span>
                                                <Input
                                                    ref={(el) => { ingredientRefs.current[index] = el; }}
                                                    placeholder={`Ingredient ${index + 1}`}
                                                    value={ingredient}
                                                    onChange={(e) => updateIngredient(index, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            addIngredient();
                                                        }
                                                    }}
                                                    className="h-8 text-sm bg-background/50"
                                                />
                                                {ingredients.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 flex-shrink-0"
                                                        onClick={() => removeIngredient(index)}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Category & Difficulty */}
                                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
                                    <div>
                                        <Label className="text-[10px] text-muted-foreground mb-1 block">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.filter(c => c !== 'All').map((cat) => (
                                                    <SelectItem key={cat} value={cat} className="text-xs">
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-[10px] text-muted-foreground mb-1 block">Difficulty</Label>
                                        <Select
                                            value={formData.difficulty}
                                            onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                                        >
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Easy" className="text-xs">Easy</SelectItem>
                                                <SelectItem value="Medium" className="text-xs">Medium</SelectItem>
                                                <SelectItem value="Hard" className="text-xs">Hard</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Page Number */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                    <span className="text-xs text-muted-foreground/60 font-display">1</span>
                                </div>
                            </div>

                            {/* Right Page - Instructions */}
                            <div className="book-page-right relative p-5 sm:p-8 lg:p-10 bg-background">
                                {/* Page texture */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />

                                {/* Page curl effect */}
                                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-muted/50 to-transparent pointer-events-none hidden lg:block" />

                                {/* Preparation Title */}
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground italic border-b-2 border-primary/30 pb-2">
                                        Preparation
                                    </h2>
                                    <Button type="button" variant="ghost" size="sm" onClick={addInstruction} className="h-7 text-xs">
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add Step
                                    </Button>
                                </div>

                                {/* Instructions - Point by Point */}
                                <div className="space-y-4 mb-6">
                                    {instructions.map((instruction, index) => (
                                        <div key={index} className="flex gap-3 group">
                                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-display text-sm font-semibold text-primary">
                                                {index + 1}
                                            </span>
                                            <div className="flex-1 flex gap-2">
                                                <Textarea
                                                    ref={(el) => { instructionRefs.current[index] = el; }}
                                                    placeholder={`Describe step ${index + 1}...`}
                                                    value={instruction}
                                                    onChange={(e) => updateInstruction(index, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault();
                                                            addInstruction();
                                                        }
                                                    }}
                                                    rows={2}
                                                    className="text-sm bg-background/50 resize-none"
                                                />
                                                {instructions.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => removeInstruction(index)}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chef's Notes / Description */}
                                <div className="pt-4 border-t border-dotted border-muted-foreground/30 mb-6">
                                    <p className="font-display text-sm font-medium text-foreground/80 italic mb-2">Chef's Notes:</p>
                                    <Textarea
                                        id="description"
                                        placeholder="Share any tips, variations, or the story behind this recipe..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="text-sm italic bg-background/50 resize-none"
                                        required
                                    />
                                </div>

                                {/* Author Preview */}
                                <div className="flex items-center gap-3 pt-3 border-t border-border/50 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <ChefHat className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground">Recipe by</p>
                                        <p className="font-display font-medium text-foreground text-xs">You</p>
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-border/30">
                                    <Button type="submit" size="lg" className="flex-1">
                                        Publish Recipe
                                    </Button>
                                    <Button type="button" variant="outline" size="lg" onClick={() => navigate('/recipes')}>
                                        Cancel
                                    </Button>
                                </div>

                                {/* Page Number */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                    <span className="text-xs text-muted-foreground/60 font-display">2</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default CreateRecipe;
