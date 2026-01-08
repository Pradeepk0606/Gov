import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { useChat } from '@/context/ChatContext';

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ onTranscript }) => {
  const { preferences } = useChat();
  
  const { isListening, startListening, stopListening, isSupported, transcript } = useVoiceRecognition({
    language: preferences.language,
    onResult: (text) => {
      if (text.trim()) {
        onTranscript(text);
      }
    },
    onError: (error) => {
      console.error('Voice error:', error);
    },
  });

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="lg"
        onClick={isListening ? stopListening : startListening}
        className={`relative ${isListening ? 'voice-pulse bg-destructive' : ''}`}
        aria-label={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </Button>
      
      {isListening && transcript && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card px-3 py-2 rounded-lg shadow-lg border border-border whitespace-nowrap text-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-secondary animate-pulse" />
            <span className="max-w-[200px] truncate">{transcript}</span>
          </div>
        </div>
      )}
    </div>
  );
};
