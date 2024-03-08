import React, { createContext, useState } from "react";

export const ChatContext = React.createContext();

const ChatContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchInChat, setSearchInChat] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        profile,
        setProfile,
        selectedChat,
        setSelectedChat,
        searchInChat,
        setSearchInChat,
        socket,
        setSocket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
