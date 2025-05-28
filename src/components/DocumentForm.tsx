import React, { useState, useEffect } from 'react';
import { X, Upload, Link, FileText, File, AlertCircle } from 'lucide-react';

interface FileUploadState {
  file: File | null;
  preview: string | null;
  error: string | null;
}

interface DocumentFormProps {
  onClose: () => void;
  onSubmit: (data: DocumentFormData) => void;
  initialData?: DocumentFormData;
}

export interface DocumentFormData {
  name: string;
  type: 'file' | 'url' | 'text';
  content: string | File;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [activeTab, setActiveTab] = useState<'file' | 'url' | 'text'>(initialData?.type || 'file');
  const [fileState, setFileState] = useState<FileUploadState>({
    file: null,
    preview: null,
    error: null
  });
  const [urlError, setUrlError] = useState<string | null>(null);
  const [formData, setFormData] = useState<DocumentFormData>({
    name: '',
    type: 'file',
    content: '',
    ...initialData,
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.';
    }
    
    if (file.size > maxSize) {
      return 'File size exceeds 10MB limit.';
    }
    
    return null;
  };

  const handleFile = (file: File) => {
    const error = validateFile(file);
    
    if (error) {
      setFileState({ file: null, preview: null, error });
      return;
    }

    setFileState({
      file,
      preview: URL.createObjectURL(file),
      error: null
    });

    setFormData({
      ...formData,
      type: 'file',
      name: formData.name || file.name,
      content: file,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setUrlError(validateUrl(url) ? null : 'Please enter a valid URL');
    setFormData({
      ...formData,
      type: 'url',
      content: url,
      name: formData.name || url,
    });
  };

  useEffect(() => {
    return () => {
      if (fileState.preview) {
        URL.revokeObjectURL(fileState.preview);
      }
    };
  }, [fileState.preview]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="h-full overflow-y-auto scrollbar-hide animate-fadeIn">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6">
          <div className="flex justify-center space-x-2 mb-8">
            <button
              onClick={() => setActiveTab('file')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
                activeTab === 'file'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Upload size={20} />
              Upload File
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
                activeTab === 'url'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Link size={20} />
              From URL
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
                activeTab === 'text'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText size={20} />
              From Text
            </button>
          </div>

          <form onSubmit={handleSubmit}  >
            {activeTab === 'file' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : fileState.file
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  {fileState.file ? (
                    <div className="flex flex-col items-center gap-4">
                      <File size={48} className="text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">{fileState.file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(fileState.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFileState({ file: null, preview: null, error: null })}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex flex-col items-center gap-4"
                    >
                      <Upload size={48} className="text-gray-400" />
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PDF, DOC, DOCX, TXT up to 10MB
                        </p>
                      </div>
                    </label>
                  )}
                </div>
                {fileState.error && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">{fileState.error}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'url' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={formData.content as string}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/document"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      urlError
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-primary/20'
                    }`}
                    required
                  />
                </div>
                {urlError && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">{urlError}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content as string}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: 'text',
                      content: e.target.value,
                    })
                  }
                  placeholder="Paste or type your content here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[210px] resize-none font-mono text-sm"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter document name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all hover:shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-secondary text-gray-900 font-medium rounded-lg hover:bg-secondary-dark transition-all hover:shadow-md transform hover:scale-105"
              >
                {initialData ? 'Update Document' : 'Add Document'}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;