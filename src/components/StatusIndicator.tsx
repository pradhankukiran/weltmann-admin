import React from 'react';
import { Circle, CheckCircle2, XCircle } from 'lucide-react';

type Status = 'operational' | 'down';

interface StatusIndicatorProps {
  name: string;
  status: Status;
  icon: React.ReactNode;
}

const statusConfig = {
  operational: {
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Operational',
    icon: CheckCircle2
  },
  down: {
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Down',
    icon: XCircle
  }
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ name, status, icon }) => {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={`relative p-4 rounded-lg border ${config.borderColor} ${config.bgColor} flex flex-col justify-between h-full`}>
      <div className="absolute top-3 right-3 p-1 bg-gray-100 rounded-full">
        <Circle 
          className={`w-3 h-3 ${config.color} animate-pulse`}
          fill="currentColor"
        />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <div className="text-gray-600">
            {icon}
          </div>
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <StatusIcon className={`w-5 h-5 ${config.color}`} />
          <span className={`text-sm ${config.color} font-medium`}>{config.label}</span>
        </div>
      </div>
    </div>
  );
}

export default StatusIndicator;