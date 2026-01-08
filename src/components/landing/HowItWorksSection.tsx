import React from 'react';
import { MessageCircle, ListChecks, FileCheck, PartyPopper } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Start a Conversation',
    description: 'Open the chatbot and tell us what you need. Type or speak in any Indian language.',
  },
  {
    number: '02',
    icon: <ListChecks className="w-8 h-8" />,
    title: 'Get Step-by-Step Guidance',
    description: 'Our AI guides you through each step with clear instructions and visual cues.',
  },
  {
    number: '03',
    icon: <FileCheck className="w-8 h-8" />,
    title: 'Complete Your Application',
    description: 'Fill forms with smart assistance. We validate everything before submission.',
  },
  {
    number: '04',
    icon: <PartyPopper className="w-8 h-8" />,
    title: 'Track & Receive',
    description: 'Get updates on your application status and receive your documents digitally.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'var(--gradient-tricolor)' }} />
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-primary-foreground/80">
            Four simple steps to access any government service. No technical knowledge required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary-foreground/20 z-0" />
              )}
              
              <div className="relative z-10 text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
                  <div className="text-secondary">
                    {step.icon}
                  </div>
                </div>
                
                {/* Number badge */}
                <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
