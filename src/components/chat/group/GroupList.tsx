import { Lock, Globe, UserPlus, Plus } from 'lucide-react';
import { useState } from 'react';
import CreateGroupModal from './CreateGroupModal';

interface GroupMember {
  id: string;
  name: string;
}

interface GroupLastMessage {
  content: string;
  sentAt: Date;
}

interface Group {
  id: string;
  name: string;
  description?: string;
  owner: string;
  members: GroupMember[];
  privacy: 'public' | 'private';
  lastActivityAt: Date;
  lastMessage?: GroupLastMessage;
  avatar?: string;
}

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (group: Group) => void;
  onInviteToGroup?: (group: Group) => void;
  selectedGroupId?: string;
}

const GroupList = ({ groups, onSelectGroup, onInviteToGroup, selectedGroupId }: GroupListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='space-y-2'>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-2 flex items-center justify-center gap-2 p-2 
          bg-primary/10 hover:bg-primary/20 text-primary 
          rounded-md transition-colors duration-200"
      >
        <Plus className="w-5 h-5" />
        <span>Create New Group</span>
      </button>
      <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
      <div className="space-y-2">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => onSelectGroup(group)}
            className={`
            w-full flex items-center p-2 
            hover:bg-gray-100 dark:hover:bg-[#050b14] 
            rounded-md cursor-pointer
            ${selectedGroupId === group.id
                ? 'bg-gray-100 dark:bg-[#050b14] text-primary dark:text-primary'
                : 'hover:text-primary dark:hover:text-primary'
              }
            transition-all duration-300
          `}
          >
            {/* Group Avatar with Privacy Indicator */}
            <div className="flex-shrink-0 relative">
              <img
                src={group.avatar || '/assets/images/default-group.png'}
                className="rounded-full h-12 w-12 object-cover"
                alt={group.name}
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
                            ${group.privacy === 'private' ? 'bg-purple-500' : 'bg-green-500'}`}
              >
                {group.privacy === 'private' ?
                  <Lock className="w-3 h-3 text-white" /> :
                  <Globe className="w-3 h-3 text-white" />
                }
              </div>
            </div>

            {/* Group Info */}
            <div className="mx-3 flex-1 text-left">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{group.name}</p>
                  <p className="text-xs font-medium text-gray-500 truncate">
                    {`${group.members.length} members`}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">

                  {/* Invite Button for Private Groups */}
                  {group.privacy === 'private' && onInviteToGroup && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onInviteToGroup(group);
                      }}
                      className="p-1.5 rounded-full bg-primary bg-opacity-20"
                    >
                      <UserPlus className="w-4 h-4 text-primary" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default GroupList;