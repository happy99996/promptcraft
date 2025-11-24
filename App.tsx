
import React, { useState, useEffect } from 'react';
import { PromptCategory, HistoryItem } from './types';
import { enhancePrompt } from './services/geminiService';
import CategorySelector from './components/CategorySelector';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/ResultDisplay';
import HistorySidebar from './components/HistorySidebar';
import PromptBuilder from './components/PromptBuilder';
import Logo from './components/Logo';
import { CATEGORIES, PLACEHOLDERS } from './constants';
import { History, ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>(PromptCategory.IMAGE);
  const [enhancedResult, setEnhancedResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Mode Toggle: 'simple' vs 'builder'
  const [inputMode, setInputMode] = useState<'simple' | 'builder'>('simple');
  
  // Mouse position state for interactive background
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates to range -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem('prompt_craft_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem('prompt_craft_history', JSON.stringify(history));
  }, [history]);

  const handleEnhance = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setEnhancedResult('');

    try {
      const result = await enhancePrompt(inputText, selectedCategory);
      setEnhancedResult(result);

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        original: inputText,
        enhanced: result,
        category: selectedCategory,
        timestamp: Date.now(),
      };

      setHistory(prev => [newHistoryItem, ...prev].slice(0, 50));
    } catch (error) {
      console.error("Enhancement failed:", error);
      // Provide better error feedback for missing API key
      if (error instanceof Error && (error.message.includes("API Key") || error.message.includes("403") || error.message.includes("400"))) {
        setEnhancedResult("⚠️ Configuration Error: API Key is missing or invalid.\n\nIf you are on Vercel, please go to Settings > Environment Variables and add 'API_KEY'. Then redeploy.");
      } else {
        setEnhancedResult("Sorry, something went wrong while enhancing your prompt. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setInputText(item.original);
    setEnhancedResult(item.enhanced);
    
    const categoryExists = CATEGORIES.some(c => c.id === item.category);
    if (categoryExists) {
        setSelectedCategory(item.category);
    } else {
        setSelectedCategory(PromptCategory.IMAGE);
    }
    // Default back to simple mode when loading history
    setInputMode('simple');
  };

  const currentCategoryConfig = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="relative min-h-screen w-full flex bg-[#0B0F19] text-slate-200 font-sans selection:bg-slate-700 overflow-hidden">
      
      {/* Interactive Dynamic Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Tech Grid Overlay */}
        <div 
            className="absolute inset-0 opacity-[0.03] z-0"
            style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)'
            }}
        />

        {/* Layered Blobs per Category to allow cross-fading */}
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${selectedCategory === cat.id ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Blob 1: Top Left - Primary Deep */}
            <div 
                className={`absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen blur-[100px] opacity-20 bg-gradient-to-br ${cat.gradientFrom} ${cat.gradientTo} animate-gradient-flow animate-breathe-slow`}
                style={{
                    transform: `translate(${-mousePos.x * 40}px, ${-mousePos.y * 40}px)`
                }}
            />

            {/* Blob 2: Top Right - Secondary Bright */}
            <div 
                className={`absolute top-[0%] -right-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen blur-[120px] opacity-25 bg-gradient-to-bl ${cat.gradientTo} ${cat.gradientFrom} animate-gradient-flow animate-breathe`}
                style={{
                   transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 25}px)`,
                }}
            />

            {/* Blob 3: Bottom Left - Accent Light */}
            <div 
                className={`absolute -bottom-[25%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-plus-lighter blur-[90px] opacity-15 bg-gradient-to-tr ${cat.gradientFrom} to-white/20 animate-gradient-flow animate-breathe-slow`}
                style={{
                     transform: `translate(${mousePos.x * 30}px, ${-mousePos.y * 30}px)`
                }}
            />

             {/* Blob 4: Bottom Right - Deep Anchor */}
            <div 
                className={`absolute -bottom-[15%] -right-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-normal blur-[130px] opacity-20 bg-gradient-to-tl ${cat.gradientTo} to-[#0B0F19] animate-gradient-flow animate-breathe`}
                style={{
                     transform: `translate(${-mousePos.x * 20}px, ${mousePos.y * 40}px)`
                }}
            />

            {/* Blob 5: Center/Floating - Dynamic Overlay */}
            <div 
                className={`absolute top-[30%] left-[25%] w-[40vw] h-[40vw] rounded-full mix-blend-overlay blur-[80px] opacity-10 bg-gradient-to-r ${cat.gradientFrom} ${cat.gradientTo} animate-gradient-flow animate-breathe-slow`}
                style={{
                     transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`
                }}
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Header */}
        <header className="flex-none h-16 border-b border-white/5 bg-[#0B0F19]/60 backdrop-blur-md flex items-center justify-between px-6 md:px-8 z-20">
          <div className="flex items-center space-x-3">
            <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${currentCategoryConfig.gradientFrom} ${currentCategoryConfig.gradientTo} flex items-center justify-center shadow-lg transition-all duration-500`}>
              {/* Passed mousePos to Logo for interactive tracking */}
              <Logo className="w-10 h-10 text-white" mousePos={mousePos} />
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight leading-none font-['Space_Grotesk']">
                    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-white via-white ${currentCategoryConfig.gradientFrom} ${currentCategoryConfig.gradientTo} bg-[length:300%_auto] animate-gradient-flow`}>
                        PromptCraft
                    </span>
                </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors text-xs font-medium text-slate-300"
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center">
            
            {/* Hero */}
            <div className="text-center mb-10 animate-fade-in relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl font-['Space_Grotesk']">
                Transform ideas into <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentCategoryConfig.gradientFrom} ${currentCategoryConfig.gradientTo} transition-all duration-500`}>golden prompts</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Choose a category and let AI refine instructions for professional results.
              </p>
            </div>

            {/* Categories */}
            <div className="w-full mb-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
                <CategorySelector 
                selected={selectedCategory} 
                onSelect={(cat) => {
                  setSelectedCategory(cat);
                  setInputText(''); // Clear input on category switch
                }} 
                />
            </div>

            {/* Input Section */}
            <div className="w-full animate-fade-in" style={{animationDelay: '0.2s'}}>
                
                 {/* Show Builder if active */}
                 {inputMode === 'builder' && (
                   <PromptBuilder 
                      category={selectedCategory}
                      config={currentCategoryConfig}
                      onUpdate={setInputText}
                   />
                 )}

                 <PromptInput 
                  value={inputText}
                  onChange={setInputText}
                  onEnhance={handleEnhance}
                  onClear={() => setInputText('')}
                  isLoading={isLoading}
                  placeholder={PLACEHOLDERS[selectedCategory]}
                  config={currentCategoryConfig}
                  isReadOnly={inputMode === 'builder'}
                  inputMode={inputMode}
                  onModeChange={setInputMode}
                />
            </div>

            {/* Directional Arrow */}
            <div className="my-6 animate-fade-in opacity-50 transition-transform duration-500" style={{animationDelay: '0.3s', transform: `translateY(${mousePos.y * 5}px)`}}>
                 <div className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <ArrowDown className="w-5 h-5 text-slate-500" />
                 </div>
            </div>

            {/* Output Section */}
            <div className="w-full pb-20 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <ResultDisplay 
                  content={enhancedResult} 
                  config={currentCategoryConfig}
                  isLoading={isLoading}
                />
            </div>

          </div>
        </div>
      </main>

      {/* History Sidebar */}
      <HistorySidebar 
        history={history}
        onSelect={handleHistorySelect}
        onClear={() => setHistory([])}
        isOpen={isSidebarOpen}
        toggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
      />
    </div>
  );
};

export default App;
