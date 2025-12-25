import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChefHat, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { account, ID } from '@/lib/appwrite';

const Signup = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match.",
                variant: "destructive",
            });
            return;
        }
        // Appwrite signup
        try {
            await account.create({
                userId: ID.unique(),
                email: formData.email,
                password: formData.password,
                name: formData.name
            });

            toast({
                title: "Account created!",
                description: "Welcome to Kitchen Delight. Please sign in to continue.",
            });
            navigate('/', { state: { openLogin: true } });
        } catch (error: any) {
            toast({
                title: "Signup failed",
                description: error.message || "An error occurred during signup.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen flex kitchen-pattern">
            {/* Left Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md animate-fade-in">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to home
                    </Link>

                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <ChefHat className="h-8 w-8 text-primary" />
                            <span className="font-display text-2xl font-bold">
                                Kitchen<span className="text-primary">Delight</span>
                            </span>
                        </div>
                        <h1 className="font-display text-3xl font-bold mb-2">Join Our Kitchen</h1>
                        <p className="text-muted-foreground">
                            Create an account and start sharing your recipes
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                            Create Account
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Panel - Image */}
            <div className="hidden lg:block flex-1 relative">
                <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=1600&fit=crop"
                    alt="Cooking"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                    <blockquote className="glass-card p-6 rounded-xl">
                        <p className="text-lg italic mb-3">
                            "Cooking is like love. It should be entered into with abandon or not at all."
                        </p>
                        <footer className="text-sm text-muted-foreground">— Harriet Van Horne</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default Signup;
