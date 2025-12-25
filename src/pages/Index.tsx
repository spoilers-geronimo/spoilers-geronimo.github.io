import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedRecipes } from '@/components/home/FeaturedRecipes';
import { CategorySection } from '@/components/home/CategorySection';

const Index = () => {
    return (
        <div className="flex flex-col">
            <HeroSection />
            <CategorySection />
            <FeaturedRecipes />
        </div>
    );
};

export default Index;
