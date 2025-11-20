import React from 'react';
import { HistoryItem } from '../types';
import { Clock, Trash2 } from 'lucide-react';

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  isOpen: boolean;
  toggleOpen: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, onClear, isOpen, toggleOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40"
          onClick={toggleOpen}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`
        fixed top-0 right-0 h-full z-50
        w-80 bg-[#0B0F19] border-l border-slate-800
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col shadow-2xl
      `}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#161b2c]">
          <div className="flex items-center space-x-2 text-slate-200">
            <Clock className="w-4 h-4" />
            <span className="font-bold text-sm">Request History</span>
          </div>
          {history.length > 0 && (
            <button 
              onClick={onClear}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 px-2 py-1 rounded hover:bg-rose-900/20 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-600 text-center">
                <Clock className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-xs">No history yet.</p>
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                    onSelect(item);
                    toggleOpen();
                }}
                className="group bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 rounded-lg p-3 cursor-pointer transition-all active:scale-[0.98]"
              >
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-500/80 bg-emerald-900/10 px-1.5 py-0.5 rounded border border-emerald-500/10">
                        {item.category}
                    </span>
                    <span className="text-[10px] text-slate-600">
                        {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-2 font-mono">
                    {item.original}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HistorySidebar;