import IconSend from "../Icon/IconSend";
import IconDownload from "../Icon/IconDownload";
import IconCamera from "../Icon/IconCamera";
import IconHorizontalDots from "../Icon/IconHorizontalDots";
import IconMicrophoneOff from "../Icon/IconMicrophoneOff";
import IconMoodSmile from "../Icon/IconMoodSmile";

interface IMessageInputProps {
    textMessage: string;
    setTextMessage: (text: string) => void;
    sendMessageHandle: (e: any) => void;
    sendMessage: () => void;
}

const MessageInput = ({ textMessage, setTextMessage, sendMessageHandle, sendMessage }: IMessageInputProps) => {
    return (
        <div className="p-4 absolute bottom-0 left-0 w-full">
            <div className="sm:flex w-full space-x-3 rtl:space-x-reverse items-center">
                <div className="relative flex-1">
                    <input
                        className="form-input rounded-full border-0 bg-[#f4f4f4] px-12 focus:outline-none py-2"
                        placeholder="Type a message"
                        value={textMessage}
                        onChange={(e: any) => setTextMessage(e.target.value)}
                        onKeyUp={sendMessageHandle}
                    />
                    <button type="button" className="absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 hover:text-primary">
                        <IconMoodSmile />
                    </button>
                    <button type="button" className="absolute ltr:right-4 rtl:left-4 top-1/2 -translate-y-1/2 hover:text-primary" onClick={() => sendMessage()}>
                        <IconSend />
                    </button>
                </div>
                <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block">
                    <button type="button" className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary">
                        <IconMicrophoneOff />
                    </button>
                    <button type="button" className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary">
                        <IconDownload />
                    </button>
                    <button type="button" className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary">
                        <IconCamera />
                    </button>
                    <button type="button" className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary">
                        <IconHorizontalDots className="opacity-70" />
                    </button>
                </div>
            </div>
        </div>  
    )
}

export default MessageInput;