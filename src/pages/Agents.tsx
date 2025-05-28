import React, { useState } from 'react';
import { Users, Search, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import AgentList from '../components/AgentList';
import AgentConfigurationForm, { AgentFormData } from '../components/AgentConfigurationForm';
import ConfirmationModal from '../components/ConfirmationModal';
import WorkspaceLLMSettings from '../components/WorkspaceLLMSettings';
import PhoneNumberManagement from '../components/PhoneNumberManagement';
import { LLMConfig } from '../components/LLMSettings';

// Mock data - replace with actual API data
const mockAgents = [
  {
    id: '1',
    name: 'Customer Support Agent',
    status: 'active' as const,
    type: 'Customer Service',
    lastActive: '2 minutes ago',
    handledCalls: 1234,
    successRate: 95
  },
  {
    id: '2',
    name: 'Sales Assistant',
    status: 'active' as const,
    type: 'Sales',
    lastActive: '5 minutes ago',
    handledCalls: 956,
    successRate: 88
  },
  {
    id: '3',
    name: 'Technical Support',
    status: 'inactive' as const,
    type: 'Technical Support',
    lastActive: '1 hour ago',
    handledCalls: 2341,
    successRate: 92
  }
];

const Agents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5); // Replace with actual total pages from API
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<typeof mockAgents[0] | null>(null);

  const handleSaveWorkspaceSettings = async (settings: LLMConfig) => {
    // TODO: Implement API call to save workspace settings
    console.log('Saving workspace settings:', settings);
  };

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateAgent = () => {
    setSelectedAgent(null);
    setShowAgentForm(true);
  };

  const handleEditAgent = (agent: typeof mockAgents[0]) => {
    setSelectedAgent(agent);
    setShowAgentForm(true);
  };

  const handleDeleteAgent = (agent: typeof mockAgents[0]) => {
    setSelectedAgent(agent);
    setShowDeleteConfirmation(true);
  };

  const handleSubmitAgent = (data: AgentFormData) => {
    console.log('Agent data:', data);
    setShowAgentForm(false);
    // TODO: Implement API call
  };

  const handleConfirmDelete = () => {
    if (!selectedAgent) return;
    console.log('Deleting agent:', selectedAgent.id);
    setShowDeleteConfirmation(false);
    setSelectedAgent(null);
    // TODO: Implement API call
  };

  return (
    <div className="animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by agent name or type..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                className="px-3 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke-width%3D%221.5%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22m19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                onClick={handleCreateAgent}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-gray-900 font-medium rounded-lg hover:bg-secondary-dark transition-all transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                <Plus size={20} />
                <span>Create Agent</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-medium text-gray-600">Total Agents</span>
              </div>
              <p className="text-2xl font-bold text-primary">{filteredAgents.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-600">Active Agents</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {filteredAgents.filter(a => a.status === 'active').length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-gray-600">Average Success Rate</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredAgents.length > 0 ? 
                  Math.round(
                    filteredAgents.reduce((acc, curr) => acc + curr.successRate, 0) / 
                    filteredAgents.length
                  ) + '%'
                  : 'N/A'}
              </p>
            </div>
          </div>

          <AgentList
            agents={filteredAgents}
            onEdit={handleEditAgent}
            onDelete={handleDeleteAgent}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <div className="space-y-6">
        <WorkspaceLLMSettings onSave={handleSaveWorkspaceSettings} />
        <PhoneNumberManagement agents={mockAgents} />
      </div>

      {showAgentForm && (
        <AgentConfigurationForm
          onClose={() => setShowAgentForm(false)}
          onSubmit={handleSubmitAgent}
          initialData={selectedAgent ? {
            name: selectedAgent.name,
            type: selectedAgent.type.toLowerCase().replace(' ', '_'),
            status: selectedAgent.status,
          } : undefined}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Delete Agent"
        message={`Are you sure you want to delete <strong>"${selectedAgent?.name}"</strong>? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteConfirmation(false);
          setSelectedAgent(null);
        }}
      />
    </div>
  );
};

export default Agents;