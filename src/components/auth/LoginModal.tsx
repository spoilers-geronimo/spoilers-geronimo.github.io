import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChefHat, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { account } from '@/lib/appwrite';

interface LoginModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLogin: () => void;
}

export const LoginModal = ({ open, onOpenChange, onLogin }: LoginModalProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await account.createEmailPasswordSession(email, password);
            toast({
                title: "Login successful",
                description: "Welcome back to SavoryStories!",
            });
            onLogin();
            onOpenChange(false);
        } catch (error: any) {
            toast({
                title: "Login failed",
                description: error.message || "Please check your credentials.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center">
                    <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChefHat className="h-6 w-6 text-primary" />
                    </div>
                    <DialogTitle className="font-display text-2xl">Welcome Back!</DialogTitle>
                    <DialogDescription>
                        Sign in to your account to continue
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-primary hover:underline font-medium"
                        onClick={() => onOpenChange(false)}
                    >
                        Sign up
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};
