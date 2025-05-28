import React, { useState } from 'react';
import { Cpu, Zap, Thermometer, Gauge, Repeat, Scale } from 'lucide-react';
import LLMSettings, { LLMConfig } from './LLMSettings';

interface WorkspaceLLMSettingsProps {
  initialSettings?: LLMConfig;
  onSave: (settings: LLMConfig) => void;
}

const defaultSettings: LLMConfig = {
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  stopSequences: [],
};

const WorkspaceLLMSettings: React.FC<WorkspaceLLMSettingsProps> = ({
  initialSettings = defaultSettings,
  onSave,
}) => {
  const [settings, setSettings] = useState<LLMConfig>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(settings);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Workspace LLM Settings</h2>
            <p className="text-xl text-gray-600 mt-1">
              Configure default LLM parameters for your workspace
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-primary" />
              <label className="text-lg font-bold text-gray-700">Model Selection</label>
            </div>
            <select
              value={settings.model}
              onChange={(e) => setSettings({ ...settings, model: e.target.value })}
              className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-primary" />
              <label className="text-lg font-bold text-gray-700">Maximum Tokens</label>
            </div>
            <input
              type="number"
              value={settings.maxTokens}
              onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) })}
              className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white shadow-sm transition-shadow hover:shadow-md"
              min={1}
              max={4096}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="w-4 h-4 text-primary" />
              <label className="text-lg font-bold text-gray-700">Temperature</label>
              <span className="ml-auto text-lg font-bold bg-white px-3 py-1.5 rounded-md shadow-sm">
                {settings.temperature}
              </span>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                value={settings.temperature}
                onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                min={0}
                max={1}
                step={0.1}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Conservative</span>
                <span>Creative</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="w-4 h-4 text-primary" />
              <label className="text-lg font-bold text-gray-700">Top P</label>
              <span className="ml-auto text-lg font-bold bg-white px-3 py-1.5 rounded-md shadow-sm">
                {settings.topP}
              </span>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                value={settings.topP}
                onChange={(e) => setSettings({ ...settings, topP: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                min={0}
                max={1}
                step={0.1}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Focused</span>
                <span>Diverse</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Repeat className="w-4 h-4 text-primary" />
              <label className="text-lg font-bold text-gray-700">Frequency Penalty</label>
              <span className="ml-auto text-lg font-bold bg-white px-3 py-1.5 rounded-md shadow-sm">
                {settings.frequencyPenalty}
              </span>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                value={settings.frequencyPenalty}
                onChange={(e) => setSettings({ ...settings, frequencyPenalty: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                min={0}
                max={2}
                step={0.1}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Allow Repetition</span>
                <span>Avoid Repetition</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Repeat className="w-4 h-4 text-primary" />
              <label className="text-lg font-bold text-gray-700">Presence Penalty</label>
              <span className="ml-auto text-lg font-bold bg-white px-3 py-1.5 rounded-md shadow-sm">
                {settings.presencePenalty}
              </span>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                value={settings.presencePenalty}
                onChange={(e) => setSettings({ ...settings, presencePenalty: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                min={0}
                max={2}
                step={0.1}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Stay Focused</span>
                <span>Explore New Topics</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 bg-secondary text-gray-900 text-lg font-bold rounded-lg hover:bg-secondary-dark transition-all transform hover:scale-105 shadow-sm hover:shadow-md disabled:opacity-50 disabled:transform-none disabled:shadow-none"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLLMSettings;