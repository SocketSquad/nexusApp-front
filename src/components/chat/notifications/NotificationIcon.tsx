import React from 'react';
import { MessageSquare, Users, UserPlus } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface NotificationIconProps {
  type: 'direct_message' | 'group_message' | 'friend_request';
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
  const iconClass = cn(
    "absolute -bottom-1 -right-1 w-5 h-5 rounded-full p-1",
    "ring-2 ring-white dark:ring-gray-800",
    {
      'bg-blue-500 text-white': type === 'direct_message',
      'bg-green-500 text-white': type === 'group_message',
      'bg-purple-500 text-white': type === 'friend_request',
    }
  );

  const icons = {
    direct_message: MessageSquare,
    group_message: Users,
    friend_request: UserPlus,
  };

  const Icon = icons[type];

  return (
    <div className={iconClass}>
      <Icon className="w-full h-full" />
    </div>
  );
};