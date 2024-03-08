import {
  MainContainer,
  BodyContainerSm,
  BodyContainerLg,
  FirstContainer,
  SecondContainer,
} from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useEffect } from "react";
import Header from "../Header";
import AllChat from "../AllChats";
import SelectedChatContainer from "../SelectedChatContainer";
import ChatNotSelected from "../ChatNotSelected";
import io from "socket.io-client";

const msgDelieveryStatusConstants = {
  pending: "PENDING",
  sent: "SENT",
  seen: "SEEN",
};

export default function Home() {
  const { selectedChat, setSocket, profile, chatList, setChatList } =
    useContext(ChatContext);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);

    // if the user is logged in then add it to the server in active users list.
    profile !== null && socket.emit("AddUser", profile.email);

    socket.on("connection", (msg) => {
      console.log(msg);
    });

    socket.on("TextMessage", (message) => {
      setChatList((prevList) => [...prevList, message]);
      // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.
      socket.emit("NewMsgReaded", {
        id: message.id,
        sentBy: profile.email,
        sentTo: message.sentBy,
      });
    });

    socket.on("NewMsgReaded", (msg) => {
      const { msgId } = msg;
      setChatList((prevList) =>
        prevList.map((msg) =>
          msg.id === msgId
            ? { ...msg, delieveryStatus: msgDelieveryStatusConstants.seen }
            : msg
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [profile]);

  return (
    <MainContainer>
      <Header />
      {/* This body container will show only in small devices */}
      <BodyContainerSm>
        {selectedChat === null ? <AllChat /> : <SelectedChatContainer />}
      </BodyContainerSm>
      {/* This body container will show only in large devices */}
      <BodyContainerLg>
        <FirstContainer>
          <AllChat />
        </FirstContainer>
        <SecondContainer>
          {selectedChat === null ? (
            <ChatNotSelected />
          ) : (
            <SelectedChatContainer />
          )}
        </SecondContainer>
      </BodyContainerLg>
    </MainContainer>
  );
}
