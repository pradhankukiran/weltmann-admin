import React from 'react';
import { BookOpen, X } from 'lucide-react';

interface KnowledgeBaseSelectorProps {
  selectedKnowledgeBases: string[];
  onSelect: (knowledgeBases: string[]) => void;
}

// Mock data - replace with actual API data
const availableKnowledgeBases = [
  { id: 'kb1', name: 'Product Manual 2024' },
  { id: 'kb2', name: 'Customer Support Guidelines' },
  { id: 'kb3', name: 'Technical Documentation' },
  { id: 'kb4', name: 'Sales Playbook' },
];

const KnowledgeBaseSelector: React.FC<KnowledgeBaseSelectorProps> = ({
  selectedKnowledgeBases,
  onSelect,
}) => {
  const handleToggleKnowledgeBase = (kbId: string) => {
    const newSelection = selectedKnowledgeBases.includes(kbId)
      ? selectedKnowledgeBases.filter(id => id !== kbId)
      : [...selectedKnowledgeBases, kbId];
    onSelect(newSelection);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {selectedKnowledgeBases.map((kbId) => {
          const kb = availableKnowledgeBases.find(k => k.id === kbId);
          if (!kb) return null;
          
          return (
            <div
              key={kb.id}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg"
            >
              <BookOpen size={16} />
              <span className="text-sm font-medium">{kb.name}</span>
              <button
                type="button"
                onClick={() => handleToggleKnowledgeBase(kb.id)}
                className="p-0.5 hover:bg-primary/20 rounded transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="border border-gray-200 rounded-lg divide-y">
        {availableKnowledgeBases.map((kb) => (
          <label
            key={kb.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedKnowledgeBases.includes(kb.id)}
              onChange={() => handleToggleKnowledgeBase(kb.id)}
              className="rounded border-gray-300 text-primary focus:ring-primary/20"
            />
            <BookOpen size={16} className="text-gray-400" />
            <span>{kb.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBaseSelector;