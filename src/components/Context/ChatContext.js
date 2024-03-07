import React, { createContext, useState } from "react";

export const ChatContext = React.createContext();

const ChatContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <ChatContext.Provider
      value={{ profile, setProfile, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
