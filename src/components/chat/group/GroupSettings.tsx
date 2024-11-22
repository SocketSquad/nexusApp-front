import {Crown, Shield, Search } from 'lucide-react';
import type { Group } from '../../../types/chat';
import Modal from '../../Modal';
import AddMemberForm from './AddMemberForm';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../../Dropdown';
import IconHorizontalDots from '../../../components/Icon/IconHorizontalDots';
import IconUserPlus from '../../Icon/IconUserPlus';
import IconLogout from '../../Icon/IconLogout';

interface GroupSettingsProps {
  group: Group;
  currentUserId: string;
  onAddMember: () => void;
  onLeaveGroup: () => void;
  isRtl: boolean;
}

export default function GroupSettings({ group, currentUserId, onAddMember, onLeaveGroup, isRtl }: GroupSettingsProps) {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isCurrentUserAdmin = group.members.some(
    (member) => member.userId === currentUserId && member.role === 'admin'
  );

  const sortedMembers = [...group.members].sort((a, b) => {
    // Sort admins first
    if (a.role === 'admin' && b.role !== 'admin') return -1;
    if (a.role !== 'admin' && b.role === 'admin') return 1;
    // Then sort by name
    return a.name.localeCompare(b.name);
  });

  const filteredMembers = sortedMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMemberSubmit = (data: { email: string; role: 'admin' | 'member' }) => {
    onAddMember();
    setIsAddMemberModalOpen(false);
    // You would typically handle the form data here and make an API call
    console.log('Adding member:', data);
  };

  return (
    <>
      <div className="max-w-2xl h-full mx-auto p-8 bg-white dark:bg-black-dark-light rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Group Settings
            </h1>
            <div className="dropdown">
                <Dropdown
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="bg-[#f4f4f4] dark:bg-slate-800 hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center"
                    button={<IconHorizontalDots className="hover:text-primary rotate-90 opacity-70" />}
                >
                    <ul className="text-black w-[10rem] dark:text-white-dark">
                        <li>
                        {isCurrentUserAdmin && (
                            <button type="button" onClick={() => setIsAddMemberModalOpen(true)}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                Add Member
                            </button>
                        )}
                        </li>
                        <li>
                            <button type="button" onClick={onLeaveGroup}>
                                <IconLogout className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                Exit Group
                            </button>
                        </li>
                    </ul>
                </Dropdown>
            </div>
          </div>

          {/* Members List with search */}
          <div className="space-y-6 ">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  Members <span className="px-2.5 py-1 bg-gradient-to-r from-primary to-purple-500 dark:bg-slate-800 rounded-full text-sm text-white">
                    {group.members.length}
                  </span>
                </h2>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 text-slate-600 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>
            </div>

            <div className="relative h-[calc(100vh-400px)] min-h-[300px]">
              <PerfectScrollbar className="absolute inset-0 pr-4">
                <div className="space-y-3">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <div
                        key={member.userId}
                        className="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-md transition-all duration-200 border border-slate-100 dark:border-slate-800"
                      >
                        <div className="relative">
                          <img
                            src={member.avatar || `https://source.unsplash.com/100x100/?portrait&${member.userId}`}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
                          />
                          {member.userId === group.owner && (
                            <Crown className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1 drop-shadow-sm" />
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-slate-900 dark:text-white">{member.name}</span>
                            {member.role === 'admin' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                <Shield className="w-3.5 h-3.5" />
                                Admin
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                            Joined {new Date(member.joinedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-slate-500 dark:text-slate-400">No members found matching your search.</p>
                    </div>
                  )}
                </div>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAddMemberModalOpen}
        onClose={() => setIsAddMemberModalOpen(false)}
        title="Add New Member">
        <AddMemberForm
          onSubmit={handleAddMemberSubmit}
          onClose={() => setIsAddMemberModalOpen(false)}/>
      </Modal>
    </>
  );
}