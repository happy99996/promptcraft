import React from 'react';
import { Sparkles, Type, SlidersHorizontal } from 'lucide-react';
import { CategoryConfig } from '../types';

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onEnhance: () => void;
  onClear: () => void;
  isLoading: boolean;
  placeholder: string;
  config: CategoryConfig;
  isReadOnly?: boolean;
  inputMode: 'simple' | 'builder';
  onModeChange: (mode: 'simple' | 'builder') => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  value, 
  onChange, 
  onEnhance, 
  onClear, 
  isLoading, 
  placeholder, 
  config, 
  isReadOnly = false,
  inputMode,
  onModeChange
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onEnhance();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-end px-1">
        <label className="text-sm font-medium text-slate-300">
            {isReadOnly ? 'Generated Prompt Preview' : 'Enter your basic prompt (Manual)'}
        </label>
        <span className={`text-[10px] bg-slate-800 px-2 py-1 rounded border border-slate-700 uppercase tracking-wider ${config.textColor}`}>
            {config.label} Mode
        </span>
      </div>
      
      <div className={`relative bg-[#0F131F] border border-slate-800 rounded-xl shadow-lg transition-colors overflow-hidden group ${!isReadOnly && 'focus-within:border-slate-600'}`}>
        
        {/* Text Area */}
        <textarea
            className={`w-full min-h-[100px] bg-transparent text-slate-200 p-4 resize-none focus:outline-none font-mono text-base leading-relaxed placeholder-slate-600 custom-scrollbar ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => !isReadOnly && onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            readOnly={isReadOnly}
        />

        {/* Footer Toolbar */}
        <div className="px-4 py-3 bg-[#161b2c] border-t border-slate-800 flex flex-wrap gap-3 justify-between items-center">
            <div className="flex items-center gap-4 text-xs text-slate-500 font-mono hidden sm:flex">
               <span>{value.trim().split(/\s+/).filter(w => w.length > 0).length} words</span>
               <span className="w-px h-3 bg-slate-700"></span>
               <span>{value.length} chars</span>
               {!isReadOnly && (
                 <>
                   <span className="w-px h-3 bg-slate-700"></span>
                   <span>Ctrl+Enter to generate</span>
                 </>
               )}
            </div>

            <div className="flex items-center gap-3 ml-auto sm:ml-0 w-full sm:w-auto justify-end">
                {/* Mode Toggles */}
                <div className="flex bg-[#0B0F19] p-1 rounded-lg border border-slate-700/50">
                  <button 
                    onClick={() => onModeChange('simple')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${inputMode === 'simple' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <Type className="w-3 h-3" />
                    Manual
                  </button>
                  <button 
                    onClick={() => onModeChange('builder')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${inputMode === 'builder' ? `${config.bgColor} text-white shadow-sm` : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    Builder
                  </button>
                </div>

                {/* Enhance Button */}
                <button
                    onClick={onEnhance}
                    disabled={isLoading || !value.trim()}
                    className={`
                        flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200
                        ${isLoading || !value.trim() 
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                        : `${config.bgColor} ${config.hoverBgColor} text-white shadow-lg ${config.shadowColor} hover:-translate-y-0.5`
                        }
                    `}
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Sparkles className="w-4 h-4" />
                    )}
                    <span>Enhance</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;