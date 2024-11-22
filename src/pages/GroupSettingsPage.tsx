import React from 'react';
import GroupSettings from '../components/chat/group/GroupSettings';
import type { Group } from '../types/chat';


// Mock data
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
  const handleAddMember = () => {
    console.log('Add member clicked');
  };

  const handleLeaveGroup = () => {
    console.log('Leave group clicked');
  };

  return (
    <div className="bg-white dark:bg-black-dark-light">
      <GroupSettings
        group={mockGroup}
        currentUserId="user1"
        onAddMember={handleAddMember}
        onLeaveGroup={handleLeaveGroup}
        isRtl={isRtl || false}
      />
    </div>
  );
}

export default GroupSettingsPage;