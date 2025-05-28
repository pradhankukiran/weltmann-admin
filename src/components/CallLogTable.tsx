import React from 'react';
import { Eye, ShoppingCart, CheckCircle2, XCircle } from 'lucide-react';

interface Call {
  id: string;
  timestamp: string;
  duration: number;
  callerId: string;
  agentName: string;
  outcome: 'resolved' | 'escalated' | 'abandoned';
  shopwareActivity: boolean;
  shopwareSuccess?: boolean;
}

interface CallLogTableProps {
  calls: Call[];
  onViewDetails: (call: Call) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CallLogTable: React.FC<CallLogTableProps> = ({
  calls,
  onViewDetails,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getOutcomeColor = (outcome: Call['outcome']) => {
    switch (outcome) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'escalated':
        return 'bg-yellow-100 text-yellow-800';
      case 'abandoned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary/5">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Call ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Date & Time</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Duration</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Agent</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Outcome</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {calls.map((call) => (
            <tr key={call.id} className="hover:bg-gray-50/50">
              <td className="px-4 py-4 font-mono text-sm">{call.id}</td>
              <td className="px-4 py-4">{new Date(call.timestamp).toLocaleString()}</td>
              <td className="px-4 py-4">{formatDuration(call.duration)}</td>
              <td className="px-4 py-4">{call.agentName}</td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOutcomeColor(call.outcome)}`}>
                  {call.outcome.charAt(0).toUpperCase() + call.outcome.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4">
                <button
                  onClick={() => onViewDetails(call)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye size={20} className="text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 p-4 border-t border-gray-100">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage <= 1}
            className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage >= totalPages}
            className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallLogTable;