import { useState } from 'react';
import Dropdown from '../../Dropdown';
import IconPhoneCall from '../../Icon/IconPhoneCall';
import IconShare from '../../Icon/IconShare';
import IconTrashLines from '../../Icon/IconTrashLines';
import IconVideo from '../../Icon/IconVideo';
import IconHorizontalDots from '../../Icon/IconHorizontalDots';
import IconSettings from '../../Icon/IconSettings';
import IconEdit from '../../Icon/IconEdit';
import UpdateGroupModal from './UpdateGroupModal';

interface GroupData {
    id: string;
    name: string;
    description: string;
    privacy: 'public' | 'private';
    // avatar?: string;
}

interface IGroupChatActionsProps {
    isRtl: boolean;
    currentGroup?: GroupData;
    onUpdateGroup?: (groupId: string, data: FormData) => Promise<void>;
    onDeleteGroup:(groupId: string) => Promise<void>,
}



const GroupChatActions = ({ 
    isRtl, 
    currentGroup,
    onUpdateGroup,
    onDeleteGroup
}: IGroupChatActionsProps) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    
    return (
        <>
            <div className="flex sm:gap-5 gap-3">
                <button type="button">
                    <IconPhoneCall className="hover:text-primary" />
                </button>

                <button type="button">
                    <IconVideo className="w-5 h-5 hover:text-primary" />
                </button>
                <div className="dropdown">
                    <Dropdown
                        placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                        btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center"
                        button={<IconHorizontalDots className="hover:text-primary rotate-90 opacity-70" />}
                    >
                        <ul className="text-black dark:text-white-dark">
                            <li>
                                <button type="button"
                                 onClick={() => currentGroup && onDeleteGroup && onDeleteGroup(currentGroup.id)}
                                >                                  
                                    <IconTrashLines className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Delete
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <IconShare className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Share
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <IconSettings className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Settings
                                </button>
                            </li>
                            <li>
                                <button 
                                    type="button"
                                    onClick={() => setIsUpdateModalOpen(true)}
                                >
                                    <IconEdit className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                    Edit
                                </button>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
            </div>

            {currentGroup && onUpdateGroup && (
                <UpdateGroupModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    group={currentGroup}
                    onUpdate={onUpdateGroup}
                />
            )}
        </>
    );
};

export default GroupChatActions;