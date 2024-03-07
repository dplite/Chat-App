import React from "react";
import Conversation from "./Conversation";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log(conversations, "dd");
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversations, index) => {
        return (
          <Conversation
            key={conversations._id}
            conversation={conversations}
            emoji={getRandomEmoji()}
            lastIdx={conversations.length - 1 === index}
          />
        );
      })}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
