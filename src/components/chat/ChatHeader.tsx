import Dropdown from '../Dropdown';
import IconHorizontalDots from '../Icon/IconHorizontalDots';
import IconSettings from '../Icon/IconSettings';
import IconHelpCircle from '../Icon/IconHelpCircle';
import IconLogin from '../Icon/IconLogin';

interface ChatHeaderProps {
    isRtl: boolean;
}

const ChatHeader = ({ isRtl }: ChatHeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <div className="flex-none">
                    <img src="/assets/images/profile-34.jpeg" className="rounded-full h-12 w-12 object-cover" alt="" />
                </div>
                <div className="mx-3">
                    <p className="mb-1 font-semibold">Alon Smith</p>
                    <p className="text-xs text-white-dark">Software Developer</p>
                </div>
            </div>
            <div className="dropdown">
                <Dropdown
                    offset={[0, 5]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center hover:text-primary"
                    button={<IconHorizontalDots className="opacity-70" />}
                >
                    <ul className="whitespace-nowrap">
                        <li>
                            <button type="button">
                                <IconSettings className="w-4.5 h-4.5 ltr:mr-1 rtl:ml-1 shrink-0" />
                                Settings
                            </button>
                        </li>
                        <li>
                            <button type="button">
                                <IconHelpCircle className="w-4.5 h-4.5 ltr:mr-1 rtl:ml-1 shrink-0" />
                                Help & feedback
                            </button>
                        </li>
                        <li>
                            <button type="button">
                                <IconLogin className="ltr:mr-1 rtl:ml-1 shrink-0" />
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </Dropdown>
            </div>
        </div>
    );
};

export default ChatHeader;
