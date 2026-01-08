import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoiceButton } from './VoiceButton';
import { useChat } from '@/context/ChatContext';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, preferences, isTyping } = useChat();

  const placeholders: Record<string, string> = {
    en: 'Type a message or use voice...',
    hi: 'संदेश लिखें या आवाज़ का उपयोग करें...',
    ta: 'ஒரு செய்தி தட்டச்சு செய்யவும்...',
    te: 'సందేశం టైప్ చేయండి...',
    kn: 'ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ...',
    ml: 'ഒരു സന്ദേശം ടൈപ്പ് ചെയ്യുക...',
    bn: 'একটি বার্তা টাইপ করুন...',
    mr: 'संदेश टाइप करा...',
  };

  const handleSubmit = () => {
    if (input.trim() && !isTyping) {
      addMessage(input.trim(), 'user');
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        addMessage(
          preferences.language === 'hi'
            ? 'मैं आपका संदेश समझ गया। कृपया एक सेवा चुनें या अपना प्रश्न बताएं।'
            : 'I understand your message. Please select a service or tell me what you need help with.',
          'bot',
          [
            { id: '1', label: 'Apply for Certificate', labelHi: 'प्रमाण पत्र के लिए आवेदन', icon: '📄', action: 'start_service' },
            { id: '2', label: 'Track Application', labelHi: 'आवेदन ट्रैक करें', icon: '🔍', action: 'track' },
            { id: '3', label: 'Need Help', labelHi: 'मदद चाहिए', icon: '❓', action: 'help' },
          ]
        );
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setInput(text);
    // Auto-submit after a short delay
    setTimeout(() => {
      addMessage(text, 'user');
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        addMessage(
          preferences.language === 'hi'
            ? 'मैंने आपकी बात सुन ली। मैं आपकी सहायता के लिए तैयार हूं।'
            : 'I heard you! Let me help you with that.',
          'bot'
        );
      }, 500);
    }, 500);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 100)}px`;
    }
  }, [input]);

  return (
    <div className="border-t border-border p-4 bg-card">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[preferences.language] || placeholders.en}
            className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm min-h-[48px] max-h-[100px]"
            rows={1}
            disabled={isTyping}
          />
        </div>
        
        <VoiceButton onTranscript={handleVoiceTranscript} />
        
        <Button
          variant="secondary"
          size="lg"
          onClick={handleSubmit}
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-2">
        {preferences.language === 'hi' 
          ? 'आप हिंदी या अंग्रेजी में टाइप कर सकते हैं'
          : 'You can type in English or Hindi'}
      </p>
    </div>
  );
};
