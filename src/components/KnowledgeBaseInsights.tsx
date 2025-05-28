import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FileText, AlertCircle, Clock, Users } from 'lucide-react';

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

interface KnowledgeBaseInsightsProps {
  documents: Document[];
}

const COLORS = ['#245878', '#3a6f90', '#1a4260', '#ffd400'];

const KnowledgeBaseInsights: React.FC<KnowledgeBaseInsightsProps> = ({ documents }) => {
  // Calculate document type distribution
  const typeDistribution = documents.reduce((acc, doc) => {
    acc[doc.type] = (acc[doc.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(typeDistribution).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count
  }));

  // Calculate indexing status distribution
  const statusDistribution = documents.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusDistribution).map(([status, count]) => ({
    name: status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: count
  }));

  // Get recently updated documents
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Calculate documents without agents
  const unlinkedDocuments = documents.filter(doc => doc.dependentAgents.length === 0);

  // Calculate health metrics
  const totalDocuments = documents.length;
  const indexedDocuments = documents.filter(doc => doc.status === 'indexed').length;
  const indexingErrors = documents.filter(doc => doc.status === 'error').length;
  const unlinkedCount = unlinkedDocuments.length;

  const indexedPercentage = totalDocuments > 0 ? Math.round((indexedDocuments / totalDocuments) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Knowledge Base Insights</h2>

      {/* Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-medium text-gray-600">Total Documents</span>
          </div>
          <p className="text-2xl font-bold text-primary">{totalDocuments}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-600">Indexed</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {indexedPercentage}%
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="font-medium text-gray-600">Indexing Errors</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{indexingErrors}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-gray-600">Unlinked</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{unlinkedCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Document Type Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx={150}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Indexing Status</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#245878" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recently Updated Documents</h3>
        <div className="space-y-2">
          {recentDocuments.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{doc.name}</span>
              </div>
              <span className="text-sm text-gray-500">{doc.updatedAt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Unlinked Documents */}
      {unlinkedDocuments.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Documents Not Linked to Agents</h3>
          <div className="space-y-2">
            {unlinkedDocuments.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium">{doc.name}</span>
                </div>
                <span className="text-sm text-yellow-600">No linked agents</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBaseInsights;