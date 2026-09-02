"use client";

export default function CategoryMobileFilter({
  categories,
  activeCategory,
  setActiveCategory,
  setCurrentPage,
}) {
  return (
    <div className="lg:hidden mb-4">
      <div className="flex items-center gap-2 p-1.5 bg-[#EFECE3] backdrop-blur-2xl rounded-2xl border border-cart-boarder shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] overflow-x-auto no-scrollbar">
        {categories.map((category) => {
          const active = category.id === activeCategory;
          return (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentPage(0);
              }}
              className={`
                px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 whitespace-nowrap backdrop-blur-sm
                ${
                  active
                    ? "bg-primary/30 text-[#500000] border border-[#e56b6b]/40 shadow-lg shadow-primary/10 scale-[1.02]"
                    : "bg-white/40 border border-transparent text-gray-600 hover:bg-white/80 hover:text-primary"
                }
              `}
            >
              {category.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}