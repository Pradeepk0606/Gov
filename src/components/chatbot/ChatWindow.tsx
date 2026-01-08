import React, { useEffect, useRef } from 'react';
import { X, Minimize2, Settings, RotateCcw } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeScreen } from './WelcomeScreen';
import { LanguageSelector } from './LanguageSelector';
import { Button } from '@/components/ui/button';

export const ChatWindow: React.FC = () => {
  const { messages, setIsOpen, isTyping, resetChat, preferences } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const hasMessages = messages.length > 0;

  return (
    <div className="chatbot-window w-[380px] h-[600px] max-h-[80vh] flex flex-col animate-scale-in tricolor-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-lg">🇮🇳</span>
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              {preferences.language === 'hi' ? 'डिजिटल इंडिया सहायक' : 'Digital India Assistant'}
            </h3>
            <p className="text-xs opacity-80">
              {preferences.language === 'hi' ? 'ऑनलाइन • 24/7 उपलब्ध' : 'Online • Available 24/7'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <LanguageSelector compact />
          {hasMessages && (
            <Button
              variant="ghost"
              size="icon"
              onClick={resetChat}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              aria-label="Reset chat"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area or Welcome Screen */}
      {hasMessages ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/50 to-background scrollbar-hide">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <WelcomeScreen />
      )}

      {/* Input Area */}
      <ChatInput />
    </div>
  );
};
