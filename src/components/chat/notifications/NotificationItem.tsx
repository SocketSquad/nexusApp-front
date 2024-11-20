import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Check, X } from 'lucide-react';
import { type Notification } from './NotificationList';
import { NotificationIcon } from './NotificationIcon';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onAcceptFriend?: (id: string) => void;
  onRejectFriend?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDismiss,
  onAcceptFriend,
  onRejectFriend,
}) => {
  const timeAgo = formatDistanceToNow(notification.timestamp, { addSuffix: true });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-4 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      role="listitem"
      aria-label={`Notification from ${notification.sender.name}`}
    >
      <div className="relative">
        <img
          src={notification.sender.avatar}
          alt={notification.sender.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
        />
        <NotificationIcon type={notification.type} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              <span className="font-semibold">{notification.sender.name}</span>{' '}
              {notification.content}
            </p>
            {notification.groupName && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                in {notification.groupName}
              </p>
            )}
          </div>
          <span
            className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap"
            title={notification.timestamp.toLocaleString()}
          >
            {timeAgo}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          {notification.type === 'friend_request' && onAcceptFriend && onRejectFriend ? (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAcceptFriend(notification.id)}
                className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition-colors"
                aria-label="Accept friend request"
              >
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Accept
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onRejectFriend(notification.id)}
                className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                aria-label="Reject friend request"
              >
                <span className="flex items-center gap-1">
                  <X className="w-3 h-3" />
                  Decline
                </span>
              </motion.button>
            </div>
          ) : (
            !notification.read && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onMarkAsRead(notification.id)}
                className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                aria-label="Mark as read"
              >
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Mark as read
                </span>
              </motion.button>
            )
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDismiss(notification.id)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};