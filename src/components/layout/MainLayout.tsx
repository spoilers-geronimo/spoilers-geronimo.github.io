import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoginModal } from '@/components/auth/LoginModal';
import { account } from '@/lib/appwrite';
import { useToast } from '@/hooks/use-toast';

export const MainLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const location = useLocation();
    const { toast } = useToast();

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkSession();

        if (location.state?.openLogin) {
            setLoginModalOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            setIsLoggedIn(false);
            toast({
                title: "Logged out",
                description: "You have been successfully logged out.",
            });
        } catch (error) {
            toast({
                title: "Logout failed",
                description: "There was a problem logging out.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header
                isLoggedIn={isLoggedIn}
                onLoginClick={() => setLoginModalOpen(true)}
                onLogout={handleLogout}
            />

            <main className="flex-1">
                <Outlet context={{ isLoggedIn, setIsLoggedIn, loginModalOpen, setLoginModalOpen }} />
            </main>

            <Footer />

            <LoginModal
                open={loginModalOpen}
                onOpenChange={setLoginModalOpen}
                onLogin={() => setIsLoggedIn(true)}
            />
        </div>
    );
};
