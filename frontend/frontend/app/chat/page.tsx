"use client";

import { useState, useEffect, useRef } from "react";
import { BlindDropdown } from "../compents/BlindDropdown";
import { AIText } from "../compents/AIText";
import Image from "next/image";
import MovingMascot from "../compents/MovingMascot";
import Link from "next/link";

type Message = {
  sender: string;
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const socketRef = useRef<any>(null);
  const reconnectTimerRef = useRef<any>(null);
  const retryCountRef = useRef<any>(0);

  const connectWebSocket = () => {
    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const sessionId = localStorage.getItem("sessionId");
    const ws = new WebSocket(`ws://localhost:8082?sessionId=${sessionId || ""}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to server");
      retryCountRef.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "session") {
          localStorage.setItem("sessionId", data.sessionId);
        } else if (data.type === "history") {
          const loaded = data.messages.map((m: any) => ({
            sender: m.role === "user" ? "You" : "AI",
            text: m.content,
          }));
          setMessages(loaded);
        } else if (data.type === "message") {
          const reply =
            typeof data.message === "string"
              ? data.message
              : data.message.content;
          setMessages((prev) => [...prev, { sender: "AI", text: reply }]);
        } else {
          console.warn("Unknown message type:", data);
        }
      } catch (err) {
        console.error("Invalid message format:", event.data);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
      const retryDelay = Math.min(10000, 500 * 2 ** retryCountRef.current);
      retryCountRef.current += 1;
      reconnectTimerRef.current = setTimeout(connectWebSocket, retryDelay);
    };

    ws.onerror = (err) => {
      ws.close();
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessage = { sender: "You", text: trimmed };
    setMessages((prev) => [...prev, newMessage]);

    const ws = socketRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(trimmed);
    } else {
      console.warn("WebSocket not open; message not sent.");
    }

    setInput("");
  };

  const startNewChat = () => {
    localStorage.removeItem("sessionId");
    setMessages([]);

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    connectWebSocket();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-[#CAA286] overflow-hidden">
      <MovingMascot disappearDelay={1200} imageSize={100} />
      <BlindDropdown setInput={setInput} sendMessage={sendMessage} />
      <button
        onClick={startNewChat}
        className="absolute top-100 right-6 text-white px-3 py-2 rounded-lg transition"
      >
        <Image
          src="/ClearChat.svg"
          alt="Home Image"
          width={150}
          height={100}
          className="object-contain"
        />
      </button>

      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
        >
        <Image
          src="/Home.svg"
          alt="Home Image"
          width={150}
          height={100}
          className="object-contain"
        />
        </Link>
      </div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-3/4 h-3/4 p-4 rounded-4xl border-4 border-gray-400
                bg-[#f5d4b9] flex flex-col"
      >
        <div
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
          style={{ maxHeight: "100%" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.sender === "You" ? "self-end" : "self-start"}
            >
              {message.sender === "AI" ? (
                <AIText text={message.text} 
                classname="p-2 rounded-xl bg-[#824f4f] rounded-tl-none transform transition-transform duration-300 ease-in-out hover:scale-105"/>

              ) : (
              <div
                className={`p-2 rounded-xl ${
                  message.sender === "You"
                    ? "bg-[#c9a185] text-[#824f4f] rounded-br-none transform transition-transform duration-300 ease-in-out hover:scale-105"
                    : "bg-[#f2b4a6] text-[#824f4f] rounded-tl-none transform transition-transform duration-300 ease-in-out hover:scale-105"
                }`}
              >
                {message.text}
              </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center mt-4 border-t pt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Write your message here"
            className="flex-grow p-3 border text-xl border-gray-300 rounded-4xl bg-[#996B63] text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isCooldown}
            className="ml-4 shrink-0 disabled:opacity-80 cursor-pointer transition"
            title="Send message"
          >
            <Image
              src="/SendButton.svg"
              alt="Send"
              width={80}
              height={60}
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}