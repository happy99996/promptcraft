
import { PromptCategory, CategoryConfig, BuilderConfig } from './types';
import { Image, Video, Terminal, AppWindow, Smartphone, Globe } from 'lucide-react';
import React from 'react';

export const CATEGORIES: CategoryConfig[] = [
  {
    id: PromptCategory.IMAGE,
    label: 'Image Generation',
    description: 'Detailed prompts for Midjourney, DALL-E. Includes JSON specs.',
    icon: 'image',
    // Green -> Yellow Gradient
    textColor: 'text-green-400',
    borderColor: 'border-green-500/50',
    bgColor: 'bg-green-600',
    hoverBgColor: 'hover:bg-green-500',
    shadowColor: 'shadow-green-900/20',
    glowColor: 'shadow-[0_0_15px_rgba(22,163,74,0.25)]',
    gradientFrom: 'from-green-600',
    gradientTo: 'to-yellow-400'
  },
  {
    id: PromptCategory.VIDEO,
    label: 'Video Generation',
    description: 'Motion-focused prompts for Veo, Sora. Includes technical JSON.',
    icon: 'video',
    // Rose -> Yellow Gradient
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/50',
    bgColor: 'bg-rose-600',
    hoverBgColor: 'hover:bg-rose-500',
    shadowColor: 'shadow-rose-900/20',
    glowColor: 'shadow-[0_0_15px_rgba(225,29,72,0.25)]',
    gradientFrom: 'from-rose-600',
    gradientTo: 'to-yellow-400'
  },
  {
    id: PromptCategory.SYSTEM,
    label: 'System Prompts',
    description: 'Persona and constraints for LLM agents.',
    icon: 'terminal',
    // Blue -> Green Gradient
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/50',
    bgColor: 'bg-blue-600',
    hoverBgColor: 'hover:bg-blue-500',
    shadowColor: 'shadow-blue-900/20',
    glowColor: 'shadow-[0_0_15px_rgba(37,99,235,0.25)]',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-green-500'
  },
  {
    id: PromptCategory.WEB_APP,
    label: 'Web Application',
    description: 'Full-stack logic, database schemas, and API endpoints.',
    icon: 'app-window',
    // Cyan -> Green Gradient
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    bgColor: 'bg-cyan-600',
    hoverBgColor: 'hover:bg-cyan-500',
    shadowColor: 'shadow-cyan-900/20',
    glowColor: 'shadow-[0_0_15px_rgba(8,145,178,0.25)]',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-green-500'
  },
  {
    id: PromptCategory.MOBILE_APP,
    label: 'Mobile App',
    description: 'Native UI/UX, touch interactions, and platform specifics.',
    icon: 'smartphone',
    // Orange -> Yellow Gradient
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/50',
    bgColor: 'bg-orange-600',
    hoverBgColor: 'hover:bg-orange-500',
    shadowColor: 'shadow-orange-900/20',
    glowColor: 'shadow-[0_0_15px_rgba(234,88,12,0.25)]',
    gradientFrom: 'from-orange-600',
    gradientTo: 'to-yellow-400'
  },
  {
    id: PromptCategory.WEBSITE,
    label: 'Website',
    description: 'Landing pages, marketing copy, and SEO structure.',
    icon: 'globe',
    // Emerald -> Cyan Gradient
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
    bgColor: 'bg-emerald-600',
    hoverBgColor: 'hover:bg-emerald-500',
    shadowColor: 'shadow-emerald-900/20',
    glowColor: 'shadow-[0_0_15px_rgba(5,150,105,0.25)]',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-cyan-400'
  }
];

// Mapping icon strings to Lucide components for rendering
export const IconMap: Record<string, React.FC<{ className?: string }>> = {
  'image': Image,
  'video': Video,
  'terminal': Terminal,
  'app-window': AppWindow,
  'smartphone': Smartphone,
  'globe': Globe
};

export const PLACEHOLDERS: Record<PromptCategory, string> = {
  [PromptCategory.IMAGE]: "e.g., A futuristic city with neon lights in cyberpunk style...",
  [PromptCategory.VIDEO]: "e.g., A drone shot flying through a canyon at sunset...",
  [PromptCategory.SYSTEM]: "e.g., You are a helpful customer service agent for a bank...",
  [PromptCategory.WEB_APP]: "e.g., A SaaS dashboard for project management with real-time collaboration...",
  [PromptCategory.MOBILE_APP]: "e.g., A fitness tracking app with social features for iOS...",
  [PromptCategory.WEBSITE]: "e.g., A high-conversion landing page for a coffee subscription service..."
};

// --- PROMPT BUILDER CONFIGURATION ---

export const BUILDER_CONFIG: Record<PromptCategory, BuilderConfig> = {
  [PromptCategory.IMAGE]: {
    sections: [
      {
        title: "Core Concept",
        fields: [
           { id: 'subject', label: 'Main Subject', type: 'textarea', placeholder: 'What do you want to see? (e.g., An astronaut on Mars)' },
        ]
      },
      {
        title: "Format & Composition",
        fields: [
          { 
            id: 'ratio', label: 'Aspect Ratio', type: 'select', 
            options: [
              { label: 'Square (1:1)', value: 'Square 1:1 aspect ratio' },
              { label: 'Landscape (16:9)', value: 'Wide 16:9 landscape aspect ratio' },
              { label: 'Portrait (9:16)', value: 'Tall 9:16 portrait aspect ratio' },
              { label: 'Ultrawide (21:9)', value: 'Cinematic 21:9 ultrawide aspect ratio' },
              { label: 'Classic Photo (3:2)', value: 'Classic 3:2 photography aspect ratio' },
              { label: 'TV (4:3)', value: '4:3 vintage TV aspect ratio' }
            ] 
          },
          { 
            id: 'camera', label: 'Camera Shot Type', type: 'select',
            options: [
              { label: 'Select View...', value: '' },
              { label: 'Wide Angle', value: 'wide angle shot, panoramic view' },
              { label: 'Macro', value: 'macro shot, extreme close-up' },
              { label: 'Drone View', value: 'aerial drone shot, bird\'s eye view' },
              { label: 'Portrait (85mm)', value: 'portrait lens (85mm), depth of field' },
              { label: 'Fish-eye', value: 'distorted fish-eye lens effect' },
              { label: 'Tilt-Shift', value: 'tilt-shift photography, miniature effect' },
              { label: 'Thermal', value: 'thermal imaging camera style' },
              { label: 'Low Angle', value: 'worm\'s eye view, low angle looking up' }
            ]
          },
          { id: 'framing', label: 'Composition Rule', type: 'text', placeholder: 'e.g., Rule of Thirds, Centered, Symmetrical' }
        ]
      },
      {
        title: "Visual Style",
        fields: [
          { 
            id: 'style', label: 'Art Medium', type: 'select', 
            options: [
              { label: 'Select Style...', value: '' },
              { label: 'Photorealistic (8k)', value: 'Photorealistic, 8k, highly detailed' },
              { label: 'Cyberpunk', value: 'Cyberpunk, neon lights, futuristic' },
              { label: 'Cinematic', value: 'Cinematic lighting, movie still, anamorphic lens' },
              { label: 'Anime/Manga', value: 'Anime style, Studio Ghibli inspired' },
              { label: 'Oil Painting', value: 'Oil painting on canvas, textured brushstrokes' },
              { label: '3D Render', value: 'Unreal Engine 5 render, Octane render, 3D' },
              { label: 'Minimalist', value: 'Minimalist, vector art, clean lines, flat color' },
              { label: 'Surrealism', value: 'Surrealism, dreamlike, Salvador Dali style' },
              { label: 'Pixel Art', value: '16-bit pixel art, retro game style' },
              { label: 'Watercolor', value: 'Watercolor painting, soft edges, bleeding colors' },
              { label: 'Isometric', value: 'Isometric 3D, diorama look' },
              { label: 'Low Poly', value: 'Low poly 3D art, geometric shapes' }
            ] 
          },
          { id: 'artist', label: 'Artist Inspiration', type: 'text', placeholder: 'e.g., Greg Rutkowski, Van Gogh, Wes Anderson' }
        ]
      },
      {
        title: "Advanced Details",
        fields: [
          { 
            id: 'lighting', label: 'Lighting', type: 'select',
            options: [
              { label: 'Select Lighting...', value: '' },
              { label: 'Golden Hour', value: 'soft golden hour sunlight' },
              { label: 'Volumetric', value: 'volumetric lighting, god rays' },
              { label: 'Studio', value: 'professional studio lighting, rim light' },
              { label: 'Dark/Moody', value: 'low key, dark, mysterious atmosphere' },
              { label: 'Neon', value: 'bright neon signage lighting' },
              { label: 'Bioluminescent', value: 'bioluminescent glow, magical lighting' },
              { label: 'Natural', value: 'soft natural daylight' },
              { label: 'Rembrandt', value: 'Rembrandt lighting, dramatic chiaroscuro' }
            ]
          },
          { id: 'palette', label: 'Color Palette', type: 'text', placeholder: 'e.g., Teal and Orange, Monochromatic Red, Pastel' },
          { id: 'negative', label: 'Negative Prompt (Avoid)', type: 'text', placeholder: 'e.g., blur, distortion, watermark, low quality' }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      if (v.subject) parts.push(`Subject: ${v.subject}`);
      if (v.style) parts.push(`Style: ${v.style}`);
      if (v.artist) parts.push(`Inspired by: ${v.artist}`);
      if (v.ratio) parts.push(`Format: ${v.ratio}`);
      if (v.camera) parts.push(`View: ${v.camera}`);
      if (v.framing) parts.push(`Composition: ${v.framing}`);
      if (v.lighting) parts.push(`Lighting: ${v.lighting}`);
      if (v.palette) parts.push(`Colors: ${v.palette}`);
      if (v.negative) parts.push(`Negative Prompt: ${v.negative}`);
      return parts.join('. ');
    }
  },
  [PromptCategory.VIDEO]: {
    sections: [
      {
        title: "Core Narrative",
        fields: [
          { id: 'subject', label: 'Scene Description', type: 'textarea', placeholder: 'What is happening in the scene? Describe the action.' },
          { id: 'mood', label: 'Atmosphere/Mood', type: 'text', placeholder: 'e.g., Tense, Peaceful, Chaotic, Ethereal' }
        ]
      },
      {
        title: "Cinematography",
        fields: [
           { 
            id: 'movement', label: 'Camera Movement', type: 'select',
            options: [
              { label: 'Select Movement...', value: '' },
              { label: 'Dolly In', value: 'Slow dolly in towards the subject' },
              { label: 'Pan Right', value: 'Smooth pan to the right' },
              { label: 'Orbit', value: 'Circular orbit around the subject' },
              { label: 'Tracking', value: 'Fast tracking shot following the action' },
              { label: 'FPV Drone', value: 'High speed FPV drone flight' },
              { label: 'Handheld', value: 'Shaky handheld camera' },
              { label: 'Crane Shot', value: 'Sweeping crane shot lifting up' },
              { label: 'Vertigo Effect', value: 'Dolly zoom / Vertigo effect' },
              { label: 'Static', value: 'Static tripod shot, no movement' }
            ]
          },
          {
            id: 'angle', label: 'Camera Angle', type: 'select',
            options: [
              { label: 'Eye Level', value: 'Eye level shot' },
              { label: 'Low Angle', value: 'Low angle shot looking up' },
              { label: 'High Angle', value: 'High angle shot looking down' },
              { label: 'Over the Shoulder', value: 'Over-the-shoulder POV shot' }
            ]
          }
        ]
      },
      {
        title: "Technical Specs",
        fields: [
          { 
            id: 'ratio', label: 'Aspect Ratio', type: 'select', 
            options: [
              { label: 'Landscape (16:9)', value: '16:9 landscape' },
              { label: 'Portrait (9:16)', value: '9:16 portrait for social media' },
              { label: 'Cinema (2.35:1)', value: '2.35:1 widescreen cinematic' },
              { label: 'IMAX (1.43:1)', value: '1.43:1 IMAX ratio' }
            ] 
          },
          {
            id: 'resolution', label: 'Resolution', type: 'select',
            options: [
                { label: '1080p', value: '1080p HD' },
                { label: '4K', value: '4K UHD' },
                { label: '8K', value: '8K Ultra HD' }
            ]
          },
          {
            id: 'fps', label: 'Frame Rate', type: 'select',
            options: [
                { label: '24 fps (Cinema)', value: '24 fps' },
                { label: '30 fps (Standard)', value: '30 fps' },
                { label: '60 fps (Smooth)', value: '60 fps' },
                { label: '120 fps (Slow Mo)', value: '120 fps slow motion' }
            ]
          }
        ]
      },
      {
         title: "Motion & Effects",
         fields: [
            {
                id: 'speed', label: 'Action Speed', type: 'select',
                options: [
                    { label: 'Real-time', value: 'Real-time speed' },
                    { label: 'Slow Motion', value: 'Cinematic slow motion' },
                    { label: 'Hyperlapse', value: 'Fast hyperlapse speed' },
                    { label: 'Stop Motion', value: 'Stop motion animation style' }
                ]
            },
            { id: 'strength', label: 'Motion Strength', type: 'text', placeholder: 'Low, Medium, High (Amount of movement)' }
         ]
      }
    ],
    template: (v) => {
      const parts = [];
      if (v.subject) parts.push(`Create a video of: ${v.subject}`);
      if (v.ratio) parts.push(`Aspect Ratio: ${v.ratio}`);
      if (v.movement) parts.push(`Camera Movement: ${v.movement}`);
      if (v.angle) parts.push(`Angle: ${v.angle}`);
      if (v.mood) parts.push(`Atmosphere: ${v.mood}`);
      if (v.resolution) parts.push(`Resolution: ${v.resolution}`);
      if (v.fps) parts.push(`Frame Rate: ${v.fps}`);
      if (v.speed) parts.push(`Speed: ${v.speed}`);
      if (v.strength) parts.push(`Motion Strength: ${v.strength}`);
      return parts.join('. ');
    }
  },
  [PromptCategory.SYSTEM]: {
    sections: [
      {
        title: "Persona Definition",
        fields: [
          { id: 'role', label: 'Agent Persona (Role)', type: 'text', placeholder: 'e.g., Senior Python Developer, Marketing Guru' },
          { id: 'tone', label: 'Tone of Voice', type: 'select',
            options: [
               { label: 'Professional', value: 'Professional, formal, and concise' },
               { label: 'Friendly', value: 'Friendly, helpful, and conversational' },
               { label: 'Socratic', value: 'Socratic, guiding the user with questions' },
               { label: 'Strict', value: 'Strict, concise, code-only' },
               { label: 'Creative', value: 'Creative, imaginative, and verbose' },
               { label: 'Empathetic', value: 'Empathetic and patient' },
               { label: 'Authoritative', value: 'Authoritative and directive' },
               { label: 'Humorous', value: 'Witty and humorous' }
            ]
          },
          { id: 'language', label: 'Primary Language', type: 'text', placeholder: 'e.g., English (US), Spanish, Technical English' }
        ]
      },
      {
        title: "Task & Context",
        fields: [
          { id: 'task', label: 'Main Task', type: 'textarea', placeholder: 'What is the primary job of this agent?' },
          { id: 'context', label: 'Context/Knowledge', type: 'textarea', placeholder: 'Background info the agent needs to know...' },
          { id: 'reasoning', label: 'Reasoning Process', type: 'select',
            options: [
                { label: 'None', value: '' },
                { label: 'Chain of Thought', value: 'Use Chain of Thought reasoning before answering' },
                { label: 'Step-by-Step', value: 'Break down instructions step-by-step' },
                { label: 'Few-Shot', value: 'Use provided examples to guide the output' }
            ]
          }
        ]
      },
      {
        title: "Output Format",
        fields: [
          { id: 'format', label: 'Response Format', type: 'select',
            options: [
                { label: 'Text/Markdown', value: 'Markdown formatted text' },
                { label: 'JSON Only', value: 'Strict JSON format' },
                { label: 'Code Block', value: 'Code blocks only' },
                { label: 'Table', value: 'Structured Markdown Table' },
                { label: 'CSV', value: 'Comma-Separated Values (CSV)' },
                { label: 'XML', value: 'XML Format' }
            ]
          },
          { id: 'structure', label: 'Structure Requirements', type: 'text', placeholder: 'e.g., Start with summary, then bullets' }
        ]
      },
      {
        title: "Safety & Constraints",
        fields: [
          { id: 'constraints', label: 'Hard Constraints', type: 'textarea', placeholder: 'e.g., No explanation, max 500 words, never mention competitors' },
          { id: 'guardrails', label: 'Guardrails', type: 'text', placeholder: 'e.g., Refuse political topics' }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      if (v.role) parts.push(`Act as a ${v.role}.`);
      if (v.language) parts.push(`Language: ${v.language}.`);
      if (v.task) parts.push(`Task: ${v.task}`);
      if (v.context) parts.push(`Context: ${v.context}`);
      if (v.tone) parts.push(`Tone: ${v.tone}.`);
      if (v.format) parts.push(`Output Format: ${v.format}.`);
      if (v.structure) parts.push(`Structure: ${v.structure}`);
      if (v.reasoning) parts.push(`Instruction: ${v.reasoning}.`);
      if (v.constraints) parts.push(`Constraints: ${v.constraints}`);
      if (v.guardrails) parts.push(`Guardrails: ${v.guardrails}`);
      return parts.join('\n');
    }
  },
  [PromptCategory.WEB_APP]: {
    sections: [
      {
        title: "Product Vision",
        fields: [
          { id: 'concept', label: 'App Concept', type: 'textarea', placeholder: 'Describe the application functionality...' },
          { id: 'users', label: 'Target Audience', type: 'text', placeholder: 'e.g., Small business owners, Students' }
        ]
      },
      {
        title: "Technical Architecture",
        fields: [
          { id: 'stack', label: 'Frontend Stack', type: 'text', placeholder: 'e.g., Next.js 14, Tailwind, React' },
          { id: 'backend', label: 'Backend/Database', type: 'text', placeholder: 'e.g., Supabase, Node.js, PostgreSQL' },
          { 
            id: 'auth', label: 'Authentication', type: 'select',
            options: [
                { label: 'None', value: '' },
                { label: 'NextAuth.js', value: 'NextAuth.js' },
                { label: 'Clerk', value: 'Clerk Authentication' },
                { label: 'Supabase Auth', value: 'Supabase Auth' },
                { label: 'Firebase', value: 'Firebase Auth' },
                { label: 'Auth0', value: 'Auth0' },
                { label: 'AWS Cognito', value: 'AWS Cognito' },
                { label: 'Custom JWT', value: 'Custom JWT implementation' }
            ]
          },
          { id: 'deployment', label: 'Deployment', type: 'text', placeholder: 'e.g., Vercel, AWS, Docker' }
        ]
      },
      {
        title: "Features & Logic",
        fields: [
           { id: 'features', label: 'Core Features', type: 'textarea', placeholder: 'List 3-5 must-have features...' },
           { id: 'api', label: 'API Strategy', type: 'select',
             options: [
                { label: 'REST API', value: 'RESTful API endpoints' },
                { label: 'GraphQL', value: 'GraphQL API' },
                { label: 'Server Actions', value: 'Next.js Server Actions' },
                { label: 'TRPC', value: 'TRPC' },
                { label: 'gRPC', value: 'gRPC' }
             ]
           }
        ]
      },
      {
        title: "Design System",
        fields: [
          { 
            id: 'design', label: 'Design Aesthetic', type: 'select',
            options: [
              { label: 'Modern SaaS', value: 'Clean, minimal, B2B SaaS aesthetic' },
              { label: 'Dark Mode', value: 'Futuristic, dark mode, neon accents' },
              { label: 'Playful', value: 'Colorful, rounded corners, playful UI' },
              { label: 'Corporate', value: 'Professional, trustworthy, blue/grey tones' },
              { label: 'Brutalist', value: 'Brutalist, high contrast, large typography' },
              { label: 'Glassmorphism', value: 'Glassmorphism, blurred backgrounds, translucency' },
              { label: 'Neumorphism', value: 'Neumorphism, soft shadows, tactile feel' }
            ]
          },
          { id: 'colors', label: 'Primary Colors', type: 'text', placeholder: 'e.g., Indigo & White' }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      if (v.concept) parts.push(`Build a Web Application: ${v.concept}`);
      if (v.users) parts.push(`Target Audience: ${v.users}`);
      if (v.stack) parts.push(`Frontend: ${v.stack}`);
      if (v.backend) parts.push(`Backend: ${v.backend}`);
      if (v.auth) parts.push(`Auth: ${v.auth}`);
      if (v.deployment) parts.push(`Deployment: ${v.deployment}`);
      if (v.features) parts.push(`Core Features: ${v.features}`);
      if (v.api) parts.push(`API Strategy: ${v.api}`);
      if (v.design) parts.push(`Design Style: ${v.design}`);
      if (v.colors) parts.push(`Colors: ${v.colors}`);
      return parts.join('.\n');
    }
  },
  [PromptCategory.MOBILE_APP]: {
    sections: [
      {
        title: "App Core",
        fields: [
           { id: 'concept', label: 'App Concept', type: 'textarea', placeholder: 'e.g., A meditation timer, A food delivery app...' },
           { 
            id: 'platform', label: 'Target Platform', type: 'select',
            options: [
                { label: 'React Native (Expo)', value: 'React Native (Expo)' },
                { label: 'Flutter', value: 'Flutter' },
                { label: 'Native iOS (SwiftUI)', value: 'Native iOS (SwiftUI)' },
                { label: 'Native Android (Kotlin)', value: 'Native Android (Kotlin)' },
                { label: 'Ionic', value: 'Ionic Framework' },
                { label: 'PWA', value: 'Progressive Web App (PWA)' }
            ]
          }
        ]
      },
      {
        title: "UX & Navigation",
        fields: [
           {
            id: 'navigation', label: 'Navigation Pattern', type: 'select',
            options: [
                { label: 'Bottom Tabs', value: 'Bottom Tab Bar navigation' },
                { label: 'Side Drawer', value: 'Hamburger Menu / Side Drawer' },
                { label: 'Stack Based', value: 'Simple Stack/Drill-down navigation' },
                { label: 'Swipe', value: 'Swipe-based navigation (like Tinder/TikTok)' },
                { label: 'Floating Action Button', value: 'FAB driven navigation' }
            ]
          },
          { 
            id: 'style', label: 'UI Theme', type: 'select',
            options: [
                { label: 'Platform Native', value: 'Platform-native look and feel' },
                { label: 'Custom Brand', value: 'Highly custom, branded interface' },
                { label: 'Material Design', value: 'Google Material Design 3' },
                { label: 'Cupertino', value: 'Apple Human Interface Guidelines' },
                { label: 'Minimal', value: 'Clean and minimal mobile UI' }
            ]
          }
        ]
      },
      {
        title: "Technical Features",
        fields: [
           { id: 'permissions', label: 'Device Permissions', type: 'text', placeholder: 'e.g., Camera, Location, Notifications, HealthKit' },
           { id: 'offline', label: 'Offline Capability', type: 'select', 
             options: [
                { label: 'Online Only', value: 'Requires internet connection' },
                { label: 'Offline First', value: 'Offline-first architecture with sync' },
                { label: 'Cached', value: 'Basic caching for offline viewing' }
             ]
           }
        ]
      },
      {
        title: "Key Features",
        fields: [
           { id: 'features', label: 'Feature List', type: 'textarea', placeholder: 'List key functionalities...' }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      if (v.concept) parts.push(`Create a Mobile App: ${v.concept}`);
      if (v.platform) parts.push(`Platform: ${v.platform}`);
      if (v.navigation) parts.push(`Navigation: ${v.navigation}`);
      if (v.style) parts.push(`UI Style: ${v.style}`);
      if (v.permissions) parts.push(`Permissions: ${v.permissions}`);
      if (v.offline) parts.push(`Offline Strategy: ${v.offline}`);
      if (v.features) parts.push(`Key Features: ${v.features}`);
      return parts.join('.\n');
    }
  },
  [PromptCategory.WEBSITE]: {
    sections: [
      {
        title: "Strategy & Goals",
        fields: [
           { id: 'type', label: 'Website Type', type: 'select',
            options: [
                { label: 'Landing Page', value: 'High-conversion Landing Page' },
                { label: 'Portfolio', value: 'Personal Portfolio' },
                { label: 'E-Commerce', value: 'E-Commerce Storefront' },
                { label: 'Blog/News', value: 'Content-heavy Blog' },
                { label: 'SaaS Marketing', value: 'SaaS Marketing Site' },
                { label: 'Corporate', value: 'Corporate Business Site' },
                { label: 'Non-Profit', value: 'Non-Profit Organization Site' },
                { label: 'Event', value: 'Event Promotion Site' }
            ]
          },
          { id: 'business', label: 'Business Name/Topic', type: 'textarea', placeholder: 'e.g. "Bean & Brew" coffee shop' },
          { id: 'goal', label: 'Primary Goal (CTA)', type: 'text', placeholder: 'e.g., Get email signups, Sell product' }
        ]
      },
      {
        title: "Structure & Content",
        fields: [
           { 
            id: 'sections', label: 'Key Sections', type: 'select',
            options: [
                { label: 'Standard SaaS', value: 'Hero, Social Proof, Features, Testimonials, Pricing, FAQ, Footer' },
                { label: 'Minimal Personal', value: 'Hero, About, Selected Works, Contact' },
                { label: 'Product Focus', value: 'Hero, Product Showcase, Specs, Reviews, Buy Now' },
                { label: 'Content Hub', value: 'Hero, Featured Posts, Categories, Newsletter, Footer' },
                { label: 'Visual Gallery', value: 'Hero, Masonry Gallery, Lightbox, Contact' }
            ]
          },
          { id: 'copy', label: 'Copywriting Style', type: 'text', placeholder: 'e.g., Punchy, Emotional, Technical' }
        ]
      },
      {
        title: "SEO & Trust",
        fields: [
            { id: 'keywords', label: 'SEO Keywords', type: 'text', placeholder: 'e.g., organic coffee, fair trade, subscription' },
            { id: 'trust', label: 'Trust Signals', type: 'text', placeholder: 'e.g., Partner logos, 5-star reviews, Case studies' }
        ]
      },
      {
        title: "Design & Vibe",
        fields: [
            { id: 'vibe', label: 'Visual Vibe', type: 'text', placeholder: 'e.g., Luxury, Friendly, Tech-forward, Retro' },
            { id: 'cms', label: 'CMS/Platform', type: 'text', placeholder: 'e.g., WordPress, Framer, Webflow, Next.js' }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      if (v.type) parts.push(`Create a ${v.type}`);
      if (v.business) parts.push(`for: ${v.business}`);
      if (v.sections) parts.push(`Include Sections: ${v.sections}`);
      if (v.goal) parts.push(`Primary Goal: ${v.goal}`);
      if (v.copy) parts.push(`Copy Style: ${v.copy}`);
      if (v.keywords) parts.push(`SEO Keywords: ${v.keywords}`);
      if (v.trust) parts.push(`Trust Signals: ${v.trust}`);
      if (v.vibe) parts.push(`Vibe: ${v.vibe}`);
      if (v.cms) parts.push(`Platform: ${v.cms}`);
      return parts.join('.\n');
    }
  }
};
