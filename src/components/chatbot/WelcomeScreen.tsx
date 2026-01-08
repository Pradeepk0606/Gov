import React from 'react';
import { useChat } from '@/context/ChatContext';
import { LanguageSelector } from './LanguageSelector';
import { Button } from '@/components/ui/button';
import { popularServices } from '@/data/services';
import { ArrowRight, Sparkles, HelpCircle, FileText, Search } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { preferences, addMessage } = useChat();

  const welcomeText = {
    en: {
      title: 'Welcome to Digital India Assistant',
      subtitle: 'I\'m here to help you access government services easily',
      firstTime: 'First time here? I\'ll guide you step by step!',
      quickActions: 'Quick Actions',
      popularServices: 'Popular Services',
      startChat: 'Start Chatting',
    },
    hi: {
      title: 'डिजिटल इंडिया सहायक में आपका स्वागत है',
      subtitle: 'मैं आपको सरकारी सेवाओं तक आसानी से पहुंचने में मदद करने के लिए यहां हूं',
      firstTime: 'पहली बार यहां? मैं आपको कदम दर कदम मार्गदर्शन करूंगा!',
      quickActions: 'त्वरित कार्य',
      popularServices: 'लोकप्रिय सेवाएं',
      startChat: 'चैट शुरू करें',
    },
  };

  const t = welcomeText[preferences.language as keyof typeof welcomeText] || welcomeText.en;

  const quickActions = [
    { icon: <FileText className="w-5 h-5" />, label: preferences.language === 'hi' ? 'प्रमाण पत्र आवेदन' : 'Apply for Certificate', action: 'certificate' },
    { icon: <Search className="w-5 h-5" />, label: preferences.language === 'hi' ? 'आवेदन ट्रैक करें' : 'Track Application', action: 'track' },
    { icon: <HelpCircle className="w-5 h-5" />, label: preferences.language === 'hi' ? 'मदद लें' : 'Get Help', action: 'help' },
  ];

  const handleQuickAction = (action: string) => {
    const messages: Record<string, { en: string; hi: string }> = {
      certificate: { en: 'I want to apply for a certificate', hi: 'मैं एक प्रमाण पत्र के लिए आवेदन करना चाहता हूं' },
      track: { en: 'I want to track my application', hi: 'मैं अपना आवेदन ट्रैक करना चाहता हूं' },
      help: { en: 'I need help', hi: 'मुझे मदद चाहिए' },
    };
    
    const msg = messages[action];
    addMessage(preferences.language === 'hi' ? msg.hi : msg.en, 'user');
    
    setTimeout(() => {
      addMessage(
        preferences.language === 'hi'
          ? 'बिल्कुल! मैं आपकी मदद करने के लिए तैयार हूं। कृपया मुझे बताएं कि आप कौन सी सेवा चाहते हैं।'
          : 'Absolutely! I\'m ready to help. Please tell me which service you need.',
        'bot',
        [
          { id: '1', label: 'Income Certificate', labelHi: 'आय प्रमाण पत्र', icon: '📄', action: 'income' },
          { id: '2', label: 'Caste Certificate', labelHi: 'जाति प्रमाण पत्र', icon: '📋', action: 'caste' },
          { id: '3', label: 'Domicile Certificate', labelHi: 'निवास प्रमाण पत्र', icon: '🏠', action: 'domicile' },
        ]
      );
    }, 500);
  };

  const handleServiceClick = (serviceId: string) => {
    const service = popularServices.find(s => s.id === serviceId);
    if (service) {
      addMessage(
        preferences.language === 'hi' 
          ? `मुझे ${service.nameHi} के बारे में जानना है` 
          : `I need help with ${service.name}`,
        'user'
      );
      
      setTimeout(() => {
        addMessage(
          preferences.language === 'hi'
            ? `${service.nameHi} के लिए आवेदन करने में मैं आपकी सहायता करूंगा। इसमें ${service.steps} चरण हैं और लगभग ${service.estimatedTime} लगेंगे। क्या आप शुरू करने के लिए तैयार हैं?`
            : `I'll help you with ${service.name}. This process has ${service.steps} steps and takes about ${service.estimatedTime}. Ready to begin?`,
          'bot',
          [
            { id: 'start', label: 'Yes, start now', labelHi: 'हां, अभी शुरू करें', icon: '✅', action: 'start_service' },
            { id: 'info', label: 'Tell me more', labelHi: 'और बताएं', icon: 'ℹ️', action: 'more_info' },
          ]
        );
      }, 500);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
      {/* Welcome Header */}
      <div className="text-center space-y-2 py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm mb-2">
          <Sparkles className="w-4 h-4" />
          <span>{preferences.language === 'hi' ? 'AI संचालित सहायक' : 'AI-Powered Assistant'}</span>
        </div>
        <h2 className="text-xl font-semibold text-foreground">{t.title}</h2>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        {preferences.isFirstTimeUser && (
          <p className="text-sm text-success font-medium">{t.firstTime}</p>
        )}
      </div>

      {/* Language Selector */}
      <LanguageSelector />

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">{t.quickActions}</h3>
        <div className="grid grid-cols-1 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={action.action}
              onClick={() => handleQuickAction(action.action)}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-all duration-200 group touch-target"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {action.icon}
              </div>
              <span className="flex-1 text-left font-medium text-sm">{action.label}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Popular Services */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">{t.popularServices}</h3>
        <div className="grid grid-cols-2 gap-2">
          {popularServices.slice(0, 4).map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-secondary hover:shadow-md transition-all duration-200 touch-target"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-2xl">{service.icon}</span>
              <span className="text-xs font-medium text-center leading-tight">
                {preferences.language === 'hi' ? service.nameHi : service.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
