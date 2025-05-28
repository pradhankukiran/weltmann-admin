import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6 bg-primary text-white rounded-t-xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-primary-dark rounded-lg transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-secondary text-gray-900 font-medium rounded-lg hover:bg-secondary-dark transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;