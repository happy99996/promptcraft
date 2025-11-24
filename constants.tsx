
import { PromptCategory, CategoryConfig, BuilderConfig } from './types';
import { Image, Video, Terminal, AppWindow, Smartphone, Globe, Gamepad2 } from 'lucide-react';
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
    id: PromptCategory.GAMES,
    label: 'Game Design',
    description: 'Game concepts, mechanics, and asset prompts.',
    icon: 'gamepad-2',
    // Violet -> Fuchsia Gradient
    textColor: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/50',
    bgColor: 'bg-fuchsia-600',
    hoverBgColor: 'hover:bg-fuchsia-500',
    shadowColor: 'shadow-fuchsia-900/20',
    glowColor: 'shadow-[0_0_15px_rgba(192,38,211,0.25)]',
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-fuchsia-500'
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
  'globe': Globe,
  'gamepad-2': Gamepad2
};

export const PLACEHOLDERS: Record<PromptCategory, string> = {
  [PromptCategory.IMAGE]: "e.g., A futuristic city with neon lights in cyberpunk style...",
  [PromptCategory.VIDEO]: "e.g., A drone shot flying through a canyon at sunset...",
  [PromptCategory.GAMES]: "e.g., A rogue-like dungeon crawler set in a candy kingdom...",
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
        title: "Core Concept & Mood",
        fields: [
           { id: 'subject', label: 'Main Subject', type: 'textarea', placeholder: 'What do you want to see? (e.g., An astronaut on Mars)' },
           { 
             id: 'mood', label: 'Emotion / Mood', type: 'select',
             options: [
                { label: 'Dark & Dramatic', value: 'dark, dramatic, moody atmosphere' },
                { label: 'Calm & Peaceful', value: 'calm, peaceful, serene, zen-like' },
                { label: 'Energetic & Vibrant', value: 'energetic, vibrant, dynamic' },
                { label: 'Futuristic', value: 'futuristic, high-tech, sci-fi' },
                { label: 'Nostalgic', value: 'nostalgic, retro, vintage feel' },
                { label: 'Ethereal', value: 'ethereal, dreamlike, mystical' },
                { label: 'Horror/Grim', value: 'horror, grim, ominous, unsettling' }
             ]
           },
           {
             id: 'priority', label: 'Subject Priority', type: 'select',
             options: [
                { label: 'Character Focus', value: 'focus on character details' },
                { label: 'Environment Focus', value: 'focus on environment and scenery' },
                { label: 'Object Focus', value: 'focus on specific object details' },
                { label: 'Action Focus', value: 'focus on action and movement' }
             ]
           },
           { id: 'keywords', label: 'Keywords Booster', type: 'text', placeholder: 'e.g., masterpiece, award-winning, 8k' }
        ]
      },
      {
        title: "Camera & Composition",
        fields: [
          { 
            id: 'lens', label: 'Focal Length', type: 'select',
            options: [
               { label: '18mm (Wide)', value: '18mm wide angle lens' },
               { label: '35mm (Standard)', value: '35mm standard lens' },
               { label: '50mm (Human Eye)', value: '50mm prime lens' },
               { label: '85mm (Portrait)', value: '85mm portrait lens' },
               { label: '135mm (Telephoto)', value: '135mm telephoto lens' }
            ]
          },
          { 
            id: 'angle', label: 'Camera Angle', type: 'select',
            options: [
               { label: 'Eye-Level', value: 'eye-level shot' },
               { label: 'Low Angle', value: 'low angle shot, worm\'s eye view' },
               { label: 'High Angle', value: 'high angle shot, bird\'s eye view' },
               { label: 'Dutch Angle', value: 'Dutch angle, tilted frame' },
               { label: 'Top Down', value: 'top-down, flat lay' }
            ]
          },
          {
            id: 'dof', label: 'Depth of Field', type: 'select',
            options: [
                { label: 'Standard', value: '' },
                { label: 'Shallow (Bokeh)', value: 'shallow depth of field, bokeh background' },
                { label: 'Deep (Sharp)', value: 'deep depth of field, sharp focus everywhere' },
                { label: 'Macro', value: 'macro photography, extreme detail' }
            ]
          },
          { 
            id: 'ratio', label: 'Aspect Ratio', type: 'select', 
            options: [
              { label: 'Square (1:1)', value: '--ar 1:1' },
              { label: 'Landscape (16:9)', value: '--ar 16:9' },
              { label: 'Portrait (9:16)', value: '--ar 9:16' },
              { label: 'Ultrawide (21:9)', value: '--ar 21:9' },
              { label: 'Classic (3:2)', value: '--ar 3:2' },
              { label: 'TV (4:3)', value: '--ar 4:3' }
            ] 
          },
          { id: 'framing', label: 'Composition Rule', type: 'text', placeholder: 'e.g., Rule of Thirds, Symmetrical, Golden Ratio' }
        ]
      },
      {
        title: "Visual Style & Rendering",
        fields: [
          { 
            id: 'quality', label: 'Rendering Quality', type: 'select', 
            options: [
              { label: 'Photorealistic', value: 'photorealistic, 8k, unreal engine 5' },
              { label: 'Hyperrealistic', value: 'hyperrealistic, extremely detailed' },
              { label: 'Stylized', value: 'stylized, artistic' },
              { label: 'Anime', value: 'anime style, cel shaded' },
              { label: 'Pixar/Disney', value: 'Pixar style 3D render, cute' },
              { label: 'Concept Art', value: 'digital concept art, artstation' },
              { label: 'Illustration', value: 'flat illustration, vector art' }
            ] 
          },
          { 
            id: 'texture', label: 'Texture & Material', type: 'select',
            options: [
               { label: 'Matte', value: 'matte finish, non-reflective' },
               { label: 'Glossy/Shiny', value: 'glossy, shiny, polished' },
               { label: 'Metallic', value: 'metallic, chrome, reflective' },
               { label: 'Holographic', value: 'holographic, iridescent' },
               { label: 'Organic/Rough', value: 'organic texture, rough, gritty' }
            ]
          },
          { 
            id: 'palette', label: 'Color Palette', type: 'select',
            options: [
               { label: 'Custom...', value: '' },
               { label: 'Monochrome', value: 'monochrome, black and white' },
               { label: 'Neon/Cyberpunk', value: 'neon palette, cyan and magenta' },
               { label: 'Pastel', value: 'pastel colors, soft tones' },
               { label: 'Earth Tones', value: 'earth tones, natural colors' },
               { label: 'High Contrast', value: 'high contrast, vivid colors' },
               { label: 'Warm', value: 'warm color temperature, orange and yellow' },
               { label: 'Cold', value: 'cold color temperature, blue and teal' }
            ]
          },
           { id: 'artist', label: 'Artist Inspiration', type: 'text', placeholder: 'e.g., Greg Rutkowski, Van Gogh (Use carefully)' }
        ]
      },
      {
         title: "Character & Subject",
         fields: [
            { id: 'clothing', label: 'Clothing Style', type: 'text', placeholder: 'e.g., Cyberpunk armor, Victorian dress, Casual hoodie' },
            { id: 'expression', label: 'Expression', type: 'text', placeholder: 'e.g., Stoic, Joyful, Screaming, Serene' },
            { id: 'pose', label: 'Pose/Action', type: 'text', placeholder: 'e.g., Jumping, Sitting cross-legged, Fighting stance' }
         ]
      },
      {
        title: "Environment & Dynamics",
        fields: [
          { 
            id: 'lighting', label: 'Lighting Type', type: 'select',
            options: [
              { label: 'Soft/Diffused', value: 'soft diffused lighting' },
              { label: 'Hard/Dramatic', value: 'hard lighting, strong shadows' },
              { label: 'Rim Light', value: 'rim lighting, backlighting' },
              { label: 'Volumetric', value: 'volumetric lighting, god rays' },
              { label: 'Neon', value: 'neon lights, colored gels' },
              { label: 'Golden Hour', value: 'golden hour, warm sunlight' },
              { label: 'Studio 3-Point', value: 'studio 3-point lighting' }
            ]
          },
          { id: 'weather', label: 'Weather/Atmosphere', type: 'text', placeholder: 'e.g., Rainy, Foggy, Snowy, Sandstorm' },
          { 
              id: 'action', label: 'Action Level', type: 'select',
              options: [
                  { label: 'Static', value: 'static, still' },
                  { label: 'Low Motion', value: 'subtle movement' },
                  { label: 'High Action', value: 'dynamic action, motion blur, chaotic' }
              ]
          }
        ]
      },
      {
        title: "Advanced & Technical",
        fields: [
          { id: 'seed', label: 'Seed (Randomness)', type: 'text', placeholder: 'e.g., 12345 (for reproducibility)' },
          { 
            id: 'chaos', label: 'Chaos (Variation)', type: 'select',
            options: [
                { label: 'Low (0)', value: '--c 0' },
                { label: 'Medium (20)', value: '--c 20' },
                { label: 'High (50)', value: '--c 50' },
                { label: 'Very High (100)', value: '--c 100' }
            ]
          },
          {
              id: 'stylize', label: 'Stylize (Creativity)', type: 'select',
              options: [
                  { label: 'Low (50)', value: '--s 50' },
                  { label: 'Med (100)', value: '--s 100' },
                  { label: 'High (250)', value: '--s 250' },
                  { label: 'Max (750)', value: '--s 750' }
              ]
          },
          { id: 'negative', label: 'Negative Prompt', type: 'text', defaultValue: 'blurry, distorted face, low detail, text artifacts, low resolution, watermark' }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      // Core
      if (v.subject) parts.push(v.subject);
      if (v.priority) parts.push(`Focus: ${v.priority}`);
      if (v.mood) parts.push(`Mood: ${v.mood}`);
      if (v.keywords) parts.push(v.keywords);
      
      // Style
      if (v.quality) parts.push(v.quality);
      if (v.texture) parts.push(v.texture);
      if (v.palette) parts.push(`Palette: ${v.palette}`);
      if (v.artist) parts.push(`Style of: ${v.artist}`);
      
      // Camera
      if (v.lens) parts.push(v.lens);
      if (v.angle) parts.push(v.angle);
      if (v.dof) parts.push(v.dof);
      if (v.framing) parts.push(v.framing);
      
      // Env
      if (v.lighting) parts.push(v.lighting);
      if (v.weather) parts.push(v.weather);
      if (v.action) parts.push(v.action);

      // Character
      if (v.clothing) parts.push(`Clothing: ${v.clothing}`);
      if (v.expression) parts.push(`Expression: ${v.expression}`);
      if (v.pose) parts.push(`Pose: ${v.pose}`);

      // Params
      const params = [];
      if (v.ratio) params.push(v.ratio);
      if (v.chaos) params.push(v.chaos);
      if (v.stylize) params.push(v.stylize);
      if (v.seed) params.push(`--seed ${v.seed}`);
      if (v.negative) params.push(`--no ${v.negative}`);

      return parts.join(', ') + (params.length > 0 ? ' ' + params.join(' ') : '');
    }
  },
  [PromptCategory.VIDEO]: {
    sections: [
      {
        title: "Core Narrative",
        fields: [
          { id: 'actions', label: 'Character Actions', type: 'textarea', placeholder: 'Describe behavior: running, fighting, dancing, speaking...' },
          { id: 'character_details', label: 'Character Details', type: 'textarea', placeholder: 'Age, clothes, style (if applicable)' },
          { id: 'environment', label: 'Environment Description', type: 'textarea', placeholder: 'Interior/Exterior, City, Forest, Time of day...' },
          { 
            id: 'structure', label: 'Narrative Structure', type: 'select',
            options: [
              { label: 'Static Moment', value: 'Static moment in time' },
              { label: 'Short Action Sequence', value: 'Short action sequence' },
              { label: 'Dynamic Chase', value: 'Dynamic chase sequence' },
              { label: 'Emotional Moment', value: 'Intimate emotional moment' },
              { label: 'Reveal Scene', value: 'Grand reveal scene' },
              { label: 'Establishing Shot', value: 'Cinematic establishing shot' }
            ]
          },
          { id: 'keywords', label: 'Keywords Booster', type: 'text', placeholder: 'e.g., high tension, cinematic drama, mystical' }
        ]
      },
      {
        title: "Cinematography",
        fields: [
           { 
            id: 'movement', label: 'Camera Movement', type: 'select',
            options: [
              { label: 'Static', value: 'Static tripod shot' },
              { label: 'Dolly In', value: 'Slow dolly in' },
              { label: 'Dolly Out', value: 'Slow dolly out' },
              { label: 'Tracking Left', value: 'Tracking shot to the left' },
              { label: 'Tracking Right', value: 'Tracking shot to the right' },
              { label: 'Crane Shot', value: 'Sweeping crane shot' },
              { label: 'Orbit', value: 'Circular orbit around subject' },
              { label: 'Steadicam Follow', value: 'Smooth Steadicam follow' },
              { label: 'Handheld Shaky', value: 'Handheld shaky cam' },
              { label: 'FPV Movement', value: 'Fast FPV drone movement' },
              { label: 'Tilt / Pan', value: 'Tilt or Pan camera motion' }
            ]
          },
          {
            id: 'angle', label: 'Camera Angle', type: 'select',
            options: [
              { label: 'Eye-Level', value: 'Eye-level shot' },
              { label: 'Low Angle', value: 'Low angle looking up' },
              { label: 'High Angle', value: 'High angle looking down' },
              { label: 'Over-the-Shoulder', value: 'Over-the-shoulder POV' },
              { label: 'Dutch Angle', value: 'Dutch angle tilted' },
              { label: 'Bird’s Eye', value: 'Bird’s-eye view overhead' },
              { label: 'Worm’s Eye', value: 'Worm’s-eye view from ground' }
            ]
          },
          {
            id: 'shot_type', label: 'Shot Type', type: 'select',
            options: [
              { label: 'Extreme Close-Up', value: 'Extreme close-up details' },
              { label: 'Close-Up', value: 'Close-up shot' },
              { label: 'Medium Shot', value: 'Medium shot' },
              { label: 'Full Body', value: 'Full body wide shot' },
              { label: 'Wide Shot', value: 'Wide shot' },
              { label: 'Extreme Wide', value: 'Extreme wide panoramic shot' },
              { label: 'Establishing', value: 'Establishing shot' }
            ]
          },
          {
            id: 'focal_length', label: 'Focal Length', type: 'select',
            options: [
              { label: '18mm (Wide)', value: '18mm wide lens' },
              { label: '35mm (Cinematic)', value: '35mm cinematic lens' },
              { label: '50mm (Natural)', value: '50mm natural lens' },
              { label: '85mm (Portrait)', value: '85mm portrait lens' },
              { label: '135mm (Telephoto)', value: '135mm telephoto compression' }
            ]
          },
          {
            id: 'framing', label: 'Framing Rules', type: 'text', placeholder: 'e.g., Rule of thirds, Symmetrical, Centered, Leading lines'
          },
          {
            id: 'lighting', label: 'Lighting Type', type: 'select',
            options: [
              { label: 'Soft Cinematic', value: 'Soft cinematic lighting' },
              { label: 'Hard Dramatic', value: 'Hard dramatic high-contrast lighting' },
              { label: 'Backlit Silhouette', value: 'Backlit silhouette' },
              { label: 'Rim Light', value: 'Strong rim lighting' },
              { label: 'Golden Hour', value: 'Golden hour warm light' },
              { label: 'Neon', value: 'Neon city lights' },
              { label: 'Volumetric', value: 'Volumetric godrays' },
              { label: 'Firelight', value: 'Flickering firelight' }
            ]
          }
        ]
      },
      {
        title: "Technical Specs",
        fields: [
          {
             id: 'duration', label: 'Duration', type: 'select',
             options: [
               { label: '2 Seconds', value: '2 seconds' },
               { label: '4 Seconds', value: '4 seconds' },
               { label: '8 Seconds', value: '8 seconds' },
               { label: '16 Seconds', value: '16 seconds' }
             ]
          },
          {
            id: 'fps', label: 'Frame Rate', type: 'select',
            options: [
                { label: '24 fps (Cinema)', value: '24 fps' },
                { label: '30 fps (TV)', value: '30 fps' },
                { label: '60 fps (Smooth)', value: '60 fps' }
            ]
          },
          {
            id: 'resolution', label: 'Resolution', type: 'select',
            options: [
                { label: '720p', value: '720p HD' },
                { label: '1080p', value: '1080p Full HD' },
                { label: '4K', value: '4K Ultra HD' }
            ]
          },
          { 
            id: 'ratio', label: 'Aspect Ratio', type: 'select', 
            options: [
              { label: '16:9 (Landscape)', value: '16:9 landscape' },
              { label: '9:16 (Portrait)', value: '9:16 portrait' },
              { label: '1:1 (Square)', value: '1:1 square' },
              { label: '2.35:1 (Cinema)', value: '2.35:1 widescreen' }
            ] 
          },
          {
            id: 'style', label: 'Visual Style', type: 'select',
            options: [
              { label: 'Realistic', value: 'Photorealistic live action' },
              { label: 'Hyperrealistic', value: 'Hyperrealistic' },
              { label: 'Anime', value: 'Anime style' },
              { label: '2.5D', value: '2.5D animation' },
              { label: 'CGI / 3D', value: 'High-end CGI 3D render' },
              { label: 'Pixar-style', value: 'Pixar animation style' },
              { label: 'Gritty / Noir', value: 'Gritty noir film' },
              { label: 'Cyberpunk', value: 'Cyberpunk aesthetic' },
              { label: 'Vintage Film', value: 'Vintage film grain look' }
            ]
          },
          {
            id: 'grading', label: 'Color Grading', type: 'select',
            options: [
              { label: 'Teal & Orange', value: 'Teal and orange blockbuster grading' },
              { label: 'Desaturated', value: 'Desaturated muted tones' },
              { label: 'High Contrast', value: 'High contrast vivid colors' },
              { label: 'Warm Tones', value: 'Warm nostalgic tones' },
              { label: 'Cool Tones', value: 'Cool blue tones' },
              { label: 'Matrix Green', value: 'Matrix style green tint' },
              { label: 'Neon Palette', value: 'Neon cyberpunk color palette' }
            ]
          }
        ]
      },
      {
         title: "Motion & Effects",
         fields: [
            {
                id: 'intensity', label: 'Motion Intensity', type: 'select',
                options: [
                    { label: 'Subtle', value: 'Subtle motion' },
                    { label: 'Moderate', value: 'Moderate movement' },
                    { label: 'High Action', value: 'High intensity action' },
                    { label: 'Frenetic', value: 'Frenetic fast-paced motion' }
                ]
            },
            {
                id: 'physics', label: 'Physics', type: 'select',
                options: [
                   { label: 'Natural', value: 'Natural physics' },
                   { label: 'Slow Motion', value: 'Slow motion fluid physics' },
                   { label: 'Fast Motion', value: 'Fast forwarded motion' },
                   { label: 'Zero Gravity', value: 'Zero gravity floating' }
                ]
            },
            { id: 'weather', label: 'Weather Effects', type: 'text', placeholder: 'e.g., Rain, Snow, Fog, Dust, Wind, Storm' },
            { id: 'env_fx', label: 'Environmental FX', type: 'text', placeholder: 'e.g., Lens flares, Light leaks, Chromatic aberration, Motion blur' },
            { id: 'vfx', label: 'Special Effects', type: 'text', placeholder: 'e.g., Explosions, Energy beams, Holograms, Smoke bursts' }
         ]
      },
      {
        title: "Audio Options",
        fields: [
          {
            id: 'audio_mood', label: 'Sound Mood', type: 'select',
            options: [
              { label: 'Dark Ambient', value: 'Dark ambient soundscape' },
              { label: 'Futuristic Synth', value: 'Futuristic synthwave soundtrack' },
              { label: 'Orchestral', value: 'Epic orchestral score' },
              { label: 'Chill', value: 'Chill lofi beats' },
              { label: 'Intense', value: 'Intense percussion' }
            ]
          },
          { id: 'sfx', label: 'Sound Effects', type: 'text', placeholder: 'e.g., Footsteps, Engine roar, Rain, Fire crackle' },
          { id: 'dialogue', label: 'Dialogue', type: 'text', placeholder: 'Enter text for dialogue or leave empty' }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      // Narrative
      if (v.structure) parts.push(`Structure: ${v.structure}`);
      if (v.actions) parts.push(`Action: ${v.actions}`);
      if (v.character_details) parts.push(`Character: ${v.character_details}`);
      if (v.environment) parts.push(`Environment: ${v.environment}`);
      if (v.keywords) parts.push(`Keywords: ${v.keywords}`);

      // Cinematography
      if (v.shot_type) parts.push(`Shot Type: ${v.shot_type}`);
      if (v.angle) parts.push(`Angle: ${v.angle}`);
      if (v.movement) parts.push(`Movement: ${v.movement}`);
      if (v.focal_length) parts.push(`Lens: ${v.focal_length}`);
      if (v.framing) parts.push(`Framing: ${v.framing}`);
      if (v.lighting) parts.push(`Lighting: ${v.lighting}`);

      // Tech
      if (v.style) parts.push(`Style: ${v.style}`);
      if (v.grading) parts.push(`Color: ${v.grading}`);
      if (v.ratio) parts.push(`Aspect Ratio: ${v.ratio}`);
      if (v.resolution) parts.push(`Res: ${v.resolution}`);
      if (v.fps) parts.push(`FPS: ${v.fps}`);
      if (v.duration) parts.push(`Duration: ${v.duration}`);

      // Motion & FX
      if (v.intensity) parts.push(`Motion Intensity: ${v.intensity}`);
      if (v.physics) parts.push(`Physics: ${v.physics}`);
      if (v.weather) parts.push(`Weather: ${v.weather}`);
      if (v.env_fx) parts.push(`Env FX: ${v.env_fx}`);
      if (v.vfx) parts.push(`VFX: ${v.vfx}`);

      // Audio
      if (v.audio_mood) parts.push(`Audio Mood: ${v.audio_mood}`);
      if (v.sfx) parts.push(`SFX: ${v.sfx}`);
      if (v.dialogue) parts.push(`Dialogue: ${v.dialogue}`);

      return parts.join('. ');
    }
  },
  [PromptCategory.GAMES]: {
    sections: [
      {
        title: "Core Identity",
        fields: [
          { id: 'title', label: 'Project Title', type: 'text', placeholder: 'Codename or Final Title' },
          {
            id: 'genre', label: 'Genre', type: 'multiselect',
            options: [
              { label: 'Action RPG', value: 'Action RPG' },
              { label: 'Roguelite', value: 'Roguelite' },
              { label: 'Metroidvania', value: 'Metroidvania' },
              { label: 'FPS', value: 'FPS' },
              { label: 'Battle Royale', value: 'Battle Royale' },
              { label: 'MMORPG', value: 'MMORPG' },
              { label: 'Visual Novel', value: 'Visual Novel' },
              { label: 'RTS', value: 'Real-Time Strategy' },
              { label: 'Turn-Based Strategy', value: 'Turn-Based Strategy' },
              { label: 'Simulation', value: 'Simulation' },
              { label: 'Puzzle', value: 'Puzzle' },
              { label: 'Horror', value: 'Survival Horror' }
            ]
          },
          {
            id: 'audience', label: 'Target Audience', type: 'select',
            options: [
              { label: 'Casual', value: 'Casual Players' },
              { label: 'Mid-core', value: 'Mid-core Players' },
              { label: 'Hardcore', value: 'Hardcore/Competitive Players' },
              { label: 'Kids', value: 'Kids & Family' }
            ]
          },
          { id: 'hook', label: 'Unique Selling Point (Hook)', type: 'textarea', placeholder: 'e.g., Time moves only when you move...' }
        ]
      },
      {
        title: "Visual Direction",
        fields: [
          {
            id: 'perspective', label: 'Perspective', type: 'select',
            options: [
              { label: '2D Side-Scroller', value: '2D Side-Scroller' },
              { label: 'Top-Down', value: 'Top-Down' },
              { label: 'Isometric', value: 'Isometric' },
              { label: 'First-Person (FPS)', value: 'First-Person' },
              { label: 'Third-Person (TPS)', value: 'Third-Person' },
              { label: 'VR', value: 'Virtual Reality' }
            ]
          },
          {
            id: 'art_style', label: 'Visual Style', type: 'multiselect',
            options: [
              { label: 'Pixel Art', value: 'Pixel Art' },
              { label: 'Low Poly', value: 'Low Poly' },
              { label: 'Voxel', value: 'Voxel Art' },
              { label: 'Cel-Shaded', value: 'Cel-Shaded (Anime)' },
              { label: 'Photorealistic', value: 'Photorealistic' },
              { label: 'Hand-Drawn', value: 'Hand-Drawn 2D' },
              { label: 'Cyberpunk', value: 'Cyberpunk Aesthetic' },
              { label: 'Dark Fantasy', value: 'Dark Fantasy' },
              { label: 'Noir', value: 'Noir / Black & White' },
              { label: 'Retro 90s', value: 'Retro PS1 Style' }
            ]
          },
           { id: 'atmosphere', label: 'Atmosphere/Mood', type: 'text', placeholder: 'e.g., Oppressive, Whimsical, High-Octane' }
        ]
      },
      {
        title: "Gameplay Mechanics",
        fields: [
          {
            id: 'progression', label: 'Progression System', type: 'multiselect',
            options: [
              { label: 'XP & Leveling', value: 'XP Leveling System' },
              { label: 'Skill Tree', value: 'Branching Skill Tree' },
              { label: 'Loot Based', value: 'Loot/Gear Progression' },
              { label: 'Metroidvania Unlocks', value: 'Ability Gating' },
              { label: 'Roguelite Meta', value: 'Permanent Base Upgrades' }
            ]
          },
          {
            id: 'core_mechanics', label: 'Core Mechanics', type: 'textarea', placeholder: 'Describe the main verbs: Jump, Shoot, Craft, Negotiate...'
          }
        ]
      },
      {
        title: "Technical & Platform",
        fields: [
          {
            id: 'engine', label: 'Game Engine', type: 'select',
            options: [
              { label: 'Unity', value: 'Unity Engine' },
              { label: 'Unreal Engine 5', value: 'Unreal Engine 5' },
              { label: 'Godot', value: 'Godot' },
              { label: 'Custom', value: 'Custom C++ Engine' },
              { label: 'Roblox', value: 'Roblox Studio' }
            ]
          },
          {
            id: 'platforms', label: 'Platforms', type: 'multiselect',
            options: [
              { label: 'PC (Steam)', value: 'PC' },
              { label: 'PlayStation 5', value: 'PS5' },
              { label: 'Xbox Series X', value: 'Xbox Series X' },
              { label: 'Nintendo Switch', value: 'Switch' },
              { label: 'Mobile (iOS/Android)', value: 'Mobile' },
              { label: 'Web', value: 'Web/HTML5' }
            ]
          }
        ]
      },
      {
        title: "Audio & Narrative",
        fields: [
           { id: 'soundtrack', label: 'Music Style', type: 'text', placeholder: 'e.g., Synthwave, Orchestral, 8-bit Chiptune' },
           { id: 'narrative', label: 'Narrative Style', type: 'select',
             options: [
               { label: 'Linear', value: 'Linear Story' },
               { label: 'Branching', value: 'Branching Choices' },
               { label: 'Environmental', value: 'Environmental Storytelling (Souls-like)' },
               { label: 'Emergent', value: 'Emergent Gameplay Stories' }
             ]
           }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      if (v.title) parts.push(`Project Title: ${v.title}`);
      if (v.genre) parts.push(`Genre: ${v.genre}`);
      if (v.hook) parts.push(`Hook: ${v.hook}`);
      if (v.audience) parts.push(`Target Audience: ${v.audience}`);
      
      if (v.perspective) parts.push(`Perspective: ${v.perspective}`);
      if (v.art_style) parts.push(`Art Style: ${v.art_style}`);
      if (v.atmosphere) parts.push(`Mood: ${v.atmosphere}`);
      
      if (v.core_mechanics) parts.push(`Core Mechanics: ${v.core_mechanics}`);
      if (v.progression) parts.push(`Progression: ${v.progression}`);
      
      if (v.engine) parts.push(`Engine: ${v.engine}`);
      if (v.platforms) parts.push(`Platforms: ${v.platforms}`);
      
      if (v.soundtrack) parts.push(`Music: ${v.soundtrack}`);
      if (v.narrative) parts.push(`Narrative: ${v.narrative}`);
      
      return parts.join('.\n');
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
        title: "Core Concept",
        fields: [
          { id: 'concept', label: 'App Concept', type: 'textarea', placeholder: 'Describe the application functionality...' },
          { id: 'users', label: 'Target Audience', type: 'text', placeholder: 'e.g., Small business owners, Students' },
          { id: 'features', label: 'Core Features', type: 'textarea', placeholder: 'List 3-5 must-have features...' }
        ]
      },
      {
        title: "Design Frameworks",
        fields: [
          { 
            id: 'frameworks', label: 'CSS/UI Framework', type: 'multiselect',
            options: [
              { label: 'TailwindCSS', value: 'Tailwind CSS' },
              { label: 'Material UI', value: 'Material UI (MUI)' },
              { label: 'Bootstrap', value: 'Bootstrap' },
              { label: 'Chakra UI', value: 'Chakra UI' },
              { label: 'Ant Design', value: 'Ant Design' },
              { label: 'Shadcn/ui', value: 'Shadcn/ui' },
              { label: 'Custom CSS', value: 'Custom CSS/SCSS' }
            ]
          },
          {
            id: 'ui_style', label: 'UI Style', type: 'multiselect',
            options: [
              { label: 'Minimalist', value: 'Minimalist' },
              { label: 'Corporate', value: 'Corporate' },
              { label: 'Modern Clean', value: 'Modern clean' },
              { label: 'Dark Mode', value: 'Dark mode' },
              { label: 'Light Mode', value: 'Light mode' },
              { label: 'Glassmorphism', value: 'Glassmorphism' },
              { label: 'Neumorphism', value: 'Neumorphism' },
              { label: 'Futuristic', value: 'Futuristic tech' },
              { label: 'Retro', value: 'Retro / Playful' },
              { label: 'Brutalist', value: 'Brutalist UI' }
            ]
          }
        ]
      },
      {
        title: "Color Palette & Theme",
        fields: [
          { id: 'primary_color', label: 'Primary Color', type: 'text', placeholder: 'e.g., #3B82F6 (Blue)' },
          { id: 'secondary_color', label: 'Secondary Color', type: 'text', placeholder: 'e.g., #10B981 (Emerald)' },
          { id: 'accent_color', label: 'Accent Color', type: 'text', placeholder: 'e.g., #F43F5E (Rose)' },
          { id: 'neutral_palette', label: 'Neutral Palette', type: 'text', placeholder: 'e.g., Slate, Gray, Zinc' },
          { id: 'gradient', label: 'Gradient Options', type: 'text', placeholder: 'e.g., Primary to Accent' }
        ]
      },
      {
        title: "Typography",
        fields: [
          { id: 'font_family', label: 'Font Family', type: 'text', placeholder: 'e.g., Inter, Roboto, Playfair Display' },
          { id: 'font_scale', label: 'Font Scale', type: 'text', placeholder: 'e.g., XS to 4XL, Major Third' },
          { id: 'display_font', label: 'Display/Headings Font', type: 'text', placeholder: 'e.g., Cabinet Grotesk' },
          { id: 'body_font', label: 'Body Font', type: 'text', placeholder: 'e.g., Inter' }
        ]
      },
      {
        title: "Layout Structure",
        fields: [
          { 
            id: 'header_type', label: 'Header Type', type: 'select',
            options: [
              { label: 'Fixed', value: 'Fixed Header' },
              { label: 'Floating', value: 'Floating Header' },
              { label: 'Transparent', value: 'Transparent Header' },
              { label: 'Hidden', value: 'No Header' }
            ]
          },
          {
            id: 'navbar_style', label: 'Navbar Style', type: 'select',
            options: [
              { label: 'Top Bar', value: 'Top Navigation Bar' },
              { label: 'Side Bar', value: 'Side Navigation Bar' },
              { label: 'Mega Menu', value: 'Mega Menu' }
            ]
          },
          {
             id: 'layout_features', label: 'Layout Features', type: 'multiselect',
             options: [
               { label: 'Sidebar Collapsed', value: 'Collapsed Sidebar' },
               { label: 'Sidebar Expanded', value: 'Expanded Sidebar' },
               { label: 'Full Width', value: 'Full Width Container' },
               { label: 'Boxed Layout', value: 'Boxed Layout' },
               { label: 'Card-Based', value: 'Card-based Layout' },
               { label: 'Multi-Step Form', value: 'Multi-step Form Layout' }
             ]
          }
        ]
      },
      {
        title: "Component Style",
        fields: [
          {
            id: 'buttons', label: 'Button Set', type: 'multiselect',
            options: [
              { label: 'Primary', value: 'Primary Buttons' },
              { label: 'Outline', value: 'Outline Buttons' },
              { label: 'Ghost', value: 'Ghost Buttons' },
              { label: 'Soft/Tinted', value: 'Soft Background Buttons' }
            ]
          },
          {
            id: 'inputs', label: 'Input Style', type: 'select',
            options: [
              { label: 'Rounded', value: 'Rounded Inputs' },
              { label: 'Sharp', value: 'Sharp Inputs' },
              { label: 'Underlined', value: 'Underlined Inputs' },
              { label: 'Glass', value: 'Glass Inputs' }
            ]
          },
          {
            id: 'cards', label: 'Card Style', type: 'select',
            options: [
              { label: 'Flat', value: 'Flat Cards' },
              { label: 'Shadowed', value: 'Shadowed Cards' },
              { label: 'Elevated', value: 'Elevated Cards' },
              { label: 'Bordered', value: 'Bordered Cards' }
            ]
          }
        ]
      },
      {
        title: "Iconography & Assets",
        fields: [
          {
             id: 'icons', label: 'Icon Set', type: 'select',
             options: [
               { label: 'Lucide React', value: 'Lucide React' },
               { label: 'Heroicons', value: 'Heroicons' },
               { label: 'FontAwesome', value: 'FontAwesome' },
               { label: 'Radix Icons', value: 'Radix Icons' },
               { label: 'Custom SVG', value: 'Custom SVG Icons' }
             ]
          },
          {
             id: 'icon_style', label: 'Icon Style', type: 'select',
             options: [
               { label: 'Stroke (Line)', value: 'Stroke/Line Icons' },
               { label: 'Filled (Solid)', value: 'Filled/Solid Icons' },
               { label: 'Duotone', value: 'Duotone Icons' }
             ]
          }
        ]
      },
      {
        title: "Animation & Motion",
        fields: [
           {
             id: 'animation', label: 'Motion Features', type: 'multiselect',
             options: [
               { label: 'Page Transitions', value: 'Page Transitions' },
               { label: 'Hover Effects', value: 'Hover Effects' },
               { label: 'Micro-interactions', value: 'Micro-interactions' },
               { label: 'Smooth Scrolling', value: 'Smooth Scrolling' },
               { label: 'Lottie Animations', value: 'Lottie Animations' },
               { label: 'Fade In', value: 'Fade In on Scroll' }
             ]
           }
        ]
      },
      {
        title: "Technical Stack",
        fields: [
          { id: 'frontend', label: 'Frontend Stack', type: 'text', placeholder: 'e.g., Next.js 14, React' },
          { id: 'backend', label: 'Backend/DB', type: 'text', placeholder: 'e.g., Node.js, PostgreSQL' },
          { id: 'auth', label: 'Authentication', type: 'text', placeholder: 'e.g., Clerk, NextAuth' }
        ]
      },
      {
        title: "Accessibility & Brand",
        fields: [
           {
             id: 'a11y', label: 'Accessibility', type: 'multiselect',
             options: [
               { label: 'WCAG 2.2', value: 'WCAG 2.2 Compliance' },
               { label: 'High Contrast', value: 'High Contrast Support' },
               { label: 'Screen Reader', value: 'Screen Reader Optimized' },
               { label: 'Keyboard Nav', value: 'Full Keyboard Navigation' },
               { label: 'Reduced Motion', value: 'Reduced Motion Support' }
             ]
           },
           {
             id: 'brand_tone', label: 'Brand Tone', type: 'select',
             options: [
               { label: 'Tech/Serious', value: 'Tech-focused and Serious' },
               { label: 'Playful', value: 'Playful and Friendly' },
               { label: 'Luxury', value: 'Luxury and Elegant' },
               { label: 'Trustworthy', value: 'Trustworthy and Corporate' }
             ]
           }
        ]
      }
    ],
    template: (v) => {
      const parts = [];
      if (v.concept) parts.push(`Concept: ${v.concept}`);
      if (v.users) parts.push(`Audience: ${v.users}`);
      if (v.features) parts.push(`Features: ${v.features}`);
      
      if (v.frameworks) parts.push(`Frameworks: ${v.frameworks}`);
      if (v.ui_style) parts.push(`UI Style: ${v.ui_style}`);
      
      if (v.primary_color) parts.push(`Primary Color: ${v.primary_color}`);
      if (v.secondary_color) parts.push(`Secondary Color: ${v.secondary_color}`);
      if (v.accent_color) parts.push(`Accent Color: ${v.accent_color}`);
      if (v.neutral_palette) parts.push(`Neutral Palette: ${v.neutral_palette}`);
      
      if (v.font_family) parts.push(`Font: ${v.font_family}`);
      if (v.display_font) parts.push(`Headings: ${v.display_font}`);
      
      if (v.header_type) parts.push(`Header: ${v.header_type}`);
      if (v.navbar_style) parts.push(`Navbar: ${v.navbar_style}`);
      if (v.layout_features) parts.push(`Layout: ${v.layout_features}`);
      
      if (v.buttons) parts.push(`Buttons: ${v.buttons}`);
      if (v.inputs) parts.push(`Inputs: ${v.inputs}`);
      if (v.cards) parts.push(`Cards: ${v.cards}`);
      
      if (v.icons) parts.push(`Icons: ${v.icons} (${v.icon_style})`);
      if (v.animation) parts.push(`Animation: ${v.animation}`);
      
      if (v.frontend) parts.push(`Frontend: ${v.frontend}`);
      if (v.backend) parts.push(`Backend: ${v.backend}`);
      if (v.auth) parts.push(`Auth: ${v.auth}`);
      
      if (v.a11y) parts.push(`Accessibility: ${v.a11y}`);
      if (v.brand_tone) parts.push(`Brand Tone: ${v.brand_tone}`);
      
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
