import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiDotsVertical, HiPhotograph, HiEmojiHappy } from "react-icons/hi";
import MessageService from "../../services/messageService";
import UserService from "../../services/userService";
import LoadingSpinner from "../common/LoadingSpinner";

const Chat = () => {
  const { id: activeChatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [pollInterval, setPollInterval] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(false);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (!activeChatId) {
      fetchRecentChats();
    } else {
      fetchReceiverAndMessages();
    }
  }, [activeChatId]);

  const fetchRecentChats = async () => {
    try {
      setLoadingRecent(true);
      const chats = await MessageService.getRecentChats();
      setRecentChats(chats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingRecent(false);
    }
  };

  const fetchReceiverAndMessages = async () => {
    try {
      setLoading(true);
      const [userResponse, messagesResponse] = await Promise.all([
        UserService.getUserProfile(activeChatId),
        MessageService.getMessages(activeChatId)
      ]);
      setReceiver(userResponse);
      setMessages(messagesResponse);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const pollMessages = async () => {
    try {
      const latestMessages = await MessageService.getMessages(activeChatId);
      if (JSON.stringify(latestMessages) !== JSON.stringify(messages)) {
        setMessages(latestMessages);
      }
    } catch (err) {
      console.error('Error polling messages:', err);
    }
  };

  useEffect(() => {
    if (activeChatId) {
      fetchReceiverAndMessages();
      const interval = setInterval(pollMessages, 3000);
      setPollInterval(interval);
      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      // Clear messages when no chat is selected
      setMessages([]);
      setReceiver(null);
    }
  }, [activeChatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      const sent = await MessageService.sendMessage(activeChatId, newMessage.trim());
      setMessages(prev => [...prev, sent]);
      setNewMessage("");
      pollMessages();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (!activeChatId) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Recent Messages</h1>
          {loadingRecent ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : recentChats.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No messages yet</p>
              <p className="text-sm mt-2">Start a chat from your friends list!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <div
                  key={chat.userId}
                  onClick={() => navigate(`/chat/${chat.userId}`)}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={chat.profilePicture || `https://ui-avatars.com/api/?name=${chat.username}`}
                      alt={chat.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-900">@{chat.username}</h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(chat.lastMessage.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <img
            src={receiver?.profilePicture || `https://ui-avatars.com/api/?name=${receiver?.username}`}
            className="w-10 h-10 rounded-full"
            alt={receiver?.username}
          />
          <div>
            <h3 className="font-medium">@{receiver?.username}</h3>
            <p className="text-sm text-green-500">online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.sender === activeChatId ? 'justify-start' : 'justify-end'}`}
          >
            <div className="flex flex-col max-w-[80%] md:max-w-[60%]">
              <div className={`rounded-2xl px-4 py-2 break-words ${
                message.sender === activeChatId
                  ? 'bg-gray-100 rounded-tl-none'
                  : 'bg-primary-500 text-white rounded-tr-none'
              }`}>
                {message.content}
              </div>
              <span className={`text-xs mt-1 ${
                message.sender === activeChatId ? 'text-left' : 'text-right'
              } text-gray-500`}>
                {formatTime(message.createdAt)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 p-4 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiEmojiHappy className="w-6 h-6 text-gray-500" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 py-2 px-4 bg-gray-50 rounded-full border border-gray-200
                   focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="flex-shrink-0 px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      {error && (
        <div className="absolute bottom-20 left-0 right-0 mx-4 bg-red-50 text-red-500 p-3 rounded-lg text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default Chat;
