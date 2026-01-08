import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-3 chat-bubble-bot w-fit">
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0s' }} />
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0.2s' }} />
      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: '0.4s' }} />
    </div>
  );
};
