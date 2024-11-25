import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationItem } from './NotificationItem';
import { Bell } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'direct_message' | 'group_message' | 'friend_request';
  content: string;
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  read: boolean;
  groupName?: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onClearAll: () => void;
  onAcceptFriend?: (id: string) => void;
  onRejectFriend?: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onDismiss,
  onClearAll,
  onAcceptFriend,
  onRejectFriend,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full space-y-8 max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 ">
      <div className='rounded-xl shadow-lg overflow-hidden'>
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Bell className="w-6 h-6 text-white" />
              </div>
             
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-sm font-medium bg-white/20 text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-white/80 hover:text-white transition-colors text-sm"
              aria-label="Clear all notifications"
            >
              Clear all
            </button>
          )}
        </div>
      </div>


      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        <AnimatePresence initial={false}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onDismiss={onDismiss}
                onAcceptFriend={onAcceptFriend}
                onRejectFriend={onRejectFriend}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center text-gray-500 dark:text-gray-400"
            >
              <p>No notifications</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
};