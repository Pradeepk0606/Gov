export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  options?: QuickOption[];
  step?: StepInfo;
}

export interface QuickOption {
  id: string;
  label: string;
  labelHi?: string; // Hindi translation
  icon?: string;
  action: string;
}

export interface StepInfo {
  current: number;
  total: number;
  title: string;
  description: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

export interface Service {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  category: string;
  steps: number;
  estimatedTime: string;
}

export interface UserPreferences {
  language: string;
  isFirstTimeUser: boolean;
  voiceEnabled: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
}
