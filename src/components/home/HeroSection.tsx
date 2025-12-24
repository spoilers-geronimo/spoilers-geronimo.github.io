import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Utensils } from 'lucide-react';
import { account } from '@/lib/appwrite';

export const HeroSection = () => {
    const [isAnonymous, setIsAnonymous] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await account.get();
                // If it's a real user (not anonymous session), set to false
                setIsAnonymous(false);
            } catch (error) {
                // If 401/error, it means no session or guest
                setIsAnonymous(true);
            }
        };
        checkUser();
    }, []);

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden kitchen-pattern">
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

            <div className="container relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Utensils className="h-4 w-4" />
                            From Home Kitchens to Yours
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Discover the Joy of{' '}
                            <span className="text-gradient">Homemade</span>{' '}
                            Cooking
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
                            Join our community of passionate home cooks. Share your family recipes,
                            discover new favorites, and bring warmth to every meal.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/recipes">
                                <Button size="lg" className="gap-2 text-base px-8 shadow-lg shadow-primary/25">
                                    Explore Recipes
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            {isAnonymous && (
                                <Link to="/signup">
                                    <Button variant="outline" size="lg" className="text-base px-8">
                                        Join Our Kitchen
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12 justify-center lg:justify-start">
                            <div>
                                <div className="font-display text-3xl font-bold text-primary">2.5k+</div>
                                <div className="text-sm text-muted-foreground">Recipes</div>
                            </div>
                            <div>
                                <div className="font-display text-3xl font-bold text-primary">15k+</div>
                                <div className="text-sm text-muted-foreground">Home Cooks</div>
                            </div>
                            <div>
                                <div className="font-display text-3xl font-bold text-primary">4.8</div>
                                <div className="text-sm text-muted-foreground">Avg Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Grid */}
                    <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop"
                                        alt="Cooking"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
                                        alt="Fresh ingredients"
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=300&fit=crop"
                                        alt="Baking"
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=500&fit=crop"
                                        alt="Plated dish"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -bottom-4 -left-8 bg-card p-4 rounded-xl shadow-xl border border-border animate-float">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="text-2xl">👨‍🍳</span>
                                </div>
                                <div>
                                    <div className="font-medium text-sm">New Recipe!</div>
                                    <div className="text-xs text-muted-foreground">Tuscan Chicken</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
