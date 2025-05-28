import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, BookOpen, Users, Phone, Menu, X } from 'lucide-react';
import NavItem from './NavItem';

interface SidebarProps {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Sidebar */}
      <aside 
        className={`bg-primary text-white w-64 shrink-0 fixed lg:static inset-y-0 left-0 transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-20 flex flex-col`}
      >
        <div className="p-6 border-b border-primary-light">
          <img 
            src="/images/weltmann.png" 
            alt="Weltmann Logo" 
            className="h-8 object-contain"
          />
        </div>
        
        <nav className="mt-6 flex-1">
          <ul className="space-y-2 px-4">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              title="Overview" 
              isActive={location.pathname === '/overview'}
              to="/overview"
            />
            <NavItem 
              icon={<BarChart2 size={20} />} 
              title="Analytics"
              isActive={location.pathname === '/analytics'}
              to="/analytics"
            />
            <NavItem 
              icon={<BookOpen size={20} />} 
              title="Knowledge Base"
              isActive={location.pathname === '/knowledge-base'}
              to="/knowledge-base"
            />
            <NavItem 
              icon={<Users size={20} />} 
              title="Agents"
              isActive={location.pathname === '/agents'}
              to="/agents"
            />
            <NavItem 
              icon={<Phone size={20} />} 
              title="Call"
              isActive={location.pathname === '/call'}
              to="/call"
            />
          </ul>
        </nav>
      </aside>
      
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;