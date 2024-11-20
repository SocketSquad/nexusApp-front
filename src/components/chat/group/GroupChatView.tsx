import React from 'react';
import IconMenu from '../../Icon/IconMenu';
import IconLock from '../../Icon/IconLock';
import IconGlobe from '../../Icon/IconGlobe';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MessageInput from '../MessageInput';
import { Group, Message, GroupMember } from '../../../types/chat';
import ChatActions from '../ChatActions';
import IconMoodSmile from '../../Icon/IconMoodSmile';

interface GroupChatViewProps {
    selectedGroup: Group;
    loginUser: any;
    isRtl: boolean;
    textMessage: string;
    setTextMessage: (message: string) => void;
    sendMessage: () => void;
    sendMessageHandle: (e: any) => void;
    setIsShowChatMenu: (show: boolean) => void;
    isShowChatMenu: boolean;
}

const GroupChatView: React.FC<GroupChatViewProps> = ({
    selectedGroup,
    loginUser,
    isRtl,
    textMessage,
    setTextMessage,
    sendMessage,
    sendMessageHandle,
    setIsShowChatMenu,
    isShowChatMenu
}) => {
    // Fonction pour trouver les infos du membre
    const getMemberInfo = (senderId: string) => {
        const member = selectedGroup.members.find(m => m.userId === senderId);
        return {
            userId: member?.userId || 'unknown',
            role: member?.role || 'member',
            joinedAt: member?.joinedAt || new Date(),
            lastRead: member?.lastRead || new Date()
        };
    };

    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getTimeAgo = (timestamp: string) => {
        const now = new Date();
        const messageDate = new Date(timestamp);
        const diffInSeconds = Math.floor((now.getTime() - messageDate.getTime()) / 1000);
        
        if (diffInSeconds < 60) {
            return 'just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}m ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours}h ago`;
        } else {
            return formatMessageTime(timestamp);
        }
    };

    return (
        <div className="relative h-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="xl:hidden hover:text-primary"
                        onClick={() => setIsShowChatMenu(!isShowChatMenu)}
                    >
                        <IconMenu />
                    </button>
                    <div className="relative flex-none">
                        <img
                            src={selectedGroup.avatar || '/assets/images/default-group.png'}
                            className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover"
                            alt={selectedGroup.name}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full 
                            flex items-center justify-center border-2 border-white dark:border-gray-800
                            ${selectedGroup.privacy === 'private' ? 'bg-purple-500' : 'bg-green-500'}`}
                        >
                            {selectedGroup.privacy === 'private' ?
                                <IconLock className="w-3 h-3 text-white" /> :
                                <IconGlobe className="w-3 h-3 text-white" />
                            }
                        </div>
                    </div>
                    <div className="mx-3">
                        <p className="font-semibold">{selectedGroup.name}</p>
                        <p className="text-xs text-white-dark">
                            {selectedGroup.members.length} members
                        </p>
                    </div>
                </div>
                <ChatActions isRtl={isRtl} />
            </div>

            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

            {/* Messages */}
            <PerfectScrollbar className="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
                <div className="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
                    <div className="block m-6 mt-0">
                        <h4 className="text-xs text-center border-b border-[#f4f4f4] dark:border-gray-800 relative">
                            <span className="relative top-2 px-3 bg-white dark:bg-black">
                                {'Today, ' + new Date(selectedGroup.lastActivityAt).toLocaleTimeString()}
                            </span>
                        </h4>
                    </div>

                    {selectedGroup.messages?.map((message: Message, index: number) => {
                        const isOwnMessage = message.senderId === loginUser.id;
                        const memberInfo = getMemberInfo(message.senderId);

                        return (
                            <div key={message.id || index}>
                                <div className={`flex items-start gap-3 ${isOwnMessage ? 'justify-end' : ''}`}>
                                    <div className={`flex-none ${isOwnMessage ? 'order-2' : ''}`}>
                                        <img
                                            src={`/assets/images/${isOwnMessage ? loginUser.path : 'user-profile.jpeg'}`}
                                            className="rounded-full h-10 w-10 object-cover"
                                            alt={isOwnMessage ? loginUser.name : 'Group Member'}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`dark:bg-gray-800 p-4 py-2 rounded-md bg-black/10 
                                                ${isOwnMessage ?
                                                    'ltr:rounded-br-none rtl:rounded-bl-none !bg-primary text-white' :
                                                    'ltr:rounded-bl-none rtl:rounded-br-none'
                                                }`}
                                            >
                                                {message.content}
                                            </div>
                                            {!isOwnMessage && (
                                                <div className="hover:text-primary cursor-pointer">
                                                    <IconMoodSmile className="w-4.5 h-4.5" />
                                                </div>
                                            )}
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs text-white-dark 
                                            ${isOwnMessage ? 'ltr:text-right rtl:text-left justify-end' : ''}`}
                                        >
                                            <span>{getTimeAgo(message.timestamp)}</span>
                                            {message.isEdited && (
                                                <>
                                                    <span>•</span>
                                                    <span className="italic">edited</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </PerfectScrollbar>

            {/* Message Input */}
            <MessageInput
                textMessage={textMessage}
                setTextMessage={setTextMessage}
                sendMessageHandle={sendMessageHandle}
                sendMessage={sendMessage}
            />
        </div>
    );
};

export default GroupChatView;