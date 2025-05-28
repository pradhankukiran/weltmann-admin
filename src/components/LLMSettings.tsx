import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Calculator, AlertCircle } from 'lucide-react';

interface LLMSettingsProps {
  value: LLMConfig;
  onChange: (config: LLMConfig) => void;
}

export interface LLMConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  stopSequences: string[];
}

const LLMSettings: React.FC<LLMSettingsProps> = ({ value, onChange }) => {
  const handleStopSequenceAdd = () => {
    const newStopSequences = [...value.stopSequences, ''];
    onChange({ ...value, stopSequences: newStopSequences });
  };

  const handleStopSequenceChange = (index: number, sequence: string) => {
    const newStopSequences = [...value.stopSequences];
    newStopSequences[index] = sequence;
    onChange({ ...value, stopSequences: newStopSequences });
  };

  const handleStopSequenceRemove = (index: number) => {
    const newStopSequences = value.stopSequences.filter((_, i) => i !== index);
    onChange({ ...value, stopSequences: newStopSequences });
  };

  const [usageEstimate, setUsageEstimate] = useState<{
    tokensPerCall: number;
    costPerCall: number;
    monthlyEstimate: { tokens: number; cost: number };
  } | null>(null);

  const calculateUsage = () => {
    // Mock calculation based on current settings
    const tokensPerCall = value.maxTokens;
    const costPerToken = value.model === 'gpt-4' ? 0.00003 : 0.000002;
    const costPerCall = tokensPerCall * costPerToken;
    
    // Estimate 1000 calls per month
    const monthlyTokens = tokensPerCall * 1000;
    const monthlyCost = costPerCall * 1000;

    setUsageEstimate({
      tokensPerCall,
      costPerCall,
      monthlyEstimate: {
        tokens: monthlyTokens,
        cost: monthlyCost
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Model Selection
        </label>
        <select
          value={value.model}
          onChange={(e) => onChange({ ...value, model: e.target.value })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
        >
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Temperature ({value.temperature})
        </label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[value.temperature]}
          max={1}
          step={0.1}
          onValueChange={([temp]) => onChange({ ...value, temperature: temp })}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-primary rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Temperature"
          />
        </Slider.Root>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Tokens
        </label>
        <input
          type="number"
          value={value.maxTokens}
          onChange={(e) => onChange({ ...value, maxTokens: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          min={1}
          max={4096}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Top P ({value.topP})
        </label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[value.topP]}
          max={1}
          step={0.1}
          onValueChange={([topP]) => onChange({ ...value, topP })}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-primary rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Top P"
          />
        </Slider.Root>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Frequency Penalty ({value.frequencyPenalty})
        </label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[value.frequencyPenalty]}
          max={2}
          step={0.1}
          onValueChange={([freq]) => onChange({ ...value, frequencyPenalty: freq })}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-primary rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Frequency Penalty"
          />
        </Slider.Root>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Presence Penalty ({value.presencePenalty})
        </label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[value.presencePenalty]}
          max={2}
          step={0.1}
          onValueChange={([presence]) => onChange({ ...value, presencePenalty: presence })}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-primary rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-primary rounded-full hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Presence Penalty"
          />
        </Slider.Root>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stop Sequences
        </label>
        <div className="space-y-2">
          {value.stopSequences.map((sequence, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={sequence}
                onChange={(e) => handleStopSequenceChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter stop sequence"
              />
              <button
                type="button"
                onClick={() => handleStopSequenceRemove(index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleStopSequenceAdd}
            className="text-primary hover:text-primary-dark transition-colors text-sm"
          >
            + Add Stop Sequence
          </button>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={calculateUsage}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
        >
          <Calculator size={20} />
          <span>Calculate Expected LLM Usage</span>
        </button>
        
        {usageEstimate && (
          <div className="mt-4 p-4 bg-primary/5 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <AlertCircle size={16} />
              <span className="font-medium">Usage Estimate</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-600">Per Call:</p>
                <p className="font-medium">{usageEstimate.tokensPerCall.toLocaleString()} tokens</p>
                <p className="text-sm text-gray-600">${usageEstimate.costPerCall.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Estimate (1000 calls):</p>
                <p className="font-medium">{usageEstimate.monthlyEstimate.tokens.toLocaleString()} tokens</p>
                <p className="text-sm text-gray-600">${usageEstimate.monthlyEstimate.cost.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLMSettings;