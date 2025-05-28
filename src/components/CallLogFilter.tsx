import React, { useState } from 'react';
import { Filter, Clock, Calendar } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';

interface CallLogFilterProps {
  onDateRangeChange: (range: string) => void;
  onCustomDateChange: (start: Date, end: Date) => void;
  onAgentChange: (agent: string) => void;
  onOutcomeChange: (outcome: string) => void;
  onDurationChange: (min: number, max: number) => void;
}

const CallLogFilter: React.FC<CallLogFilterProps> = ({
  onDateRangeChange,
  onCustomDateChange,
  onAgentChange,
  onOutcomeChange,
  onDurationChange,
}) => {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [customDates, setCustomDates] = useState({
    start: new Date(),
    end: new Date()
  });

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    onDateRangeChange(range);
  };

  const handleCustomDateChange = () => {
    if (customDates.start && customDates.end) {
      onCustomDateChange(customDates.start, customDates.end);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 text-gray-600">
        <Filter size={20} />
        <span className="font-medium">Filters:</span>
      </div>
      
      <div className="flex items-center gap-2">
        <select 
          className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          onChange={(e) => handleRangeChange(e.target.value)}
          value={selectedRange}
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="custom">Custom Range</option>
        </select>

        {selectedRange === 'custom' && (
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Calendar className="w-5 h-5 text-gray-500" />
              </button>
            </Popover.Trigger>
            <Popover.Content className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    value={customDates.start.toISOString().split('T')[0]}
                    onChange={(e) => setCustomDates(prev => ({ ...prev, start: new Date(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    value={customDates.end.toISOString().split('T')[0]}
                    onChange={(e) => setCustomDates(prev => ({ ...prev, end: new Date(e.target.value) }))}
                  />
                </div>
                <button
                  onClick={handleCustomDateChange}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Apply Range
                </button>
              </div>
            </Popover.Content>
          </Popover.Root>
        )}
      </div>

      <select 
        className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        onChange={(e) => onAgentChange(e.target.value)}
        defaultValue="all"
      >
        <option value="all">All Agents</option>
        <option value="agent1">Customer Support Agent</option>
        <option value="agent2">Sales Assistant</option>
        <option value="agent3">Technical Support</option>
      </select>

      <select 
        className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        onChange={(e) => onOutcomeChange(e.target.value)}
        defaultValue="all"
      >
        <option value="all">All Outcomes</option>
        <option value="resolved">Resolved by AI</option>
        <option value="escalated">Escalated to Human</option>
        <option value="abandoned">Abandoned by Caller</option>
        <option value="shopware_success">Shopware Success</option>
        <option value="shopware_failed">Shopware Failed</option>
      </select>

      {/* Placeholder for Duration Filter */}
      <div className="flex items-center gap-2">
        <Clock size={18} className="text-gray-500" />
        <span className="text-sm text-gray-600">Duration: (TODO)</span>
        {/* Example: <input type="number" placeholder="Min" onChange={e => onDurationChange(parseInt(e.target.value), currentMax)} /> */}
        {/* Example: <input type="number" placeholder="Max" onChange={e => onDurationChange(currentMin, parseInt(e.target.value))} /> */}
      </div>
    </div>
  );
};

export default CallLogFilter;