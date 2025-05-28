import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, LayoutDashboard, BarChart2, BookOpen, Users, Phone } from 'lucide-react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const pageIcons = {
  overview: LayoutDashboard,
  analytics: BarChart2,
  'knowledge-base': BookOpen,
  agents: Users,
  call: Phone,
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname.substring(1);
  const currentPage = path.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  const Icon = pageIcons[path as keyof typeof pageIcons];

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar 
        isMobileOpen={isMobileOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button 
              className="p-2 rounded-md bg-primary text-white shadow-md lg:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              {Icon && <Icon size={28} className="text-primary" />}
              {currentPage}
            </h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;