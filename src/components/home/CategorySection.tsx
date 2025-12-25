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
    }
    // {
    //     name: 'Salad',
    //     image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
    //     count: 167,
    // },
];

export const CategorySection = () => {
    const bookColors = [
        '#8B4513', // SaddleBrown
        '#2F4F4F', // DarkSlateGray
        '#556B2F', // DarkOliveGreen
        '#800000', // Maroon
        '#191970', // MidnightBlue
        '#483D8B', // DarkSlateBlue
    ];


    return (
        <section className="py-20">
            <div className="container">
                <div className="mb-20">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                        Explore by <span className="text-primary">Category</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Open a book of flavors and explore our curated collection of recipes
                    </p>
                </div>

                {/* Bookshelf Container */}
                <div className="relative w-full [perspective:30000px]">
                    {/* Shelf Surface (Visual only, behind books) */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#e0c077] [transform:translateZ(-10px)] rounded-sm shadow-xl hidden lg:block" style={{ boxShadow: '0 20px 30px rgba(0,0,0)' }}></div>

                    <div className="flex flex-wrap justify-between sm:justify-center items-end gap-x-2 gap-y-10 sm:gap-x-8 sm:gap-y-16 lg:gap-x-12 px-0 sm:px-4 pb-4">
                        {categories.map((category, index) => {
                            const color = bookColors[index % bookColors.length];
                            return (
                                <Link
                                    key={category.name}
                                    to={`/recipes?category=${category.name.toLowerCase()}`}
                                    className="group relative w-[30%] sm:w-44 aspect-[3/4] [transform-style:preserve-3d] transition-transform duration-500 ease-out hover:[transform:rotateY(45deg)_translateY(-20px)] cursor-pointer"
                                >
                                    {/* Book Spine (Left side) */}
                                    <div
                                        className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 origin-left [transform:rotateY(90deg)] flex items-center justify-center overflow-hidden border-r border-black/10"
                                        style={{ backgroundColor: color }}
                                    >
                                        <span className="text-white/80 font-serif text-[10px] sm:text-sm tracking-widest whitespace-nowrap rotate-90 font-bold uppercase">
                                            {category.name}
                                        </span>
                                    </div>

                                    {/* Book Cover (Front) */}
                                    <div
                                        className="absolute inset-0 rounded-r-sm sm:rounded-r-md shadow-2xl [backface-visibility:hidden] origin-left overflow-hidden bg-cover bg-center border-l-2 border-white/10"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    >
                                        <div
                                            className="absolute inset-0 opacity-30 transition-opacity duration-300 group-hover:opacity-100"
                                            style={{ backgroundColor: color, mixBlendMode: 'multiply' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                                        {/* Cover Content */}
                                        <div className="absolute inset-0 p-2 sm:p-4 flex flex-col justify-between text-center select-none">
                                            <div className="border border-white/30 h-full w-full p-1 sm:p-2 flex flex-col items-center justify-center rounded-sm">
                                                <h3 className="font-display font-bold text-sm sm:text-2xl text-white drop-shadow-md mb-1 sm:mb-2 leading-tight break-words">
                                                    {category.name}
                                                </h3>
                                                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                                    <span className="text-white text-[10px] sm:text-xs font-semibold">{category.count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Book Pages (Right side) */}
                                    <div
                                        className="absolute right-0 top-1 bottom-1 w-2 sm:w-3 bg-[#fff9f0] [transform:rotateY(90deg)] origin-right shadow-inner"
                                        style={{
                                            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)',
                                            backgroundSize: '2px 100%'
                                        }}
                                    />

                                    {/* Shadow */}
                                    <div className="absolute bottom-[-15px] left-2 right-2 h-4 bg-black/40 blur-md rounded-full transform scale-x-90 transition-all duration-500 group-hover:translate-y-6 group-hover:scale-x-75 group-hover:bg-black/10 group-hover:blur-lg" />

                                </Link>
                            );
                        })}
                    </div>

                    {/* Shelf Front Face (Visual) */}
                    {/* <div className="relative h-12 bg-[#c19b6e] mx-auto max-w-[98%] shadow-xl [transform:perspective(2000px)_rotateX(12deg)] origin-top hidden lg:block"></div> */}

                </div>

                {/* Mobile Shelf (Simpler background for mobile) */}
                {/* <div className="lg:hidden absolute bottom-0 left-0 right-0 h-4 bg-[#d4b48e] shadow-inner"></div> */}
            </div>
        </section>
    );
};
