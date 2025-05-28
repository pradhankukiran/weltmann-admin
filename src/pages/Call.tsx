import React, { useState } from 'react';
import { Phone, Search, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { debounce } from 'lodash';
import CallLogFilter from '../components/CallLogFilter';
import CallLogTable from '../components/CallLogTable';
import CallDetailView from '../components/CallDetailView';

// Mock data - replace with actual API data
const mockCalls = [
  {
    id: 'CALL123',
    timestamp: '2024-03-20T10:30:00Z',
    duration: 245,
    callerId: '+1 (555) 123-4567',
    agentName: 'Customer Support Agent',
    outcome: 'resolved' as const,
    shopwareActivity: true,
    shopwareSuccess: true,
  },
  {
    id: 'CALL124',
    timestamp: '2024-03-20T11:15:00Z',
    duration: 180,
    callerId: '+1 (555) 987-6543',
    agentName: 'Sales Assistant',
    outcome: 'escalated' as const,
    shopwareActivity: true,
    shopwareSuccess: false,
  },
  {
    id: 'CALL125',
    timestamp: '2024-03-20T12:00:00Z',
    duration: 60,
    callerId: '+1 (555) 456-7890',
    agentName: 'Technical Support',
    outcome: 'abandoned' as const,
    shopwareActivity: false,
  },
];

const Call: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date } | null>(null);
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [selectedOutcome, setSelectedOutcome] = useState('all');
  const [durationRange, setDurationRange] = useState({ min: 0, max: Infinity });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5); // Replace with actual total pages from API
  const [selectedCall, setSelectedCall] = useState<typeof mockCalls[0] | null>(null);

  const debouncedSearch = debounce((term: string) => {
    // TODO: Implement API call for transcript search
    console.log('Searching transcripts for:', term);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleViewDetails = (call: typeof mockCalls[0]) => {
    setSelectedCall(call);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by caller ID or transcript..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-medium text-gray-600">Active Calls</span>
              </div>
              <p className="text-2xl font-bold text-primary">12</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-600">Resolution Rate</span>
              </div>
              <p className="text-2xl font-bold text-green-600">94%</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-gray-600">Avg. Duration</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">3:24</p>
            </div>
          </div>

          <CallLogFilter
            onDateRangeChange={setDateRange}
            onCustomDateChange={(start, end) => setCustomDateRange({ start, end })}
            onAgentChange={setSelectedAgent}
            onOutcomeChange={setSelectedOutcome}
            onDurationChange={(min, max) => setDurationRange({ min, max })}
          />

          <div className="mt-6">
            <CallLogTable
              calls={mockCalls}
              onViewDetails={handleViewDetails}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      
      {selectedCall && (
        <CallDetailView
          isOpen={true}
          onClose={() => setSelectedCall(null)}
          call={selectedCall}
        />
      )}
    </div>
  );
};

export default Call;