import React from 'react';
import { PhoneCall, Clock, CheckCircle2, Database, MessageSquare, Circle, User, Phone } from 'lucide-react';
import StatusIndicator from '../components/StatusIndicator';
import AlertItem from '../components/AlertItem';

const systems = [
  {
    name: 'AI Agent Health',
    status: 'operational' as const,
    icon: <User className="w-5 h-5" />
  },
  {
    name: 'Phone Integration',
    status: 'down' as const,
    icon: <Phone className="w-5 h-5" />
  },
  {
    name: 'Shopware Connection',
    status: 'operational' as const,
    icon: <Database className="w-5 h-5" />
  }
];

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-lg font-semibold text-gray-600 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className={`text-base font-bold mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs last week
          </p>
        )}
      </div>
      <div className="text-primary p-2 bg-primary-light/10 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

const Overview: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">System Status</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => (
            <StatusIndicator
              key={system.name}
              name={system.name}
              status={system.status}
              icon={system.icon}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Key Performance Indicators</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <KPICard
            title="Active Calls"
            value={12}
            icon={<Circle className="w-3 h-3 text-red-500 animate-pulse" fill="currentColor" />}
            trend={{ value: 8, isPositive: true }}
          />
          <div className="space-y-4">
            <KPICard
              title="Total Calls Today"
              value={147}
              icon={<PhoneCall className="w-6 h-6" />}
            />
            <div className="flex gap-4">
              <div className="flex-1 text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-base font-semibold text-gray-600">Week</p>
                <p className="text-xl font-bold">1,028</p>
              </div>
              <div className="flex-1 text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-base font-semibold text-gray-600">Month</p>
                <p className="text-xl font-bold">4,291</p>
              </div>
            </div>
          </div>
          <KPICard
            title="Average Call Duration"
            value="3m 24s"
            icon={<Clock className="w-6 h-6" />}
            trend={{ value: 12, isPositive: false }}
          />
          <KPICard
            title="Successful Interaction Rate"
            value="94.2%"
            icon={<CheckCircle2 className="w-6 h-6" />}
            trend={{ value: 2.1, isPositive: true }}
          />
          <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm lg:col-span-2">
            <div className="flex items-start justify-between mb-3">
              <p className="text-lg font-semibold text-gray-600">Most Frequent Queries</p>
              <div className="text-primary p-2 bg-primary-light/10 rounded-lg">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-base font-medium">Order Status</span>
                <span className="text-sm font-semibold bg-primary-light/10 text-primary px-2 py-1 rounded">32%</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-base font-medium">Product Availability</span>
                <span className="text-sm font-semibold bg-primary-light/10 text-primary px-2 py-1 rounded">28%</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-base font-medium">Return Process</span>
                <span className="text-sm font-semibold bg-primary-light/10 text-primary px-2 py-1 rounded">15%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        <div className="space-y-3">
          <AlertItem
            message="High CPU usage detected on AI Agent Health"
            timestamp="5 minutes ago"
          />
          <AlertItem
            message="Phone Integration is experiencing latency"
            timestamp="12 minutes ago"
          />
          <AlertItem
            message="Shopware Connection: Data synchronization failed"
            timestamp="30 minutes ago"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;