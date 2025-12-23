import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=400&fit=crop',
    count: 156,
  },
  {
    name: 'Main Course',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
    count: 423,
  },
  {
    name: 'Dessert',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop',
    count: 289,
  },
  {
    name: 'Appetizer',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=400&fit=crop',
    count: 178,
  },
  {
    name: 'Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop',
    count: 94,
  },
  {
    name: 'Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    count: 167,
  },
];

export const CategorySection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Explore by <span className="text-primary">Category</span>
          </h2>
          <p className="text-muted-foreground">
            Find the perfect recipe for any occasion
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/recipes?category=${category.name.toLowerCase()}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                  <h3 className="font-display font-semibold text-lg text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {category.count} recipes
                  </p>
                </div>
                <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 rounded-2xl transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
