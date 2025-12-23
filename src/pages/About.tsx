import { useState } from 'react';
import { ChefHat, Heart, Users, Utensils } from 'lucide-react';

const About = () => {



    const features = [
        {
            icon: <ChefHat className="h-8 w-8" />,
            title: 'Share Your Recipes',
            description: 'Upload your favorite recipes and share your culinary creations with food lovers around the world.',
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: 'Join a Community',
            description: 'Connect with passionate home cooks, exchange tips, and discover new cooking techniques.',
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: 'Save Favorites',
            description: 'Build your personal cookbook by saving recipes you love for quick access anytime.',
        },
        {
            icon: <Utensils className="h-8 w-8" />,
            title: 'Rate & Review',
            description: 'Help others by rating recipes and sharing your experience with each dish you try.',
        },
    ];

    return (
        <div className="flex flex-col">
            <main className="flex-1">
                {/* Hero */}
                <section className="relative py-24 bg-gradient-to-br from-primary/10 via-background to-accent/5 kitchen-pattern">
                    <div className="container text-center">
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            About <span className="text-primary">SavoryStories</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We believe that the best recipes come from home kitchens, passed down through generations,
                            and shared with love.
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-20">
                    <div className="container">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="animate-fade-in">
                                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                                    Our <span className="text-primary">Mission</span>
                                </h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        SavoryStories was born from a simple idea: to create a space where home cooks
                                        could share their authentic recipes and culinary traditions with the world.
                                    </p>
                                    <p>
                                        We're more than just a recipe platform. We're a community of food lovers who
                                        believe that cooking brings people together. Every recipe shared here tells a
                                        story—of family gatherings, cultural heritage, and moments of joy around the table.
                                    </p>
                                    <p>
                                        Whether you're a seasoned chef or just starting your cooking journey,
                                        you'll find inspiration, guidance, and a warm welcome in our kitchen community.
                                    </p>
                                </div>
                            </div>
                            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
                                    alt="Cooking together"
                                    className="rounded-2xl shadow-2xl"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                            <Heart className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-display font-semibold">Made with Love</div>
                                            <div className="text-sm text-muted-foreground">Since 2024</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20 bg-muted/30">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                                What We <span className="text-primary">Offer</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Everything you need to discover, share, and enjoy home cooking
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="glass-card rounded-xl p-6 text-center animate-fade-in hover-lift"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-20">
                    <div className="container">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                            {[
                                { value: '2,500+', label: 'Recipes Shared' },
                                { value: '15,000+', label: 'Happy Cooks' },
                                { value: '50+', label: 'Countries' },
                                { value: '4.8', label: 'Average Rating' },
                            ].map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="font-display text-4xl sm:text-5xl font-bold text-primary mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
