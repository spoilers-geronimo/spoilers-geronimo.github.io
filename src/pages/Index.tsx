import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedRecipes } from '@/components/home/FeaturedRecipes';
import { CategorySection } from '@/components/home/CategorySection';

const Index = () => {
    return (
        <div className="flex flex-col">
            <HeroSection />
            <FeaturedRecipes />
            <CategorySection />
        </div>
    );
};

export default Index;
