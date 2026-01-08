import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Message, UserPreferences, QuickOption } from '@/types/chat';

interface ChatContextType {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  preferences: UserPreferences;
  currentStep: number;
  totalSteps: number;
  addMessage: (content: string, type: 'user' | 'bot', options?: QuickOption[]) => void;
  setIsOpen: (open: boolean) => void;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  handleOptionSelect: (option: QuickOption) => void;
  resetChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Simple UUID generator
const generateId = (): string => {
  return 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

const initialMessages: Message[] = [];

const defaultPreferences: UserPreferences = {
  language: 'en',
  isFirstTimeUser: true,
  voiceEnabled: true,
  fontSize: 'normal',
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [preferences, setPreferencesState] = useState<UserPreferences>(defaultPreferences);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const addMessage = useCallback((content: string, type: 'user' | 'bot', options?: QuickOption[]) => {
    const newMessage: Message = {
      id: generateId(),
      type,
      content,
      timestamp: new Date(),
      options,
    };

    if (type === 'bot') {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
      }, 800 + Math.random() * 500);
    } else {
      setMessages(prev => [...prev, newMessage]);
    }
  }, []);

  const setPreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setPreferencesState(prev => ({ ...prev, ...prefs }));
  }, []);

  const handleOptionSelect = useCallback((option: QuickOption) => {
    addMessage(option.label, 'user');
    
    // Simulate bot response based on action
    setTimeout(() => {
      switch (option.action) {
        case 'start_service':
          addMessage(
            preferences.language === 'hi' 
              ? 'बढ़िया! मैं आपकी मदद करूंगा। कृपया अपना आधार नंबर दर्ज करें।'
              : 'Great! I\'ll help you with that. Please enter your Aadhaar number to begin.',
            'bot'
          );
          break;
        case 'help':
          addMessage(
            preferences.language === 'hi'
              ? 'मैं यहां आपकी सहायता के लिए हूं। आप मुझसे कोई भी सरकारी सेवा के बारे में पूछ सकते हैं।'
              : 'I\'m here to help! You can ask me about any government service, and I\'ll guide you step by step.',
            'bot'
          );
          break;
        default:
          addMessage(
            preferences.language === 'hi'
              ? 'मैं समझ गया। कृपया आगे बढ़ने के लिए और जानकारी दें।'
              : 'I understand. Please provide more details to proceed.',
            'bot'
          );
      }
    }, 300);
  }, [addMessage, preferences.language]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setCurrentStep(0);
    setTotalSteps(0);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isTyping,
        preferences,
        currentStep,
        totalSteps,
        addMessage,
        setIsOpen,
        setPreferences,
        handleOptionSelect,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
