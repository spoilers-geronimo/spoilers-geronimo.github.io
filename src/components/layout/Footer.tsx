import { Link } from 'react-router-dom';
import { ChefHat, Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t border-border bg-card/50">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <ChefHat className="h-7 w-7 text-primary" />
                            <span className="font-display text-xl font-bold">
                                Kitchen<span className="text-primary">Delight</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-md">
                            Discover and share delicious recipes from home cooks around the world.
                            Join our community and start your culinary journey today.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/recipes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Browse Recipes
                                </Link>
                            </li>
                            <li>
                                <Link to="/create" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Submit Recipe
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-display font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/recipes?category=breakfast" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Breakfast
                                </Link>
                            </li>
                            <li>
                                <Link to="/recipes?category=main-course" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Main Course
                                </Link>
                            </li>
                            <li>
                                <Link to="/recipes?category=dessert" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Desserts
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        © 2024 Kitchen Delight. Made with love for food lovers.
                    </p>
                </div>
            </div>
        </footer>
    );
};
