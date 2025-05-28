import React from 'react';
import { Filter } from 'lucide-react';

interface ReportFilterProps {
  onDateChange: (range: string) => void;
  onAgentChange?: (agent: string) => void;
  onIntentChange?: (intent: string) => void;
  showAgentFilter?: boolean;
  showIntentFilter?: boolean;
}

const ReportFilter: React.FC<ReportFilterProps> = ({
  onDateChange,
  onAgentChange,
  onIntentChange,
  showAgentFilter = false,
  showIntentFilter = false,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 text-gray-600">
        <Filter size={20} />
        <span className="font-medium">Filters:</span>
      </div>
      
      <select 
        className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        onChange={(e) => onDateChange(e.target.value)}
        defaultValue="7d"
      >
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>

      {showAgentFilter && (
        <select 
          className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          onChange={(e) => onAgentChange?.(e.target.value)}
          defaultValue="all"
        >
          <option value="all">All Agents</option>
          <option value="agent1">Agent 1</option>
          <option value="agent2">Agent 2</option>
          <option value="agent3">Agent 3</option>
        </select>
      )}

      {showIntentFilter && (
        <select 
          className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          onChange={(e) => onIntentChange?.(e.target.value)}
          defaultValue="all"
        >
          <option value="all">All Intents</option>
          <option value="order_status">Order Status</option>
          <option value="product_info">Product Info</option>
          <option value="returns">Returns</option>
        </select>
      )}
    </div>
  );
};

export default ReportFilter