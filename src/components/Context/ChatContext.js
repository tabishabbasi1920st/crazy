import React, { createContext, useState } from "react";

export const ChatContext = React.createContext();

const ChatContextProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  return (
    <ChatContext.Provider value={{ profile, setProfile }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
