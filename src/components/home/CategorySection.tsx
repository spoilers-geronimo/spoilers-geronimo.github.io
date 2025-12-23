import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=400&fit=crop',
    count: 156,
    spineColor: 'from-amber-700 to-amber-900',
    coverColor: 'from-amber-600 to-amber-800',
  },
  {
    name: 'Main Course',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
    count: 423,
    spineColor: 'from-red-700 to-red-900',
    coverColor: 'from-red-600 to-red-800',
  },
  {
    name: 'Dessert',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop',
    count: 289,
    spineColor: 'from-pink-700 to-pink-900',
    coverColor: 'from-pink-600 to-pink-800',
  },
  {
    name: 'Appetizer',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=400&fit=crop',
    count: 178,
    spineColor: 'from-emerald-700 to-emerald-900',
    coverColor: 'from-emerald-600 to-emerald-800',
  },
  {
    name: 'Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop',
    count: 94,
    spineColor: 'from-orange-700 to-orange-900',
    coverColor: 'from-orange-600 to-orange-800',
  },
  {
    name: 'Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    count: 167,
    spineColor: 'from-green-700 to-green-900',
    coverColor: 'from-green-600 to-green-800',
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

        {/* Bookshelf */}
        <div className="relative">
          {/* Books container */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pb-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/recipes?category=${category.name.toLowerCase()}`}
                className="group animate-fade-in block"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  perspective: '1000px',
                }}
              >
                {/* 3D Book Container */}
                <div 
                  className="relative h-64 sm:h-72 transition-transform duration-500 ease-out group-hover:-translate-y-4"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Book spine (left side) */}
                  <div 
                    className={`absolute left-0 top-0 w-6 h-full bg-gradient-to-b ${category.spineColor} rounded-l-sm shadow-inner`}
                    style={{ 
                      transform: 'rotateY(-90deg) translateX(-12px)',
                      transformOrigin: 'right center',
                    }}
                  >
                    <div className="h-full flex items-center justify-center">
                      <span 
                        className="text-white/90 font-display font-bold text-xs tracking-widest whitespace-nowrap"
                        style={{ 
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        {category.name.toUpperCase()}
                      </span>
                    </div>
                    {/* Spine decorations */}
                    <div className="absolute top-3 left-1 right-1 h-0.5 bg-amber-300/30 rounded" />
                    <div className="absolute bottom-3 left-1 right-1 h-0.5 bg-amber-300/30 rounded" />
                  </div>

                  {/* Book front cover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${category.coverColor} rounded-r-md rounded-l-sm overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl`}
                    style={{ 
                      transform: 'translateZ(12px)',
                      transformOrigin: 'left center',
                    }}
                  >
                    {/* Cover image */}
                    <div className="absolute inset-2 rounded overflow-hidden border-2 border-amber-200/20">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>

                    {/* Cover text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                      <h3 className="font-display font-bold text-lg text-white drop-shadow-lg mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm font-medium">
                        {category.count} recipes
                      </p>
                    </div>

                    {/* Cover embossing effect */}
                    <div className="absolute top-2 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded" />
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded" />
                    
                    {/* Gold corners */}
                    <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-amber-300/40 rounded-tl" />
                    <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-300/40 rounded-tr" />
                    <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-300/40 rounded-bl" />
                    <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-300/40 rounded-br" />
                  </div>

                  {/* Book pages (right edge) */}
                  <div 
                    className="absolute right-0 top-1 bottom-1 w-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-r-sm"
                    style={{ 
                      transform: 'translateZ(11px)',
                      boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {/* Page lines */}
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute left-0 right-1 h-px bg-amber-200/60"
                        style={{ top: `${12 + i * 11}%` }}
                      />
                    ))}
                  </div>

                  {/* Book shadow on shelf */}
                  <div 
                    className="absolute -bottom-2 left-2 right-2 h-4 bg-black/30 blur-md rounded-full transition-all duration-500 group-hover:blur-lg group-hover:bg-black/40"
                    style={{ transform: 'translateZ(-10px)' }}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Bookshelf */}
          <div className="relative mt-2">
            {/* Shelf top surface */}
            <div className="h-4 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-sm shadow-inner" />
            {/* Shelf front */}
            <div className="h-6 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-md shadow-lg">
              <div className="absolute inset-x-0 top-0 h-px bg-amber-700/50" />
              <div className="absolute inset-x-4 top-2 bottom-2 border-t border-amber-700/30" />
            </div>
            {/* Shelf shadow */}
            <div className="absolute -bottom-4 inset-x-8 h-4 bg-black/20 blur-md rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
