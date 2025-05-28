import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Search, Plus, Upload, Link, FileText, RefreshCw, ChevronDown, ChevronUp, Eye, Edit, Trash2, Play } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import DocumentForm, { DocumentFormData } from '../components/DocumentForm';
import KnowledgeBaseInsights from '../components/KnowledgeBaseInsights';

interface Document {
  id: string;
  name: string;
  type: 'file' | 'url' | 'text';
  source: string;
  status: 'indexed' | 'not_indexed' | 'error';
  createdAt: string;
  updatedAt: string;
  size?: string;
  dependentAgents: string[];
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Product Manual 2024.pdf',
    source: 'Product Manual 2024.pdf',
    type: 'file',
    status: 'indexed',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    size: '2.4 MB',
    dependentAgents: ['Customer Service Agent', 'Technical Support']
  },
  {
    id: '2',
    name: 'Customer Support Guidelines',
    source: 'Pasted Text',
    type: 'text',
    status: 'not_indexed',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-14',
    size: '4.2 KB',
    dependentAgents: ['Customer Service Agent']
  },
  {
    id: '3',
    name: 'https://docs.example.com/api',
    source: 'https://docs.example.com/api',
    type: 'url',
    status: 'error',
    createdAt: '2024-03-13',
    updatedAt: '2024-03-13',
    size: '12.8 KB',
    dependentAgents: ['Technical Support', 'Sales Assistant']
  }
];

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'indexed' | 'not_indexed' | 'error'>('all');
  const [isIndexing, setIsIndexing] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node) && expandedRows.size > 0) {
        setExpandedRows(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedRows]);

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleIndexAll = () => {
    setIsIndexing(true);
    // Simulate indexing process
    setTimeout(() => setIsIndexing(false), 2000);
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'indexed':
        return 'bg-green-100 text-green-800';
      case 'not_indexed':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'file':
        return <Upload size={16} className="text-gray-400" />;
      case 'url':
        return <Link size={16} className="text-gray-400" />;
      case 'text':
        return <FileText size={16} className="text-gray-400" />;
    }
  };

  const handleViewEdit = (doc: Document) => {
    setSelectedDocument(doc);
    // TODO: Implement view/edit modal
  };

  const handleViewContent = (doc: Document) => {
    setSelectedDocument(doc);
    // TODO: Implement content view modal
  };

  const handleDelete = (doc: Document) => {
    setDocumentToDelete(doc);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (!documentToDelete) return;
    // TODO: Implement delete API call
    console.log('Deleting document:', documentToDelete.id);
    setShowDeleteConfirmation(false);
    setDocumentToDelete(null);
  };

  const handleIndexDocument = (doc: Document) => {
    // TODO: Implement index API call
    console.log('Indexing document:', doc.id);
  };

  const handleCreateDocument = () => {
    setSelectedDocument(null);
    setShowDocumentForm(true);
  };

  const handleSubmitDocument = (data: DocumentFormData) => {
    console.log('Document data:', data);
    setShowDocumentForm(false);
    // TODO: Implement actual document creation/update logic here
  };

  return (
    <div className="animate-fadeIn">
      <KnowledgeBaseInsights documents={mockDocuments} />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="px-3 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke-width%3D%221.5%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22m19.5%208.25l-7.5%207.5-7.5-7.5%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_8px_center] bg-no-repeat"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              >
                <option value="all">All Status</option>
                <option value="indexed">Indexed</option>
                <option value="not_indexed">Not Indexed</option>
                <option value="error">Error</option>
              </select>
              <button
                onClick={handleIndexAll}
                disabled={isIndexing}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={20} className={isIndexing ? 'animate-spin' : ''} />
                <span>Index All</span>
              </button>
              <button
                onClick={handleCreateDocument}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-gray-900 font-medium rounded-lg hover:bg-secondary-dark transition-colors"
              >
                <Plus size={20} />
                <span>Add Document</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto" ref={tableRef}>
            <table className="w-full">
              <thead className="bg-primary/5">
                <tr className="text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-primary uppercase tracking-wider">Document</th>
                  <th className="px-4 py-3 text-xs font-semibold text-primary uppercase tracking-wider">RAG Index Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-primary uppercase tracking-wider">Dependent Agents</th>
                  <th className="w-8 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {filteredDocuments.map((doc) => (
                  <React.Fragment key={doc.id}>
                  <tr className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-medium">{doc.name}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(doc.status)}`}>
                        {doc.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {doc.dependentAgents.map((agent, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary shadow-sm"
                          >
                            {agent}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleRow(doc.id)}
                        className="p-1 hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        {expandedRows.has(doc.id) ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedRows.has(doc.id) && (
                    <tr key={`${doc.id}-expanded`} className="bg-gray-50/50">
                      <td colSpan={4} className="px-4 py-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-gray-500">Source:</span>
                              <p className="mt-1">{doc.source}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Type:</span>
                              <p className="mt-1 flex items-center gap-2">
                                {getTypeIcon(doc.type)}
                                <span className="capitalize">{doc.type}</span>
                              </p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Size:</span>
                              <p className="mt-1">{doc.size || '-'}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                              <p className="mt-1">{doc.updatedAt}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => handleViewEdit(doc)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary/5 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Edit size={16} />
                              View/Edit
                            </button>
                            <button
                              onClick={() => handleViewContent(doc)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary/5 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Eye size={16} />
                              View Content
                            </button>
                            {doc.status !== 'indexed' && (
                              <button
                                onClick={() => handleIndexDocument(doc)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary/5 rounded-lg flex items-center gap-2 transition-colors"
                              >
                                <Play size={16} />
                                Index Document
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(doc)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Trash2 size={16} />
                              Delete
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
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Delete Document"
        message={`Are you sure you want to delete <strong>"${documentToDelete?.name}"</strong>? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteConfirmation(false);
          setDocumentToDelete(null);
        }}
      />
      {showDocumentForm && (
        <DocumentForm
          onClose={() => setShowDocumentForm(false)}
          onSubmit={handleSubmitDocument}
          initialData={selectedDocument ? {
            name: selectedDocument.name,
            type: selectedDocument.type,
            content: selectedDocument.source,
          } : undefined}
        />
      )}
    </div>
  );
};

export default KnowledgeBase