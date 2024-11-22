import React, { useEffect, useState } from 'react';
import GroupSettings from '../components/chat/group/GroupSettings';
import type { Group } from '../types/chat';
import { groupService } from '../services/groupService';
import { useParams} from 'react-router-dom';


interface GroupSettingsPageProps {
  isRtl?: boolean;
}

const GroupSettingsPage = ({ isRtl }: GroupSettingsPageProps) => {

  const [group, setGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  const { groupId } = useParams(); // Replace with dynamic ID if needed (e.g., from URL params)

  console.log("groupId",groupId)
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        setIsLoading(true);
        const fetchedGroup = await groupService.getGroupById(groupId);
        setGroup(fetchedGroup);
        console.log('fetchedGroup',fetchedGroup);
      } catch (err) {
        console.error('Error fetching group details:', err);
        setError('Failed to load group details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);


  const handleAddMember = () => {
    console.log('Add member clicked');
  };

  const handleLeaveGroup = async () => {
    await groupService.removeMember(groupId,'673ce6a5182f2c76a8954465');
  };

  if (isLoading) {
    return <div>Loading group details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white dark:bg-black-dark-light">
      <GroupSettings
        group={group}
        currentUserId="673ce6a5182f2c76a8954465"
        onAddMember={handleAddMember}
        onLeaveGroup={handleLeaveGroup}
        isRtl={isRtl || false}
      />
    </div>
  );
}

export default GroupSettingsPage;