import React, { useState } from 'react';
import { Phone, Plus, Edit2, Trash2, CheckCircle2, XCircle, Home, Globe, User } from 'lucide-react';
import PhoneNumberForm, { PhoneNumberFormData } from './PhoneNumberForm';
import ConfirmationModal from './ConfirmationModal';

interface PhoneNumber {
  id: string;
  number: string;
  type: 'local' | 'toll-free';
  status: 'active' | 'inactive';
  assignedAgentId?: string;
  monthlyFee: number;
}

interface Agent {
  id: string;
  name: string;
}

interface PhoneNumberManagementProps {
  agents: Agent[];
}

// Mock data - replace with actual API data
const mockPhoneNumbers: PhoneNumber[] = [
  {
    id: '1',
    number: '+1 (555) 123-4567',
    type: 'local',
    status: 'active',
    assignedAgentId: '1',
    monthlyFee: 10,
  },
  {
    id: '2',
    number: '+1 (800) 555-0123',
    type: 'toll-free',
    status: 'active',
    monthlyFee: 15,
  },
  {
    id: '3',
    number: '+1 (555) 987-6543',
    type: 'local',
    status: 'inactive',
    monthlyFee: 10,
  },
];

const PhoneNumberManagement: React.FC<PhoneNumberManagementProps> = ({ agents }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [numberToDelete, setNumberToDelete] = useState<PhoneNumber | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleEdit = (number: PhoneNumber) => {
    setSelectedNumber(number);
    setShowForm(true);
  };

  const handleDelete = (number: PhoneNumber) => {
    setNumberToDelete(number);
    setShowDeleteConfirmation(true);
  };

  const handleSubmit = (data: PhoneNumberFormData) => {
    console.log('Phone number data:', data);
    setShowForm(false);
    setSelectedNumber(null);
    // TODO: Implement API call
  };

  const confirmDelete = () => {
    if (!numberToDelete) return;
    console.log('Deleting phone number:', numberToDelete.id);
    setShowDeleteConfirmation(false);
    setNumberToDelete(null);
    // TODO: Implement API call
  };

  const getStatusIcon = (status: PhoneNumber['status']) => {
    return status === 'active' ? (
      <CheckCircle2 className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Phone Number Management</h2>
              <p className="text-lg text-gray-600 mt-1">Manage your phone numbers and assignments</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-secondary text-gray-900 font-bold rounded-lg hover:bg-secondary-dark transition-all transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            <Plus size={20} />
            <span>Add Number</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/5">
              <tr>
                <th className="px-4 py-4 text-sm font-bold text-primary uppercase tracking-wider">Number</th>
                <th className="px-4 py-4 text-sm font-bold text-primary uppercase tracking-wider">Status</th>
                <th className="px-4 py-4 text-sm font-bold text-primary uppercase tracking-wider">Assigned Agent</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPhoneNumbers.map((number) => (
                <tr 
                  key={number.id} 
                  className="transition-all hover:bg-gray-50/50"
                  onMouseEnter={() => setHoveredRow(number.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-mono text-base">{number.number}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                      number.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusIcon(number.status)}
                      <span className="capitalize">{number.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {number.assignedAgentId ? (
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-primary/10 rounded">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">
                          {agents.find(a => a.id === number.assignedAgentId)?.name || 'Unknown'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(number)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(number)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <PhoneNumberForm
          onClose={() => {
            setShowForm(false);
            setSelectedNumber(null);
          }}
          onSubmit={handleSubmit}
          initialData={selectedNumber ? {
            number: selectedNumber.number,
            type: selectedNumber.type,
            status: selectedNumber.status,
            assignedAgentId: selectedNumber.assignedAgentId,
          } : undefined}
          agents={agents}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Delete Phone Number"
        message={`Are you sure you want to delete the phone number <strong>"${numberToDelete?.number}"</strong>? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteConfirmation(false);
          setNumberToDelete(null);
        }}
      />
    </div>
  );
};

export default PhoneNumberManagement;