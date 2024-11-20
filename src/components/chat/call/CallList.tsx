import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Video, Clock } from 'lucide-react';

interface Call {
  id: string;
  type: 'incoming' | 'outgoing' | 'missed';
  mode: 'audio' | 'video';
  contact: {
    name: string;
    avatar: string;
  };
  timestamp: Date;
  duration?: string; 
}

interface CallsListProps {
  calls: Call[];
  onCallBack: (contactId: string) => void;
  onDeleteCall: (callId: string) => void;
}

const CallsList: React.FC<CallsListProps> = ({
  calls,
  onCallBack,
  onDeleteCall,
}) => {
  const getCallIcon = (type: string, mode: string) => {
    const className = "w-4 h-4";
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className={`${className} text-green-500`} />;
      case 'outgoing':
        return <PhoneOutgoing className={`${className} text-blue-500`} />;
      case 'missed':
        return <PhoneMissed className={`${className} text-red-500`} />;
      default:
        return mode === 'video' ? 
          <Video className={className} /> : 
          <Phone className={className} />;
    }
  };

  return (
    <div className="w-full space-y-8 max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900">
      <div className="rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Phone size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Recent Calls</h2>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {calls.map((call) => (
            <motion.div
              key={call.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="relative">
                <img
                  src={call.contact.avatar}
                  alt={call.contact.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                />
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-gray-800">
                  {call.mode === 'video' ? 
                    <Video className="w-4 h-4 text-gray-600 dark:text-gray-300" /> : 
                    <Phone className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  }
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {call.contact.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getCallIcon(call.type, call.mode)}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {call.duration ? (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {call.duration}
                          </span>
                        ) : 'Missed Call'}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDistanceToNow(call.timestamp, { addSuffix: true })}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onCallBack(call.contact.name)}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition-colors"
                  >
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      Call Back
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDeleteCall(call.id)}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallsList;