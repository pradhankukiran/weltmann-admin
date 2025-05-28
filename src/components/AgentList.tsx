import React, { useState, useRef, useEffect } from 'react';
import { User, CheckCircle2, XCircle, ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  type: string;
  lastActive: string;
  handledCalls: number;
  successRate: number;
}

interface AgentListProps {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onDelete: (agent: Agent) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AgentList: React.FC<AgentListProps> = ({ agents, onEdit, onDelete, currentPage, totalPages, onPageChange }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setExpandedRows(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="overflow-x-auto" ref={tableRef}>
      <table className="w-full">
        <thead className="bg-primary/5">
          <tr className="text-left">
            <th className="px-4 py-3 text-xs font-semibold text-primary uppercase tracking-wider">Agent</th>
            <th className="px-4 py-3 text-xs font-semibold text-primary uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-xs font-semibold text-primary uppercase tracking-wider">Success Rate</th>            
            <th className="w-8 px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {agents.map((agent) => (
            <React.Fragment key={agent.id}>
              <tr 
                className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer" 
                onClick={() => toggleRow(agent.id)}
              >
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">{agent.name}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  agent.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {agent.status === 'active' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${agent.successRate}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{agent.successRate}%</span>
                </div>
              </td>
              <td className="px-4 py-4 text-gray-400">
                {expandedRows.has(agent.id) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </td>
              </tr>
              {expandedRows.has(agent.id) && (
                <tr className="border-t border-gray-100 bg-gray-50/50">
                  <td colSpan={4} className="px-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Type:</span>
                        <p className="mt-1">{agent.type}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Last Active:</span>
                        <p className="mt-1">{agent.lastActive}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Handled Calls:</span>
                        <p className="mt-1">{agent.handledCalls.toLocaleString()}</p>
                      </div>
                      <div className="col-span-3 mt-4 flex gap-2">
                        <button
                          onClick={() => onEdit(agent)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit Agent</span>
                        </button>
                        <button
                          onClick={() => onDelete(agent)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Agent</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
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

export default AgentList;