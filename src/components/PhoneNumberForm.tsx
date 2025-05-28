import React, { useState } from 'react';
import { X, Phone, User, ToggleLeft, Globe } from 'lucide-react';

interface PhoneNumberFormProps {
  onClose: () => void;
  onSubmit: (data: PhoneNumberFormData) => void;
  initialData?: PhoneNumberFormData;
  agents: Array<{ id: string; name: string }>;
}

export interface PhoneNumberFormData {
  number: string;
  type: 'local' | 'toll-free';
  status: 'active' | 'inactive';
  assignedAgentId?: string;
}

const defaultFormData: PhoneNumberFormData = {
  number: '',
  type: 'local',
  status: 'active',
  assignedAgentId: undefined,
};

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  onClose,
  onSubmit,
  initialData,
  agents,
}) => {
  const [formData, setFormData] = useState<PhoneNumberFormData>(
    initialData || defaultFormData
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {initialData ? 'Edit Phone Number' : 'Add Phone Number'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {initialData ? 'Update the phone number details' : 'Configure a new phone number'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-base font-bold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-base font-bold text-gray-700 mb-2">
                  Type
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-500">Select number type</span>
                </div>                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'local' | 'toll-free' })}
                  className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="local">Local</option>
                  <option value="toll-free">Toll-Free</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-base font-bold text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <ToggleLeft className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-500">Set number status</span>
                </div>                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-base font-bold text-gray-700 mb-2">
                  Assigned Agent
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-500">Choose agent to handle calls</span>
                </div>                <select
                  value={formData.assignedAgentId || ''}
                  onChange={(e) => setFormData({ ...formData, assignedAgentId: e.target.value || undefined })}
                  className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">None</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-secondary text-gray-900 font-medium rounded-lg hover:bg-secondary-dark transition-all transform hover:scale-105 shadow-sm hover:shadow-md"
              >
                {initialData ? 'Update Number' : 'Add Number'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberForm;