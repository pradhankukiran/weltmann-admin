import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AlertItemProps {
  message: string;
  timestamp: string;
}

const AlertItem: React.FC<AlertItemProps> = ({ message, timestamp }) => {
  return (
    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  );
}

export default AlertItem;