import { animated, useSpring } from "@react-spring/web";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import axiosInstance from "../utils/axios";
import { userGlobalStore } from "../utils/zustand.store";
import { sha256 } from "js-sha256";
import messageSound from "../assets/message.mp3";
import TypeingComponent from "../components/chat/typeing.component";
import RenderedChatLog from "../components/chat/render.chat.log";
import { MessageType } from "../components/chat/chat.types";

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

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<MessageType[]>([]);
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const [getRoomId, setRoomId] = useState<null | string>(null);
  const [isTypeing, setIsTypeing] = useState(false);

  useLayoutEffect(() => {
    if (!userId || userId === user?._id) {
      navigate("/");
    }
  }, []);

  const scrollDown = () => {
    if (!chatContainer.current) {
      return;
    }

    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  };

  function generateId(id1: string, id2: string) {
    // Concatenate arguments and sort them
    const combinedArgs = [String(id1), String(id2)].sort().join("");

    // Create a SHA256 hash
    const hashedId = sha256(combinedArgs);

    return hashedId;
  }

  useEffect(() => {
    const url = "https://budget-app-bz54x.ondigitalocean.app/";
    const newSocket = io(url);
    setSocket(newSocket);

    return () => {
      if (socket?.connected) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        if (user && userId) {
          const roomId = generateId(user?._id, userId);
          setRoomId(roomId);
          socket.emit("joinRoom", roomId);
        }
      });

      socket.on("message", (res) => {
        playSOund();
        setChatLog((prevChatLog) => {
          if (!prevChatLog.some((msg) => msg._id === res.data._id)) {
            return [...prevChatLog, res.data];
          }
          return prevChatLog;
        });
      });

      socket.on("typeing", (res) => {
        if (res.userId === userId && res.isTypeing) {
          setIsTypeing(true);
          scrollDown();
          return;
        }

        if (res.userId === userId && !res.isTypeing) {
          setIsTypeing(false);
          return;
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (socket) {
        socket.emit("leaveRoom", getRoomId);
        setRoomId(null);
      }
      event.preventDefault();
      event.returnValue = ""; // Some browsers require a return value
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
      axiosInstance
        .post(`/api/chat/${userId}`, { message })
        .then((res) => {
          socket.emit("message", {
            message,
            userId: user?._id,
            data: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      handleType("");
      setMessage("");
    }
  };

  const playSOund = () => {
    const audio = new Audio(messageSound);
    audio.addEventListener("canplaythrough", () => {
      audio.play().catch((error) => {
        console.error("Play error:", error);
      });
    });
  };

  const handleType = (msg: string) => {
    if (msg !== "" && socket) {
      socket.emit("typeing", {
        roomId: getRoomId,
        userId: user?._id,
        isTypeing: true,
      });
      return;
    }

    if (!msg && socket) {
      socket.emit("typeing", {
        roomId: getRoomId,
        userId: user?._id,
        isTypeing: false,
      });
      return;
    }
  };

  return (
    <animated.div style={{ ...animatedPage }} className="flex justify-center">
      <div className="w-11/12 lg:w-[500px] bg-white shadow-sm shadow-black/10 p-[20px] rounded-xl flex flex-col gap-[15px]">
        <div ref={chatContainer} className="h-[500px] overflow-y-auto">
          {<RenderedChatLog chatLog={chatLog} />}
          {isTypeing && <TypeingComponent />}
        </div>
        <form
          onSubmit={sendMessage}
          className="w-full bg-neutral-700 p-[10px] rounded-xl relative"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value), handleType(e.target.value);
            }}
            placeholder="Type a message..."
            className="w-full p-[10px] pr-[90px] rounded-full border-none focus:outline-none"
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
