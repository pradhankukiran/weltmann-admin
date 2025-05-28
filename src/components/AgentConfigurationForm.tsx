import React, { useState, useRef } from 'react';
import { X, User } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import * as Tabs from '@radix-ui/react-tabs';
import VoiceSelection, { VoiceConfig } from './VoiceSelection';
import LLMSettings, { LLMConfig } from './LLMSettings';
import KnowledgeBaseSelector from './KnowledgeBaseSelector';

interface AgentConfigurationFormProps {
  onClose: () => void;
  onSubmit: (data: AgentFormData) => void;
  initialData?: AgentFormData;
}

export interface AgentFormData {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  voice: VoiceConfig;
  llmSettings: LLMConfig;
  knowledgeBases: string[];
  initialPrompt: string;
}

const defaultFormData: AgentFormData = {
  name: '',
  description: '',
  status: 'active',
  voice: {
    voiceId: '',
    language: '',
  },
  llmSettings: {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    stopSequences: [],
  },
  knowledgeBases: [], 
  initialPrompt: ''
};

const tabItems = [
  { value: 'voice', label: 'Voice Configuration' },
  { value: 'llm', label: 'LLM Settings' },
  { value: 'knowledge', label: 'Knowledge Base' }
];

const AgentConfigurationForm: React.FC<AgentConfigurationFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<AgentFormData>(initialData || defaultFormData);
  const [currentTab, setCurrentTab] = useState('voice');
  const formRef = useRef<HTMLFormElement>(null);

  const [llmUsageEstimate, setLlmUsageEstimate] = useState<{
    tokensPerCall: number;
    costPerCall: number;
    monthlyEstimate: { tokens: number; cost: number };
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement avatar upload
      console.log('Upload avatar:', file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
          <form ref={formRef} onSubmit={handleSubmit} >
            {/* Agent Name and Status */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <label className="block text-lg font-semibold text-primary mb-1">
                  Agent Name
                </label>
                <input
                  type="text"
                  placeholder="Enter agent name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Switch.Root
                  checked={formData.status === 'active'}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, status: checked ? 'active' : 'inactive' })
                  }
                  className="w-[42px] h-[25px] bg-gray-200 rounded-full relative data-[state=checked]:bg-secondary outline-none cursor-default"
                >
                  <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px] shadow-sm" />
                </Switch.Root>
                <span className="text-lg text-gray-600">
                  {formData.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Initial Prompt and Description */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-primary mb-1">
                  Initial Prompt / Greeting
                </label>
                <textarea
                  value={formData.initialPrompt}
                  onChange={(e) => setFormData({ ...formData, initialPrompt: e.target.value })}
                  placeholder="Enter the initial message or greeting the agent will use..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[80px] resize-none"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-primary mb-1">
                  Description/Persona
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the agent's personality and behavior..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[140px] resize-none"
                  required
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
              <div className="flex justify-center border-t border-gray-200 pt-6">
                <Tabs.List className="flex gap-2 bg-gray-100/50 p-1 rounded-lg">
                  {tabItems.map((tab) => (
                    <Tabs.Trigger
                      key={tab.value}
                      value={tab.value}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentTab === tab.value
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-200/50'
                      }`}
                    >
                      {tab.label}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </div>

              <div className="mt-2 bg-primary/5 rounded-lg p-6">
                <Tabs.Content value="voice">
                  <VoiceSelection
                    value={formData.voice}
                    onChange={(voice) => setFormData({ ...formData, voice })}
                  />
                </Tabs.Content>

                <Tabs.Content value="llm">
                  <LLMSettings
                    value={formData.llmSettings}
                    onChange={(llmSettings) => setFormData({ ...formData, llmSettings })}
                  />
                </Tabs.Content>

                <Tabs.Content value="knowledge">
                  <KnowledgeBaseSelector
                    selectedKnowledgeBases={formData.knowledgeBases}
                    onSelect={(knowledgeBases) => setFormData({ ...formData, knowledgeBases })}
                  />
                </Tabs.Content>
              </div>
            </Tabs.Root>
            
            {/* Footer moved inside the form */}
            <div className="p-4 border-t border-gray-200 bg-white bottom-0 z-10 mt-6">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => formRef.current?.requestSubmit()}
                  className="px-6 py-2.5 bg-secondary text-gray-900 font-medium rounded-lg hover:bg-secondary-dark transition-all transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  {initialData ? 'Update Agent' : 'Create Agent'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentConfigurationForm;