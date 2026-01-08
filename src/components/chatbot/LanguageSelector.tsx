import React from 'react';
import { languages } from '@/data/languages';
import { useChat } from '@/context/ChatContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { preferences, setPreferences } = useChat();

  if (compact) {
    return (
      <div className="relative group">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Globe className="w-5 h-5" />
        </Button>
        <div className="absolute right-0 top-full mt-2 bg-card rounded-xl shadow-lg border border-border p-2 hidden group-hover:block min-w-[200px] z-50 animate-scale-in">
          <div className="grid grid-cols-2 gap-1">
            {languages.slice(0, 8).map((lang) => (
              <button
                key={lang.code}
                onClick={() => setPreferences({ language: lang.code })}
                className={`px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  preferences.language === lang.code
                    ? 'bg-secondary text-secondary-foreground font-medium'
                    : 'hover:bg-muted'
                }`}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Globe className="w-4 h-4" />
        <span>Select your language / अपनी भाषा चुनें</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setPreferences({ language: lang.code })}
            className={`lang-pill ${
              preferences.language === lang.code ? 'active' : ''
            }`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};
