const Message = ({ currentConversationUser, conversation }) => {
  return (
    <div
      className={`chat   ${
        conversation.senderId === currentConversationUser._id
          ? "chat-start"
          : "chat-end"
      }`}
    >
      {conversation.senderId == currentConversationUser._id && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt={currentConversationUser.name}
              src={currentConversationUser.avatar}
            />
          </div>
        </div>
      )}
      <div
        className={`chat-bubble  ${
          conversation.senderId == currentConversationUser._id
            ? "bg-slate-600"
            : ""
        }  `}
        tooltip="hello"
      >
        {conversation.message}
      </div>
      {/* format dd/mm/yyyy hh */}
      <div className="chat-footer">
        <span className="text-xs text-gray-400">
          {new Date(conversation.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};
export default Message;
