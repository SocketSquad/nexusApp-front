import React from 'react';
import { useNavigate } from 'react-router-dom';
import GroupSettings from '../components/chat/group/GroupSettings';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Group } from '../types/chat';

const mockGroup: Group = {
  id: '1',
  name: 'Design Team',
  owner: 'user1',
  members: [
    {
      userId: 'user1',
      name: 'Sarah Wilson',
      role: 'admin',
      joinedAt: new Date('2024-01-15'),
      lastRead: new Date(),
      avatar: 'https://source.unsplash.com/100x100/?portrait&1'
    },
    {
      userId: 'user2',
      name: 'Mike Johnson',
      role: 'admin',
      joinedAt: new Date('2024-01-16'),
      lastRead: new Date(),
      avatar: 'https://source.unsplash.com/100x100/?portrait&2'
    },
    {
      userId: 'user3',
      name: 'Emily Brown',
      role: 'member',
      joinedAt: new Date('2024-02-01'),
      lastRead: new Date(),
      avatar: 'https://source.unsplash.com/100x100/?portrait&3'
    },
    {
      userId: 'user4',
      name: 'David Lee',
      role: 'member',
      joinedAt: new Date('2024-02-15'),
      lastRead: new Date(),
      avatar: 'https://source.unsplash.com/100x100/?portrait&4'
    },
    {
      userId: 'user6',
      name: 'Emily Brown',
      role: 'member',
      joinedAt: new Date('2024-02-01'),
      lastRead: new Date(),
      avatar: 'https://source.unsplash.com/100x100/?portrait&3'
    },
    {
      userId: 'user7',
      name: 'David Lee',
      role: 'member',
      joinedAt: new Date('2024-02-15'),
      lastRead: new Date(),
      avatar: 'https://source.unsplash.com/100x100/?portrait&4'
    }
  ],
  privacy: 'private',
  lastActivityAt: new Date(),
  description: 'Official design team group for project collaboration'
};

interface GroupSettingsPageProps {
  isRtl?: boolean;
}

const GroupSettingsPage = ({ isRtl }: GroupSettingsPageProps) => {
  const navigate = useNavigate();
  const handleAddMember = () => {
    console.log('Add member clicked');
  };

  const handleLeaveGroup = () => {
    console.log('Leave group clicked');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-transparent">
      <div className="mx-auto px-4 pt-2">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-slate-700 dark:hover:text-gray-100 transition-colors duration-200 group"
          >
            {isRtl ? (
              <ArrowRight className="w-4 h-4 mr-2 transition-transform text-purple-500 duration-200 group-hover:translate-x-0.5" />
            ) : (
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform text-purple-500 duration-200 group-hover:-translate-x-0.5" />
            )}
            Back to Chat
          </button>
        </div>
        
        <GroupSettings
          group={mockGroup}
          currentUserId="user1"
          onAddMember={handleAddMember}
          onLeaveGroup={handleLeaveGroup}
          isRtl={isRtl || false}
        />
      </div>
    </div>
  );
}

export default GroupSettingsPage;