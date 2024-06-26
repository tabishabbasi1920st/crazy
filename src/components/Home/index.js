import {
  MainContainer,
  BodyContainerSm,
  BodyContainerLg,
  FirstContainer,
  SecondContainer,
} from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useEffect } from "react";
import io from "socket.io-client";
import Header from "../Header";
import AllChat from "../AllChats";
import SelectedChatContainer from "../SelectedChatContainer";
import ChatNotSelected from "../ChatNotSelected";
import CustomizationSidebar from "../CustomizationSidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const msgDelieveryStatusConstants = {
  pending: "PENDING",
  sent: "SENT",
  seen: "SEEN",
};

export default function Home() {
  const {
    selectedChat,
    setSocket,
    profile,
    setChatList,
    setChatData,
    senderActivity,
    setSenderActivity,
    onlineUsersList,
    setOnlineUsersList,
    customizationSidebar,
    setCustomizationSidebar,
  } = useContext(ChatContext);

  const navigate = useNavigate();

  useEffect(() => {
    // extra safety while navigating to escape and then returning back if history object not cleared so it will open escape page.
    if (localStorage.getItem("isReplace") === "") {
      navigate("/escape", { replace: true });
    }

    document.title = "Connect Me - Home";
    const socket = io("https://crazychat.onrender.com");
    setSocket(socket);

    if (Cookies.get("chatToken") === undefined) {
      navigate("/login", { replace: true });
    }

    socket.on("connection", (msg) => {
      console.log(msg);
    });

    // if the user is logged in then add it to the server in active users list.
    profile !== null && socket.emit("AddUser", profile.email);

    socket.on("connectedUsers", (onlineUsersList) => {
      setOnlineUsersList(onlineUsersList);
    });

    if (selectedChat !== null) {
      // listening about new text messages.
      socket.on("TextMessage", (message) => {
        if (selectedChat.email === message.sentBy) {
          setChatList((prevList) => [...prevList, message]);
          console.log("message received", message);
        }

        // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.

        if (selectedChat !== null && selectedChat.email === message.sentBy) {
          console.log("emittingback", selectedChat);
          socket.emit("NewMsgReaded", {
            id: message.id,
            sentBy: profile.email,
            sentTo: message.sentBy,
          });
        }
      });

      // listening event wether sender is typing or not.
      socket.on("typing", (msg) => {
        const { isTyping, sentBy, sentTo } = msg;
        if (selectedChat.email === sentBy) {
          setSenderActivity({ typing: isTyping });
        }
      });

      // listening about new recorded audio messages.
      socket.on("RecordedAudioMessage", (message) => {
        const { _doc } = message;
        console.log("__________doc", _doc);
        if (selectedChat.email === _doc.sentBy) {
          setChatList((prevList) => [...prevList, _doc]);
        }

        // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.

        if (selectedChat !== null && selectedChat.email === _doc.sentBy) {
          console.log("emittingback", selectedChat);
          socket.emit("NewMsgReaded", {
            id: _doc.id,
            sentBy: profile.email,
            sentTo: _doc.sentBy,
          });
        }
      });

      socket.on("recordingAudio", (msg) => {
        const { sentBy, sentTo, isRecordingAudio } = msg;
        if (selectedChat.email === sentBy) {
          setSenderActivity({ recordingAudio: isRecordingAudio });
        }
      });

      socket.on("recordingVideo", (msg) => {
        const { sentBy, sentTo, isRecordingVideo } = msg;
        if (selectedChat.email === sentBy) {
          setSenderActivity({ recordingVideo: isRecordingVideo });
        }
      });

      // listening about simple audio messages.
      socket.on("AudioFileMessage", (msg) => {
        const { _doc } = msg;
        console.log("__________doc", _doc);
        console.log("simple audio message event received: ", msg);
        if (selectedChat.email === _doc.sentBy) {
          setChatList((prevList) => [...prevList, _doc]);
        }

        // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.

        if (selectedChat !== null && selectedChat.email === _doc.sentBy) {
          console.log("emittingback", selectedChat);
          socket.emit("NewMsgReaded", {
            id: _doc.id,
            sentBy: profile.email,
            sentTo: _doc.sentBy,
          });
        }
      });

      socket.on("RecordedVideoMessage", (msg) => {
        const { _doc } = msg;
        console.log("_______doc", _doc);
        console.log("recorded video message event recieved: ", msg);
        if (selectedChat.email === _doc.sentBy) {
          setChatList((prevList) => [...prevList, _doc]);
        }

        // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.

        if (selectedChat !== null && selectedChat.email === _doc.sentBy) {
          console.log("emittingback", selectedChat);
          socket.emit("NewMsgReaded", {
            id: _doc.id,
            sentBy: profile.email,
            sentTo: _doc.sentBy,
          });
        }
      });

      socket.on("SimpleImageMessage", (msg) => {
        const { _doc } = msg;
        console.log("Simple image message event trigger: ", msg);
        if (selectedChat.email === _doc.sentBy) {
          setChatList((prevList) => [...prevList, _doc]);
        }

        // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.

        if (selectedChat !== null && selectedChat.email === _doc.sentBy) {
          console.log("emittingback", selectedChat);
          socket.emit("NewMsgReaded", {
            id: _doc.id,
            sentBy: profile.email,
            sentTo: _doc.sentBy,
          });
        }
      });

      socket.on("SimpleVideoMessage", (msg) => {
        const { _doc } = msg;
        console.log("Simple video message event trigger: ", msg);
        if (selectedChat.email === _doc.sentBy) {
          setChatList((prevList) => [...prevList, _doc]);
        }

        // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.

        if (selectedChat !== null && selectedChat.email === _doc.sentBy) {
          console.log("emittingback", selectedChat);
          socket.emit("NewMsgReaded", {
            id: _doc.id,
            sentBy: profile.email,
            sentTo: _doc.sentBy,
          });
        }
      });

      socket.on("CapturedImageMessage", (msg) => {
        const { _doc } = msg;
        console.log("Simple video message event trigger: ", msg);
        if (selectedChat.email === _doc.sentBy) {
          setChatList((prevList) => [...prevList, _doc]);
        }

        // Emitting back en event NewMsgReaded to the server to tell the user i have seen your message.

        if (selectedChat !== null && selectedChat.email === _doc.sentBy) {
          console.log("emittingback", selectedChat);
          socket.emit("NewMsgReaded", {
            id: _doc.id,
            sentBy: profile.email,
            sentTo: _doc.sentBy,
          });
        }
      });

      // end of if..
    }

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
        {selectedChat === null ? (
          <AllChat />
        ) : (
          <>
            <SelectedChatContainer />
            {customizationSidebar && (
              <CustomizationSidebar isOpenInSmall={true} />
            )}
          </>
        )}
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
        {customizationSidebar && <CustomizationSidebar />}
      </BodyContainerLg>
    </MainContainer>
  );
}
