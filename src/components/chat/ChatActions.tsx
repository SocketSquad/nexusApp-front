
import Dropdown from '../Dropdown';
import IconCopy from '../Icon/IconCopy';
import IconPhoneCall from '../Icon/IconPhoneCall';
import IconSearch from '../Icon/IconSearch';
import IconShare from '../Icon/IconShare';
import IconTrashLines from '../Icon/IconTrashLines';
import IconVideo from '../Icon/IconVideo';
import IconHorizontalDots from '../Icon/IconHorizontalDots';
import IconSettings from '../Icon/IconSettings';

interface IGroupChatActionsProps {
    isRtl: boolean;
}

const GroupChatActions = ({ isRtl }: IGroupChatActionsProps) => {
    return (
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
                            <button type="button">
                                <IconSearch className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                Search
                            </button>
                        </li>
                        <li>
                            <button type="button">
                                <IconCopy className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                Copy
                            </button>
                        </li>
                        <li>
                            <button type="button">
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
                    </ul>
                </Dropdown>
            </div>
        </div>
    )
}

export default GroupChatActions;