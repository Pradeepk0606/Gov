import React, { useEffect } from 'react';
import { ChatProvider, useChat } from '@/context/ChatContext';
import { ChatWindow } from './ChatWindow';
import { ChatButton } from './ChatButton';

const ChatbotContent: React.FC = () => {
  const { isOpen, setIsOpen, preferences } = useChat();

  // Auto-open for first-time users after a delay
  useEffect(() => {
    if (preferences.isFirstTimeUser) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [preferences.isFirstTimeUser, setIsOpen]);

  return (
    <div className="chatbot-container">
      {isOpen && <ChatWindow />}
      {!isOpen && <ChatButton />}
    </div>
  );
};

export const Chatbot: React.FC = () => {
  return (
    <ChatProvider>
      <ChatbotContent />
    </ChatProvider>
  );
};
