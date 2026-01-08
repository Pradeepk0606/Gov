import React from 'react';
import { Message } from '@/types/chat';
import { useChat } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';
import { Volume2, User, Bot } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { preferences, handleOptionSelect } = useChat();
  const { speak, isSpeaking, isSupported } = useSpeechSynthesis({
    language: preferences.language,
  });

  const isBot = message.type === 'bot';

  return (
    <div
      className={`flex gap-3 animate-slide-up ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={`max-w-[80%] space-y-2`}>
        <div className={isBot ? 'chat-bubble-bot' : 'chat-bubble-user'}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        {/* Quick options */}
        {message.options && message.options.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                size="sm"
                onClick={() => handleOptionSelect(option)}
                className="text-xs hover:bg-secondary hover:text-secondary-foreground hover:border-secondary"
              >
                {option.icon && <span className="mr-1">{option.icon}</span>}
                {preferences.language === 'hi' && option.labelHi ? option.labelHi : option.label}
              </Button>
            ))}
          </div>
        )}
        
        {/* Text-to-speech button for bot messages */}
        {isBot && isSupported && preferences.voiceEnabled && (
          <button
            onClick={() => speak(message.content)}
            className={`text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors ${
              isSpeaking ? 'text-secondary' : ''
            }`}
            aria-label="Listen to message"
          >
            <Volume2 className={`w-3 h-3 ${isSpeaking ? 'animate-pulse' : ''}`} />
            <span>{isSpeaking ? 'Speaking...' : 'Listen'}</span>
          </button>
        )}
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};
