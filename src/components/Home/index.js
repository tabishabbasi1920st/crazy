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
  const { selectedChat, setSocket, profile, setChatList, setChatData } =
    useContext(ChatContext);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);

    // if the user is logged in then add it to the server in active users list.
    profile !== null && socket.emit("AddUser", profile.email);

    socket.on("connection", (msg) => {
      console.log(msg);
    });

    // listening about new text messages.
    socket.on("TextMessage", (message) => {
      setChatList((prevList) => [...prevList, message]);
      // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.

      if (selectedChat !== null) {
        console.log("emittingback", selectedChat);
        socket.emit("NewMsgReaded", {
          id: message.id,
          sentBy: profile.email,
          sentTo: message.sentBy,
        });
      }
    });

    // getting message delivery status like seen by this event.
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

    // if receiver seen all message so he will triggered this event to tell to sender that i have seen all my messages you can update in your ui in real time.
    socket.on("iHaveSeenAllMessages", (updatedMessages) => {
      setChatList((prevList) =>
        prevList.map((existingMsg) => {
          const matchingUpdatedMessage = updatedMessages.find(
            (updatedMsg) => updatedMsg.id === existingMsg.id
          );

          if (matchingUpdatedMessage) {
            // Return the updated message with the new delieveryStatus
            return {
              ...existingMsg,
              delieveryStatus: msgDelieveryStatusConstants.seen,
            };
          }

          // Return the existing message if no update is found
          return existingMsg;
        })
      );
    });

    // it is basically saying that i have seen all message so update those messages status as "SEEN", which are pending and not seen by me.
    if (profile !== null && selectedChat !== null) {
      socket.emit("updateMyMessageStatus", {
        me: profile.email,
        to: selectedChat.email,
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [profile, selectedChat]);

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
