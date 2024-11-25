import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, X, Check, Users, Bell } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
  status?: 'pending' | 'suggestion';
}

interface ContactListProps {
  friendRequests: Contact[];
  suggestions: Contact[];
  onAcceptRequest: (contactId: string) => void;
  onRejectRequest: (contactId: string) => void;
  onAddFriend: (contactId: string) => void;
  onIgnoreSuggestion: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  friendRequests,
  suggestions,
  onAcceptRequest,
  onRejectRequest,
  onAddFriend,
  onIgnoreSuggestion,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-3xl mx-auto p-4"
    >
      {/* Friend Requests Section */}
      {friendRequests.length > 0 && (
        <motion.div
          variants={containerVariants}
          className="rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Friend Requests</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4 text-white/80" />
                  <p className="text-sm text-white/80">{friendRequests.length} pending</p>
                </div>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {friendRequests.map((contact, index) => (
              <motion.div
                key={contact.id}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={`/assets/images/${contact.avatar}`}
                      alt={contact.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-gray-800 rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                    {contact.mutualFriends && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        <Users className="w-4 h-4" />
                        <span>{contact.mutualFriends} mutual friends</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAcceptRequest(contact.id)}
                    className="p-2 rounded-lg text-white shadow-lg transition-all duration-200 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:shadow-inner"
                    title="Accept Request"
                  >
                    <Check className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onRejectRequest(contact.id)}
                    className="p-2 rounded-lg shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:shadow-inner"
                    title="Reject Request"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <motion.div
          variants={containerVariants}
          className="rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-violet-600 dark:to-fuchsia-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">People You May Know</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {suggestions.map((contact, index) => (
              <motion.div
                key={contact.id}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={`/assets/images/${contact.avatar}`}
                      alt={contact.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-gray-800 rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                    {contact.mutualFriends && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        <Users className="w-4 h-4" />
                        <span>{contact.mutualFriends} mutual friends</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddFriend(contact.id)}
                    className="p-2 rounded-lg text-white shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 active:shadow-inner"
                    title="Add Friend"
                  >
                    <UserPlus className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onIgnoreSuggestion(contact.id)}
                    className="p-2 rounded-lg shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 active:shadow-inner"
                    title="Ignore"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContactList;