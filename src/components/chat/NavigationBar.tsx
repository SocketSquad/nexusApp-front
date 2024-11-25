import { useState } from 'react';
import IconMessagesDot from '../Icon/IconMessagesDot';
import IconUsers from '../Icon/IconUsers';
import IconPhone from '../Icon/IconPhone';
import IconUserPlus from '../Icon/IconUserPlus';
import IconBell from '../Icon/IconBell';

type TabType = 'chats' | 'groups' | 'calls' | 'contacts' | 'notifications';

const tabs = [
    { id: 'chats', label: 'Chats', icon: <IconMessagesDot /> },
    { id: 'groups', label: 'Groups', icon: <IconUsers /> },
    { id: 'calls', label: 'Calls', icon: <IconPhone /> },
    { id: 'contacts', label: 'Contacts', icon: <IconUserPlus /> },
    { id: 'notifications', label: 'Notifications', icon: <IconBell /> },
] as const;

interface NavigationBarProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}

const NavigationBar = ({ activeTab, setActiveTab }: NavigationBarProps) => {

    return (
        <div className="flex justify-between items-center text-xs">
            {tabs.map(({ id, label, icon }) => (
                <button
                    key={id}
                    onClick={() => setActiveTab(id as TabType)}
                    className={`flex flex-col items-center hover:text-primary ${
                        activeTab === id ? 'text-primary' : ''
                    }`}
                >
                    <span className="mx-auto mb-1">{icon}</span>
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
};

export default NavigationBar;