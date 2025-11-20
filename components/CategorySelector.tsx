
import React from 'react';
import { CATEGORIES, IconMap } from '../constants';
import { PromptCategory } from '../types';

interface CategorySelectorProps {
  selected: PromptCategory;
  onSelect: (category: PromptCategory) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-5xl p-1 md:p-1.5 bg-[#0F131F]/80 backdrop-blur-md border border-slate-800 rounded-xl md:rounded-2xl shadow-2xl flex flex-col md:flex-row gap-1">
        {CATEGORIES.map((cat) => {
          const Icon = IconMap[cat.icon];
          const isSelected = selected === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`
                group relative flex-1 flex flex-col items-center justify-center gap-2 p-3 md:py-4 md:px-2 rounded-lg md:rounded-xl transition-all duration-300 ease-out overflow-hidden
                ${isSelected 
                  ? 'bg-slate-800 shadow-lg' 
                  : 'hover:bg-slate-800/40'
                }
              `}
            >
              {/* Background Glow for Active State */}
              {isSelected && (
                <div className={`absolute inset-0 opacity-10 ${cat.bgColor}`}></div>
              )}

              {/* Icon Container */}
              <div className={`
                p-2 rounded-lg transition-all duration-300
                ${isSelected ? 'bg-black/30 scale-110' : 'bg-slate-800/50 group-hover:bg-slate-800'}
                ${isSelected ? cat.textColor : 'text-slate-500 group-hover:text-slate-300'}
              `}>
                <Icon className="w-8 h-8" />
              </div>

              {/* Label */}
              <span className={`
                text-xs font-bold tracking-wide transition-colors duration-200 text-center
                ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}
              `}>
                {cat.label}
              </span>

              {/* Active Indicator (Bottom bar on desktop, Left bar on mobile) */}
              {isSelected && (
                <>
                    <div className={`hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-t-full ${cat.bgColor} shadow-[0_0_12px_currentColor]`}></div>
                    <div className={`md:hidden absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full ${cat.bgColor} shadow-[0_0_12px_currentColor]`}></div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
