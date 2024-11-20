import React from 'react';
import { motion } from 'framer-motion';
import IconMessagesDot from '../../Icon/IconMessagesDot';
import IconPhone from '../../Icon/IconPhone';
import IconUserPlus from '../../Icon/IconUserPlus';
import IconBell from '../../Icon/IconBell';
import IconUsers from '../../Icon/IconUsers';

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab = 'Chats',
  onTabChange
}) => {
  const navigationItems = [
    { icon: IconMessagesDot, label: 'Chats' },
    { icon: IconUsers, label: 'Groups' },
    { icon: IconPhone, label: 'Calls' },
    { icon: IconUserPlus, label: 'Contacts' },
    { icon: IconBell, label: 'Notifications' },
  ];

  return (
    <div className="flex justify-between items-center text-xs px-4 py-1">
      {navigationItems.map(({ icon: Icon, label }) => (
        <motion.button
          key={label}
          type="button"
          className={`flex flex-col items-center ${
            activeTab === label ? 'text-blue-500' : 'text-gray-600'
          } hover:text-blue-500 transition-colors`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => onTabChange(label)}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default Navigation;