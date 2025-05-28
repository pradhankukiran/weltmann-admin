import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, title, isActive, to }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-white text-primary font-medium translate-x-2' 
            : 'text-white hover:bg-primary-light hover:translate-x-1'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{title}</span>
        {isActive && (
          <span className="ml-auto">
            <div className="h-2 w-2 rounded-full bg-secondary"></div>
          </span>
        )}
      </Link>
    </li>
  );
};

export default NavItem;