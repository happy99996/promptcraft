
export enum PromptCategory {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  SYSTEM = 'SYSTEM',
  WEB_APP = 'WEB_APP',
  MOBILE_APP = 'MOBILE_APP',
  WEBSITE = 'WEBSITE'
}

export interface HistoryItem {
  id: string;
  original: string;
  enhanced: string;
  category: PromptCategory;
  timestamp: number;
}

export interface CategoryConfig {
  id: PromptCategory;
  label: string;
  icon: string;
  description: string;
  // Dynamic Styling Properties
  textColor: string;         // e.g., text-purple-400
  borderColor: string;       // e.g., border-purple-500/50
  bgColor: string;           // e.g., bg-purple-500
  hoverBgColor: string;      // e.g., hover:bg-purple-400
  shadowColor: string;       // e.g., shadow-purple-900/20
  glowColor: string;         // e.g., shadow-[0_0_15px_rgba(168,85,247,0.15)]
  gradientFrom: string;      // e.g., from-purple-400
  gradientTo: string;        // e.g., to-indigo-400
}

export type EnhancementStatus = 'idle' | 'loading' | 'success' | 'error';

// Builder Types
export type BuilderFieldType = 'text' | 'textarea' | 'select' | 'multiselect';

export interface BuilderOption {
  label: string;
  value: string;
}

export interface BuilderField {
  id: string;
  label: string;
  type: BuilderFieldType;
  placeholder?: string;
  options?: BuilderOption[]; // Only for 'select' or 'multiselect'
  defaultValue?: string;
  prefix?: string; // Text to prepend when building string (e.g. "Style: ")
}

export interface BuilderSection {
  title: string;
  fields: BuilderField[];
}

export interface BuilderConfig {
  sections: BuilderSection[];
  template: (values: Record<string, string>) => string;
}
