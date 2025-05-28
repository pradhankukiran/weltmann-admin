import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: () => void;
  format: 'csv' | 'excel';
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport, format }) => {
  return (
    <button
      onClick={onExport}
      className="flex items-center gap-2 px-4 py-2 bg-secondary border border-secondary rounded-lg text-gray-900 hover:bg-secondary-dark transition-colors"
    >
      <Download size={16} />
      <span>Export {format.toUpperCase()}</span>
    </button>
  );
};

export default ExportButton