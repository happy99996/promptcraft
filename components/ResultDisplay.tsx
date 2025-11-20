import React, { useState } from 'react';
import { Copy, Check, FileText, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CategoryConfig } from '../types';

interface ResultDisplayProps {
  content: string;
  config: CategoryConfig;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, config, isLoading }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Syntax Highlighter helper
  const highlightJson = (jsonStr: string) => {
    if (!jsonStr) return '';
    const html = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return html.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'text-blue-400';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-rose-400'; // Keys
            } else {
                cls = config.textColor; // Values match the theme
            }
        } else if (/true|false/.test(match)) {
            cls = 'text-blue-400 font-bold';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  };

  // Updated Header to accept a label (e.g. 'json', 'text')
  const CodeBlockHeader = ({ code, label = 'code' }: { code: string, label?: string }) => {
    const [blockCopied, setBlockCopied] = useState(false);
    const handleBlockCopy = async () => {
        await navigator.clipboard.writeText(code);
        setBlockCopied(true);
        setTimeout(() => setBlockCopied(false), 2000);
    };
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-[#1e1e1e] border-b border-white/5 select-none rounded-t-lg">
            <span className="text-xs text-slate-400 font-mono opacity-70 uppercase">{label}</span>
            <button onClick={handleBlockCopy} className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
                {blockCopied ? <Check className={`w-3 h-3 ${config.textColor}`} /> : <Copy className="w-3 h-3" />}
                <span>{blockCopied ? 'Copied' : 'Copy code'}</span>
            </button>
        </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[300px] bg-[#0F131F] border border-slate-800 rounded-xl p-10 flex flex-col items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 ${config.bgColor} opacity-5`}></div>
        <div className={`w-16 h-16 border-4 border-slate-800 rounded-full animate-spin mb-6 ${config.textColor}`} style={{borderTopColor: 'currentColor'}}></div>
        <p className="text-slate-300 font-medium relative z-10">Processing Request...</p>
      </div>
    );
  }

  if (!content) {
    return null; 
  }

  return (
    <div className={`w-full bg-[#0F131F] border border-slate-800 rounded-xl shadow-xl overflow-hidden`}>
      {/* Header */}
      <div className="h-12 border-b border-slate-800 bg-[#161b2c] flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${config.bgColor} ${config.glowColor}`}></div>
            <span className="text-sm font-bold text-slate-200">Enhanced Result</span>
        </div>
        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors">
            {copied ? <Check className={`w-4 h-4 ${config.textColor}`} /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        
        {/* Internal Label */}
        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <FileText className="w-3 h-3" />
            Main Prompt
        </div>

        <div className="prose prose-invert prose-sm max-w-none text-slate-300">
            <ReactMarkdown
                components={{
                    h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mb-4 pb-2 border-b border-slate-800" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-white mt-6 mb-3" {...props} />,
                    h3: ({node, ...props}) => (
                        <h3 className={`text-xs font-bold ${config.textColor} mt-8 mb-3 uppercase tracking-widest flex items-center gap-2`} {...props}>
                            <Terminal className="w-3 h-3" />
                            {props.children}
                        </h3>
                    ),
                    p: ({node, ...props}) => <p className="mb-4 text-slate-300 leading-7 font-mono text-[13px] md:text-sm" {...props} />,
                    code: ({node, className, children, ...props}) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : 'text';
                        const isJson = language === 'json';
                        const codeString = String(children).replace(/\n$/, '');
                        const isInline = !match;

                        if (isInline) {
                            // Inline code background opacity is low, using primary color
                            return <code className={`font-mono ${config.textColor} bg-slate-800 px-1 rounded`} {...props}>{children}</code>;
                        }

                        // Special rendering for JSON to add syntax highlighting
                        if (isJson) {
                            const highlightedHtml = highlightJson(codeString);
                            return (
                                <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#0B0E14] my-6 shadow-lg">
                                    <CodeBlockHeader code={codeString} label="json" />
                                    <pre className="p-4 overflow-x-auto custom-scrollbar text-[13px] font-mono leading-6 text-slate-300">
                                        <code dangerouslySetInnerHTML={{__html: highlightedHtml}} />
                                    </pre>
                                </div>
                            );
                        }

                        // Standard rendering for other blocks (Text, SQL, etc) - NOW WITH COPY HEADER
                        return (
                             <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#0B0E14] my-6 shadow-lg">
                                <CodeBlockHeader code={codeString} label={language} />
                                <pre className="p-4 overflow-x-auto custom-scrollbar text-[13px] font-mono leading-6 text-slate-200">
                                    <code className={className} {...props}>{children}</code>
                                </pre>
                            </div>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;