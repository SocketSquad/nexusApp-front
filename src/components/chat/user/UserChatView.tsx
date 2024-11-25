import React from 'react';
import IconMenu from '../../Icon/IconMenu';
import IconMoodSmile from '../../Icon/IconMoodSmile';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MessageInput from '../MessageInput';
import ChatActions from '../ChatActions';

interface UserChatViewProps {
    selectedUser: any;
    loginUser: any;
    isRtl: boolean;
    textMessage: string;
    setTextMessage: (message: string) => void;
    sendMessage: () => void;
    sendMessageHandle: (e: any) => void;
    setIsShowChatMenu: (show: boolean) => void;
    isShowChatMenu: boolean;
}

const UserChatView: React.FC<UserChatViewProps> = ({
    selectedUser,
    loginUser,
    isRtl,
    textMessage,
    setTextMessage,
    sendMessage,
    sendMessageHandle,
    setIsShowChatMenu,
    isShowChatMenu
}) => {
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
                            src={`/assets/images/${selectedUser.path}`} 
                            className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover" 
                            alt={selectedUser.name} 
                        />
                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                            <div className="w-4 h-4 bg-success rounded-full"></div>
                        </div>
                    </div>
                    <div className="mx-3">
                        <p className="font-semibold">{selectedUser.name}</p>
                        <p className="text-white-dark text-xs">
                            {selectedUser.active ? 'Active now' : 'Last seen at ' + selectedUser.time}
                        </p>
                    </div>
                </div>
                <ChatActions isRtl={isRtl} />
            </div>

            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

            {/* Chat Messages */}
            <PerfectScrollbar className="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
                <div className="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
                    <div className="block m-6 mt-0">
                        <h4 className="text-xs text-center border-b border-[#f4f4f4] dark:border-gray-800 relative">
                            <span className="relative top-2 px-3 bg-white dark:bg-black">
                                {'Today, ' + selectedUser.time}
                            </span>
                        </h4>
                    </div>
                    {selectedUser.messages?.map((message: any, index: number) => (
                        <div key={index}>
                            <div className={`flex items-start gap-3 ${
                                selectedUser.userId === message.fromUserId ? 'justify-end' : ''
                            }`}>
                                <div className={`flex-none ${
                                    selectedUser.userId === message.fromUserId ? 'order-2' : ''
                                }`}>
                                    <img 
                                        src={`/assets/images/${
                                            selectedUser.userId === message.fromUserId ? loginUser.path : selectedUser.path
                                        }`} 
                                        className="rounded-full h-10 w-10 object-cover" 
                                        alt="" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`dark:bg-gray-800 p-4 py-2 rounded-md bg-black/10 ${
                                            message.fromUserId === selectedUser.userId
                                                ? 'ltr:rounded-br-none rtl:rounded-bl-none !bg-primary text-white'
                                                : 'ltr:rounded-bl-none rtl:rounded-br-none'
                                        }`}>
                                            {message.text}
                                        </div>
                                        {selectedUser.userId !== message.fromUserId && (
                                            <IconMoodSmile className="hover:text-primary" />
                                        )}
                                    </div>
                                    <div className={`text-xs text-white-dark ${
                                        selectedUser.userId === message.fromUserId ? 'ltr:text-right rtl:text-left' : ''
                                    }`}>
                                        {message.time || '5h ago'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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

export default UserChatView;