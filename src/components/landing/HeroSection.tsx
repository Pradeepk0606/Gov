import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Globe, Shield, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary border border-secondary/20 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Government Services</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-slide-up">
            Access Government Services
            <span className="block gradient-text">Made Simple</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up stagger-1">
            Your AI assistant for navigating Digital India services. 
            Speak in your language, get step-by-step guidance, and complete applications effortlessly.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up stagger-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
              <Mic className="w-4 h-4 text-secondary" />
              <span>Voice Support</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
              <Globe className="w-4 h-4 text-secondary" />
              <span>12+ Languages</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
              <Shield className="w-4 h-4 text-success" />
              <span>Secure & Private</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-3">
            <Button variant="secondary" size="lg" className="group">
              Start Using Assistant
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border/50 max-w-lg mx-auto animate-fade-in stagger-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground">Services</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Languages</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};
