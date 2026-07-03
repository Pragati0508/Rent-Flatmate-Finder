import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";
import tenantMenu from "../utils/tenantMenu";
import ownerMenu from "../utils/ownerMenu";

import socket from "../services/socket";

import {
  getMessages,
  sendMessage,
} from "../services/messageService";

import useAuth from "../hooks/useAuth";

const Chat = () => {
  const { user } = useAuth();

  const { receiverId, listingId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  const menu =
    user?.role === "owner" ? ownerMenu : tenantMenu;

  useEffect(() => {
    if (!user || !receiverId || !listingId) return;

    socket.emit("register", user._id);

    loadMessages();

    const receiveHandler = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receiveMessage", receiveHandler);

    return () => {
      socket.off("receiveMessage", receiveHandler);
    };
  }, [user, receiverId, listingId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadMessages = async () => {
    try {
      const res = await getMessages(receiverId, listingId);

      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to load messages");
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const payload = {
      receiver: receiverId,
      listingId,
      message: text,
    };

    try {
      const res = await sendMessage(payload);

      const newMessage = res.data.data;

      setMessages((prev) => [...prev, newMessage]);

      socket.emit("sendMessage", {
        ...newMessage,
        receiver: receiverId,
      });

      setText("");

    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to send message"
      );
    }
  };

  return (
    <DashboardLayout menu={menu}>
      <h1 className="text-3xl font-bold mb-6">
        Chat
      </h1>

      <div className="bg-white rounded-xl shadow h-[75vh] flex flex-col">

        <div className="flex-1 overflow-y-auto p-5">

          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No messages yet.
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`mb-4 flex ${
                  msg.sender === user._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-xl max-w-sm break-words ${
                    msg.sender === user._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))
          )}

          <div ref={bottomRef} />

        </div>

        <div className="border-t p-4 flex gap-3">

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Chat;