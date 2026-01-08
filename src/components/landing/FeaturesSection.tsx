import React from 'react';
import { 
  Mic, 
  Globe, 
  Footprints, 
  FileCheck, 
  Brain, 
  UserCheck, 
  Smartphone, 
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: <Mic className="w-6 h-6" />,
    title: 'Voice-Based Interaction',
    description: 'Speak naturally in your language. Perfect for seniors and rural users who prefer talking over typing.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Multilingual Support',
    description: 'Supports Hindi, Tamil, Telugu, Bengali, Marathi, and 7+ more Indian languages.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: <Footprints className="w-6 h-6" />,
    title: 'Step-by-Step Guidance',
    description: 'Visual highlights showing exactly where to click and what to fill. Never miss a step.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: 'Smart Form Assistant',
    description: 'Each field explained simply with examples. Real-time validation prevents errors.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI Intent Detection',
    description: 'Just say what you need in your own words. Our AI understands and guides you to the right service.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'First-Time User Mode',
    description: 'Slower pace, larger buttons, extra visual cues for users new to digital services.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Works Everywhere',
    description: 'Access via web, WhatsApp, or phone call. No smartphone required for basic services.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Privacy-First Design',
    description: 'No data stored after session. End-to-end encrypted conversations. Government-grade security.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Offline & Low-Bandwidth',
    description: 'Works on slow internet. Lightweight version for rural connectivity.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Extraordinary Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for Every Indian Citizen
          </h2>
          <p className="text-muted-foreground">
            From tech-savvy youth to seniors in rural areas, our assistant is designed to make government services accessible to everyone.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
