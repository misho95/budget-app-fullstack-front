import { animated, useSpring } from "@react-spring/web";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import axiosInstance from "../utils/axios";
import { userGlobalStore } from "../utils/zustand.store";

const ChatPage = () => {
  const animatedPage = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 5,
      friction: 120,
      tension: 100,
    },
  });

  const { userId } = useParams();
  const user = userGlobalStore((state) => state.user);
  const navigate = useNavigate();

  interface MessageType {
    _id: string;
    userName: string;
    message: string;
    sendFrom: string;
    sendTo: string;
    createdAt: Date;
    updatedAt: Date;
  }

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<MessageType[]>([]);
  const chatContainer = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!userId || userId === user?._id) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const newSocket = io("http://budget-app-bz54x.ondigitalocean.app/");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("login", user?._id);
      socket.on("message", (msg: string) => {
        axiosInstance
          .post(`/api/chat/${userId}`, { message: msg })
          .then((res) => {
            setChatLog((prevChatLog) => [...prevChatLog, res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    return () => {
      // Clean up socket event listeners here if needed
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket]);

  const scrollDown = () => {
    if (!chatContainer.current) {
      return;
    }

    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  };

  useEffect(() => {
    scrollDown();
  }, [chatLog]);

  useEffect(() => {
    axiosInstance
      .get(`/api/chat/${userId}`)
      .then((res) => {
        setChatLog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket && message.trim() !== "") {
      socket.emit("message", { message, userId: user?._id });
      setMessage("");
    }
  };

  const checkForPrevChat = (index: number, idToCheck: string | undefined) => {
    if (chatLog[index]?.sendFrom !== idToCheck) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <animated.div style={{ ...animatedPage }} className="flex justify-center">
      <div className="w-11/12 lg:w-[500px] bg-white shadow-sm shadow-black/10 p-[20px] rounded-xl flex flex-col gap-[15px]">
        <div
          ref={chatContainer}
          className="h-[500px] overflow-y-auto flex flex-col gap-[5px]"
        >
          {chatLog.map((chat, index) => (
            <div
              key={chat._id}
              className={`flex flex-col gap-[5px] w-full ${
                chat.sendFrom === user?._id ? "self-start" : "self-end"
              }`}
            >
              {checkForPrevChat(index - 1, chat.sendFrom) && (
                <h6
                  className={`text-[12px] text-black/60 ${
                    chat.sendFrom === user?._id ? "self-start" : "self-end"
                  }`}
                >
                  {chat.userName}
                </h6>
              )}

              <div
                className={`w-fit max-w-[200px]  p-[5px] rounded-lg text-white break-words ${
                  chat.sendFrom === user?._id
                    ? "bg-indigo-500 self-start"
                    : "bg-pink-500 self-end"
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={sendMessage}
          className="w-full bg-neutral-700 p-[10px] rounded-xl relative"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-[10px] rounded-full border-none focus:outline-none"
          />
          <button className="absolute top-1/2 -translate-y-1/2 right-[15px] bg-green-500 py-[7px] px-[20px] rounded-full text-black/95 border-[1px] border-black/30 sm:hover:scale-95 duration-200">
            Send
          </button>
        </form>
      </div>
    </animated.div>
  );
};

export default ChatPage;
