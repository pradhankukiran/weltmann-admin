import React from 'react';
import { Play, Volume2 } from 'lucide-react';

interface VoiceSelectionProps {
  value?: VoiceConfig;
  onChange: (config: VoiceConfig) => void;
}

export interface VoiceConfig {
  voiceId: string;
  language: string;
}

const mockVoices = [
  { id: 'voice1', name: 'Rachel', language: 'en-US' },
  { id: 'voice2', name: 'John', language: 'en-US' },
  { id: 'voice3', name: 'Maria', language: 'es-ES' },
];

const languages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'de-DE', name: 'German' },
];

const VoiceSelection: React.FC<VoiceSelectionProps> = ({ value, onChange }) => {
  const currentValue = value || { voiceId: '', language: '' };

  const handlePreviewVoice = async (voiceId: string) => {
    const voice = mockVoices.find(v => v.id === voiceId);
    if (!voice) return;

    // Mock audio playback
    const utterance = new SpeechSynthesisUtterance("Hello, I'm " + voice.name + ". How can I help you today?");
    utterance.lang = voice.language;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Voice Selection
        </label>
        <div className="flex gap-2">
          <select
            value={currentValue.voiceId}
            onChange={(e) => onChange({ ...currentValue, voiceId: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="">Select a voice</option>
            {mockVoices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handlePreviewVoice(currentValue.voiceId)}
            disabled={!currentValue.voiceId}
            className="px-4 py-2 bg-secondary text-gray-900 rounded-lg hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Preview Voice"
          >
            <Volume2 size={20} />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Click the speaker icon to preview how the selected voice sounds.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Language
        </label>
        <select
          value={currentValue.language}
          onChange={(e) => onChange({ ...currentValue, language: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
        >
          <option value="">Select a language</option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VoiceSelection;