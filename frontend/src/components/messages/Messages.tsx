import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessage();
  const dummy = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length &&
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      {loading &&
        [...Array(3)].map((item, index) => <MessageSkeleton key={index} />)}
      {!loading && !messages.length && (
        <p className="text-center text-white">
          Send A Message to Start a conversation
        </p>
      )}
      <div ref={dummy} />
    </div>
  );
};

export default Messages;
