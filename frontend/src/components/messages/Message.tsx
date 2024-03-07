import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = authUser._id === message.senderId;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicUrl = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleColor = fromMe ? "bg-sky-500" : "bg-slate-500";
  const time = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePicUrl} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {time}
      </div>
    </div>
  );
};

export default Message;
