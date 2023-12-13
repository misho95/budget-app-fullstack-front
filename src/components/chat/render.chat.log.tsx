import { userGlobalStore } from "../../utils/zustand.store";
import { MessageType } from "./chat.types";

interface PropsType {
  chatLog: MessageType[];
}

const RenderedChatLog = ({ chatLog }: PropsType) => {
  const user = userGlobalStore((state) => state.user);

  const checkForPrevChat = (index: number, idToCheck: string | undefined) => {
    if (chatLog[index]?.sendFrom !== idToCheck) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-[5px]">
      {chatLog.map((chat, index) => {
        return (
          <div
            key={chat._id}
            className={`flex flex-col gap-[5px] w-full ${
              chat.sendFrom !== user?._id ? "self-start" : "self-end"
            }`}
          >
            {checkForPrevChat(index - 1, chat.sendFrom) && (
              <h6
                className={`text-[12px] text-black/60 ${
                  chat.sendFrom !== user?._id ? "self-start" : "self-end"
                }`}
              >
                {chat.userName}
              </h6>
            )}

            <div
              className={`w-fit max-w-[200px]  p-[5px] rounded-lg text-white break-words ${
                chat.sendFrom !== user?._id
                  ? "bg-pink-500 self-start"
                  : "bg-indigo-500 self-end"
              }`}
            >
              {chat.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderedChatLog;
