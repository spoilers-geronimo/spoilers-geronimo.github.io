import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedRecipes } from '@/components/home/FeaturedRecipes';
import { CategorySection } from '@/components/home/CategorySection';
import { LoginModal } from '@/components/auth/LoginModal';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setLoginModalOpen(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturedRecipes />
        <CategorySection />
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

export default Index;
