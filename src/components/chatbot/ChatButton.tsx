import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';

export const ChatButton: React.FC = () => {
  const { isOpen, setIsOpen, preferences } = useChat();

  return (
    <div className="relative">
      {/* Notification badge for first-time users */}
      {preferences.isFirstTimeUser && !isOpen && (
        <div className="absolute -top-12 right-0 bg-card px-4 py-2 rounded-xl shadow-lg border border-border animate-bounce-subtle">
          <p className="text-sm font-medium whitespace-nowrap">
            {preferences.language === 'hi' ? 'मुझसे कुछ भी पूछें! 👋' : 'Ask me anything! 👋'}
          </p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
        </div>
      )}
      
      <Button
        variant="secondary"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full shadow-xl hover:shadow-glow"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};
