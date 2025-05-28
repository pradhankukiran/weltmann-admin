import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Download, Users, Clock, CheckCircle2, AlertTriangle, ShoppingBag, MessageSquare, Heart } from 'lucide-react';
import ReportFilter from '../components/ReportFilter';
import ExportButton from '../components/ExportButton';

// Mock data - replace with actual data from your backend
const agentPerformanceData = [
  { name: 'Agent 1', calls: 120, avgHandleTime: 180, resolutionRate: 92 },
  { name: 'Agent 2', calls: 95, avgHandleTime: 210, resolutionRate: 88 },
  { name: 'Agent 3', calls: 150, avgHandleTime: 160, resolutionRate: 95 },
];

const intentData = [
  { name: 'Order Status', value: 35 },
  { name: 'Product Info', value: 25 },
  { name: 'Returns', value: 20 },
  { name: 'Shipping', value: 15 },
  { name: 'Other', value: 5 },
];

const shopwareData = [
  { name: 'Product Details', count: 450 },
  { name: 'Order Status', count: 380 },
  { name: 'Inventory', count: 220 },
  { name: 'Customer Info', count: 180 },
];

const escalationData = [
  { name: 'Technical Issue', count: 45 },
  { name: 'Complex Query', count: 35 },
  { name: 'Policy Exception', count: 20 },
];

const satisfactionData = [
  { date: '2024-03-01', csat: 4.5, nps: 65, responses: 120 },
  { date: '2024-03-02', csat: 4.3, nps: 62, responses: 95 },
  { date: '2024-03-03', csat: 4.7, nps: 70, responses: 150 },
  { date: '2024-03-04', csat: 4.6, nps: 68, responses: 110 },
  { date: '2024-03-05', csat: 4.8, nps: 72, responses: 130 },
  { date: '2024-03-06', csat: 4.4, nps: 64, responses: 140 },
  { date: '2024-03-07', csat: 4.6, nps: 67, responses: 125 },
];

const satisfactionBreakdown = [
  { level: 'Very Satisfied', percentage: 45 },
  { level: 'Satisfied', percentage: 35 },
  { level: 'Neutral', percentage: 12 },
  { level: 'Dissatisfied', percentage: 5 },
  { level: 'Very Dissatisfied', percentage: 3 },
];

const COLORS = ['#245878', '#3a6f90', '#1a4260', '#ffd400', '#ffdc33'];

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedAgent, setSelectedAgent] = useState('all');

  const handleExport = (format: 'csv' | 'excel') => {
    // Implement export logic here
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Detailed Reports</h2>
        <div className="flex gap-3">
          <ExportButton onExport={() => handleExport('csv')} format="csv" />
          <ExportButton onExport={() => handleExport('excel')} format="excel" />
        </div>
      </div>

      <ReportFilter
        onDateChange={setDateRange}
        onAgentChange={setSelectedAgent}
        showAgentFilter
        showIntentFilter
      />

      {/* Agent Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Agent Performance</h3>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calls" fill="#245878" name="Total Calls" />
              <Bar dataKey="resolutionRate" fill="#ffd400" name="Resolution Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Intent Analysis */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Intent Analysis</h3>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={intentData}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {intentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Shopware Data Usage */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Shopware Data Usage</h3>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shopwareData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#245878" name="Access Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Call Escalation Reports */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Call Escalation Reports</h3>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={escalationData}
                cx={200}
                cy={200}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
                label
              >
                {escalationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Customer Satisfaction Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Customer Satisfaction Metrics</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="csat"
                  stroke="#245878"
                  name="CSAT Score"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="nps"
                  stroke="#ffd400"
                  name="NPS Score"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionBreakdown}
                  cx={200}
                  cy={200}
                  innerRadius={60}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="percentage"
                  label
                >
                  {satisfactionBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;