import { IRootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { setPageTitle } from '../store/themeConfigSlice';
import IconMenu from '../components/Icon/IconMenu';
import ChatHeader from '../components/chat/ChatHeader';
import SearchBar from '../components/chat/SearchBar';
import NavigationBar from '../components/chat/NavigationBar';
import GroupList from '../components/chat/group/GroupList';
import { Group } from '../types/chat';
import ChatEmptyIllustration from '../components/chat/ChatEmptyIllustration';
import UserChatView from '../components/chat/user/UserChatView';
import GroupChatView from '../components/chat/group/GroupChatView';
import { groupService } from '../services/groupService';

const contactList = [
    {
        userId: 1,
        name: 'Nia Hillyer',
        path: 'profile-16.jpeg',
        time: '2:09 PM',
        preview: 'How do you do?',
        messages: [
            {
                fromUserId: 0,
                toUserId: 1,
                text: 'Hi, I am back from vacation',
            },
            {
                fromUserId: 0,
                toUserId: 1,
                text: 'How are you?',
            },
            {
                fromUserId: 1,
                toUserId: 0,
                text: 'Welcom Back',
            },
            {
                fromUserId: 1,
                toUserId: 0,
                text: 'I am all well',
            },
            {
                fromUserId: 0,
                toUserId: 1,
                text: 'Coffee?',
            },
        ],
        active: true,
    },
    {
        userId: 2,
        name: 'Sean Freeman',
        path: 'profile-1.jpeg',
        time: '12:09 PM',
        preview: 'I was wondering...',
        messages: [
            {
                fromUserId: 0,
                toUserId: 2,
                text: 'Hello',
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: "It's me",
            },
            {
                fromUserId: 0,
                toUserId: 2,
                text: 'I have a question regarding project.',
            },
        ],
        active: false,
    },
    {
        userId: 3,
        name: 'Alma Clarke',
        path: 'profile-2.jpeg',
        time: '1:44 PM',
        preview: 'I’ve forgotten how it felt before',
        messages: [
            {
                fromUserId: 0,
                toUserId: 3,
                text: 'Hey Buddy.',
            },
            {
                fromUserId: 0,
                toUserId: 3,
                text: "What's up",
            },
            {
                fromUserId: 3,
                toUserId: 0,
                text: 'I am sick',
            },
            {
                fromUserId: 0,
                toUserId: 3,
                text: 'Not comming to office today.',
            },
        ],
        active: true,
    },
    {
        userId: 4,
        name: 'Alan Green',
        path: 'profile-3.jpeg',
        time: '2:06 PM',
        preview: 'But we’re probably gonna need a new carpet.',
        messages: [
            {
                fromUserId: 0,
                toUserId: 4,
                text: 'Hi, collect your check',
            },
            {
                fromUserId: 4,
                toUserId: 0,
                text: 'Ok, I will be there in 10 mins',
            },
        ],
        active: true,
    },
    {
        userId: 5,
        name: 'Shaun Park',
        path: 'profile-4.jpeg',
        time: '2:05 PM',
        preview: 'It’s not that bad...',
        messages: [
            {
                fromUserId: 0,
                toUserId: 3,
                text: 'Hi, I am back from vacation',
            },
            {
                fromUserId: 0,
                toUserId: 3,
                text: 'How are you?',
            },
            {
                fromUserId: 0,
                toUserId: 5,
                text: 'Welcom Back',
            },
            {
                fromUserId: 0,
                toUserId: 5,
                text: 'I am all well',
            },
            {
                fromUserId: 5,
                toUserId: 0,
                text: 'Coffee?',
            },
        ],
        active: false,
    },
    {
        userId: 6,
        name: 'Roxanne',
        path: 'profile-5.jpeg',
        time: '2:00 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [
            {
                fromUserId: 0,
                toUserId: 6,
                text: 'Hi',
            },
            {
                fromUserId: 0,
                toUserId: 6,
                text: 'Uploaded files to server.',
            },
        ],
        active: false,
    },
    {
        userId: 7,
        name: 'Ernest Reeves',
        path: 'profile-6.jpeg',
        time: '2:09 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: true,
    },
    {
        userId: 8,
        name: 'Laurie Fox',
        path: 'profile-7.jpeg',
        time: '12:09 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: true,
    },
    {
        userId: 9,
        name: 'Xavier',
        path: 'profile-8.jpeg',
        time: '4:09 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: false,
    },
    {
        userId: 10,
        name: 'Susan Phillips',
        path: 'profile-9.jpeg',
        time: '9:00 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: true,
    },
    {
        userId: 11,
        name: 'Dale Butler',
        path: 'profile-10.jpeg',
        time: '5:09 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: false,
    },
    {
        userId: 12,
        name: 'Grace Roberts',
        path: 'user-profile.jpeg',
        time: '8:01 PM',
        preview: 'Wasup for the third time like is you bling bitch',
        messages: [],
        active: true,
    },
];
const loginUser = {
    id: 0,
    name: 'Alon Smith',
    path: 'profile-34.jpeg',
    designation: 'Software Developer',
};


const Chat = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Chat'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    //Saving activeTab in localstorage
    const [activeTab, setActiveTab] = useState(()=>localStorage.getItem('activeTab') || 'chats');
  
    useEffect(()=>{
        localStorage.setItem('activeTab',activeTab);
    }, [activeTab]);

    //Saving selected group id in localstorage

    const [selectedGroupId, setSelectedGroupId] = useState<string>(() => localStorage.getItem('selectedGroupId') || '');
    useEffect(()=>{
    localStorage.setItem('selectedGroupId', selectedGroupId); 
    },[selectedGroupId]);
    console.log("selectedGroupId: ",selectedGroupId);

    

    const [isShowChatMenu, setIsShowChatMenu] = useState(false);
    const [isShowUserChat, setIsShowUserChat] = useState(false);
    const [isShowGroupChat, setIsShowGroupChat] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [textMessage, setTextMessage] = useState('');
    const [filteredItems, setFilteredItems] = useState<any>(contactList);
    const [groups,setGroups] = useState<Group[]>([]);

   


    useEffect(() => {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5bWFuZSBiaXNkYW91bmUiLCJzdWIiOiI2NzNjZTZhNTE4MmYyYzc2YTg5NTQ0NjUiLCJpYXQiOjE3MzIyNjI1NDUsImV4cCI6MTczMjI4MDU0NX0.Knafe6v6JxoxWdKXxZKdsANZ6iDgSHCourgtbFIoXqc ');
      }, []);

    // Fetching groups from the backend

    useEffect(()=>{
        const fetchGroups =  async() =>{
            try{
                const data = await groupService.getGroups();
                setGroups(data);
            }
            catch(error){
                console.error("Failed to fetch groups")
            }
        };
        fetchGroups();
    },[]);

    

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((d) => {
                return d.name.toLowerCase().includes(searchUser.toLowerCase());
            });
        });
    }, [searchUser]);

    const scrollToBottom = () => {
        if (isShowUserChat) {
            setTimeout(() => {
                const element: any = document.querySelector('.chat-conversation-box');
                element.behavior = 'smooth';
                element.scrollTop = element.scrollHeight;
            });
        }
    };
    const selectUser = (user: any) => {
        setSelectedUser(user);
        setIsShowUserChat(true);
        scrollToBottom();
        setIsShowChatMenu(false);
    };
    const sendMessage = () => {
        if (textMessage.trim()) {
            let list = contactList;
            let user: any = list.find((d) => d.userId === selectedUser.userId);
            user.messages.push({
                fromUserId: selectedUser.userId,
                toUserId: 0,
                text: textMessage,
                time: 'Just now',
            });
            setFilteredItems(list);
            setTextMessage('');
            scrollToBottom();
        }
    };
    const sendMessageHandle = (event: any) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const handleInviteToGroup = (group: Group) => {
        // Handle group invitation logic
        console.log(`Inviting to group: ${group.name}`);
    };
    const selectGroup = (group: Group) => {
        setSelectedGroup(group);
        setIsShowGroupChat(true);
        setIsShowUserChat(false);
        setSelectedUser(null);
        scrollToBottom();
        setIsShowChatMenu(false);
        setSelectedGroupId(group._id);
    };


    return (
        <div>
            <div className={`flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>
                <div className={`panel p-4 flex-none max-w-sm w-full absolute xl:relative z-10 space-y-4 xl:h-full hidden xl:block overflow-hidden ${isShowChatMenu ? '!block' : ''}`}>
                    <ChatHeader isRtl={isRtl} />
                    <SearchBar searchUser={searchUser} setSearchUser={setSearchUser} />
                    <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                    <div className="!mt-0">
                        <PerfectScrollbar className="chat-users relative h-full min-h-[100px] sm:h-[calc(100vh_-_357px)] space-y-0.5 ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5">
                            {activeTab === 'chats' && (
                                <div>
                                    {filteredItems.map((person: any) => {
                                        return (
                                            <div key={person.userId}>
                                                <button
                                                    type="button"
                                                    className={`w-full flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-[#050b14] rounded-md dark:hover:text-primary hover:text-primary ${selectedUser && selectedUser.userId === person.userId ? 'bg-gray-100 dark:bg-[#050b14] dark:text-primary text-primary' : ''
                                                        }`}
                                                    onClick={() => selectUser(person)}
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 relative">
                                                                <img src={`/assets/images/${person.path}`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                {person.active && (
                                                                    <div>
                                                                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                                                            <div className="w-4 h-4 bg-success rounded-full"></div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="mx-3 ltr:text-left rtl:text-right">
                                                                <p className="mb-1 font-semibold">{person.name}</p>
                                                                <p className="text-xs text-white-dark truncate max-w-[185px]">{person.preview}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold whitespace-nowrap text-xs">
                                                        <p>{person.time}</p>
                                                    </div>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {activeTab === 'groups' && (
                                <GroupList
                                    onClickGroup={selectGroup}
                                    groups={groups}
                                    onSelectGroup={selectGroup}
                                    selectedGroupId={selectedGroupId}
                                    onInviteToGroup={handleInviteToGroup}
                                />
                            )}
                        </PerfectScrollbar>
                    </div>
                </div>
                <div className={`bg-black/60 z-[5] w-full h-full absolute rounded-md hidden ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)}></div>
                <div className="panel p-0 flex-1">
                    {!isShowUserChat && !isShowGroupChat && (
                        <div className="flex items-center justify-center h-full relative p-4">
                            <button type="button" onClick={() => setIsShowChatMenu(!isShowChatMenu)} className="xl:hidden absolute top-4 ltr:left-4 rtl:right-4 hover:text-primary">
                                <IconMenu />
                            </button>

                            <ChatEmptyIllustration />
                        </div>
                    )}
                    {isShowUserChat && selectedUser ? (
                        <UserChatView
                            selectedUser={selectedUser}
                            loginUser={loginUser}
                            isRtl={isRtl}
                            textMessage={textMessage}
                            setTextMessage={setTextMessage}
                            sendMessage={sendMessage}
                            sendMessageHandle={sendMessageHandle}
                            setIsShowChatMenu={setIsShowChatMenu}
                            isShowChatMenu={isShowChatMenu}
                        />
                    ) : isShowGroupChat && selectedGroup ? (
                        <GroupChatView
                            selectedGroup={selectedGroup}
                            loginUser={loginUser}
                            isRtl={isRtl}
                            textMessage={textMessage}
                            setTextMessage={setTextMessage}
                            sendMessage={sendMessage}
                            sendMessageHandle={sendMessageHandle}
                            setIsShowChatMenu={setIsShowChatMenu}
                            isShowChatMenu={isShowChatMenu}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
