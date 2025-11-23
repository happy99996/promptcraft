
import React, { useEffect, useState, useRef } from 'react';
import { PromptCategory, CategoryConfig, BuilderOption } from '../types';
import { BUILDER_CONFIG } from '../constants';
import { Settings2, RotateCcw, ChevronDown, ChevronUp, CheckCircle2, X, Check } from 'lucide-react';

interface PromptBuilderProps {
  category: PromptCategory;
  config: CategoryConfig;
  onUpdate: (builtPrompt: string) => void;
}

// Internal MultiSelect Component
const MultiSelectField = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder, 
  baseColor 
}: { 
  options?: BuilderOption[], 
  value: string, 
  onChange: (val: string) => void, 
  placeholder?: string,
  baseColor: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Value is stored as comma-separated string
  const selectedValues = value ? value.split(', ').filter(Boolean) : [];

  const toggleOption = (optValue: string) => {
    let newValues;
    if (selectedValues.includes(optValue)) {
      newValues = selectedValues.filter(v => v !== optValue);
    } else {
      newValues = [...selectedValues, optValue];
    }
    onChange(newValues.join(', '));
  };

  const removeValue = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    onChange(selectedValues.filter(v => v !== val).join(', '));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative group/input" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-black/20 border border-slate-700/80 rounded-lg px-4 py-2.5 min-h-[46px] text-sm text-slate-200 cursor-pointer transition-all shadow-sm flex flex-wrap gap-2 items-center
          ${isOpen ? `border-${baseColor}-500 ring-1 ring-${baseColor}-500/50` : 'hover:border-slate-600'}
        `}
      >
        {selectedValues.length === 0 && (
          <span className="text-slate-600">{placeholder || 'Select options...'}</span>
        )}
        
        {selectedValues.map(val => {
          const label = options.find(o => o.value === val)?.label || val;
          return (
            <span key={val} className={`bg-${baseColor}-900/40 border border-${baseColor}-500/30 text-${baseColor}-200 text-xs px-2 py-1 rounded-md flex items-center gap-1`}>
              {label}
              <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={(e) => removeValue(e, val)} />
            </span>
          );
        })}

        <div className="ml-auto text-slate-500">
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#161b2c] border border-slate-700 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((opt) => {
            const isSelected = selectedValues.includes(opt.value);
            return (
              <div 
                key={opt.value}
                onClick={() => toggleOption(opt.value)}
                className={`
                  px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors
                  ${isSelected ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/50'}
                `}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className={`w-3.5 h-3.5 text-${baseColor}-400`} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const PromptBuilder: React.FC<PromptBuilderProps> = ({ category, config, onUpdate }) => {
  const builderConfig = BUILDER_CONFIG[category];
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(0);

  // Reset form when category changes
  useEffect(() => {
    setFormValues({});
    setOpenSectionIndex(0);
  }, [category]);

  // Update parent whenever form values change
  useEffect(() => {
    if (builderConfig) {
      const builtPrompt = builderConfig.template(formValues);
      onUpdate(builtPrompt);
    }
  }, [formValues, builderConfig, onUpdate]);

  const handleChange = (id: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleReset = () => {
    setFormValues({});
    setOpenSectionIndex(0);
  };

  const toggleSection = (index: number) => {
    setOpenSectionIndex(prev => (prev === index ? null : index));
  };

  if (!builderConfig) return null;

  // Extract base color name safely for focus rings
  const baseColor = config.textColor.split('-')[1] || 'slate';

  return (
    <div className={`w-full mb-8 bg-[#121623] border border-slate-800/60 rounded-xl shadow-2xl animate-fade-in relative group z-10`}>
      {/* Left Accent Border - rounded to match container since overflow is visible */}
      <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-xl ${config.bgColor}`}></div>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800/50 bg-[#161b2c]/50">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-slate-800/50 ${config.textColor} shadow-inner`}>
             <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                {config.label} Builder
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">Advanced Parameter Configuration</p>
          </div>
        </div>
        
        <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5 rounded-md hover:bg-slate-800 border border-transparent hover:border-slate-700"
            title="Reset Fields"
        >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
        </button>
      </div>

      {/* Accordion Sections */}
      <div className="divide-y divide-slate-800/50">
        {builderConfig.sections.map((section, idx) => {
          const isOpen = openSectionIndex === idx;
          // Check if any field in this section has a value
          const isFilled = section.fields.some(field => formValues[field.id] && formValues[field.id].trim() !== '');

          return (
            <div key={idx} className="bg-[#121623]">
              {/* Accordion Header */}
              <button 
                onClick={() => toggleSection(idx)}
                className={`w-full flex items-center justify-between p-4 transition-colors ${isOpen ? 'bg-slate-800/30' : 'hover:bg-slate-800/20'}`}
              >
                <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${isOpen || isFilled ? config.borderColor : 'border-slate-700 bg-slate-900'}`}>
                        <span className={`text-xs font-bold ${isOpen || isFilled ? config.textColor : 'text-slate-500'}`}>
                            {idx + 1}
                        </span>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${isOpen ? 'text-white' : 'text-slate-400'}`}>
                        {section.title}
                    </span>
                    {isFilled && (
                        <CheckCircle2 className={`w-3.5 h-3.5 ${config.textColor}`} />
                    )}
                </div>
                <div className="text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="p-6 bg-[#0B0F19]/30 animate-fade-in">
                     {/* Grid Layout: 1 col mobile, 2 cols desktop with ample gap */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {section.fields.map((field) => (
                          <div 
                            key={field.id} 
                            className={`flex flex-col gap-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
                          >
                            <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wide">
                              {field.label}
                            </label>
                            
                            {field.type === 'multiselect' ? (
                                <MultiSelectField 
                                    options={field.options}
                                    value={formValues[field.id] || ''}
                                    onChange={(val) => handleChange(field.id, val)}
                                    placeholder={field.placeholder}
                                    baseColor={baseColor}
                                />
                            ) : field.type === 'select' ? (
                              <div className="relative group/input">
                                <select
                                  value={formValues[field.id] || ''}
                                  onChange={(e) => handleChange(field.id, e.target.value)}
                                  className={`
                                    w-full bg-black/20 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 appearance-none focus:outline-none transition-all shadow-sm
                                    focus:border-${baseColor}-500 focus:ring-1 focus:ring-${baseColor}-500/50 hover:border-slate-600 cursor-pointer
                                  `}
                                >
                                  {field.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200 py-2">
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover/input:text-slate-300 transition-colors">
                                  <ChevronDown className="w-4 h-4" />
                                </div>
                              </div>
                            ) : field.type === 'textarea' ? (
                              <textarea
                                value={formValues[field.id] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                rows={3}
                                className={`
                                  w-full bg-black/20 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all resize-none shadow-sm
                                  focus:border-${baseColor}-500 focus:ring-1 focus:ring-${baseColor}-500/50 hover:border-slate-600
                                `}
                              />
                            ) : (
                              <input
                                type="text"
                                value={formValues[field.id] || ''}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                className={`
                                  w-full bg-black/20 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all shadow-sm
                                  focus:border-${baseColor}-500 focus:ring-1 focus:ring-${baseColor}-500/50 hover:border-slate-600
                                `}
                              />
                            )}
                          </div>
                        ))}
                     </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromptBuilder;
