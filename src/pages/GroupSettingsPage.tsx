import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupSettings from '../components/chat/group/GroupSettings';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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