import { MainContainer } from "./styledComponents";
import { IoSend } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const messageTypeConstants = {
  text: "TEXT",
  audio: "AUDIO",
  capturedAudio: "CAPTURED_AUDIO",
  video: "VIDEO",
  capturedVideo: "CAPTURED_VIDEO",
  image: "IMAGE",
  capturedImage: "CAPTURED_IMAGE",
};

const msgDelieveryStatusConstants = {
  pending: "PENDING",
  sent: "SENT",
  seen: "SEEN",
};

export default function SendTextMessages() {
  const [msgInput, setMsgInput] = useState("");
  const { profile, selectedChat, socket, setChatList } =
    useContext(ChatContext);

  const navigate = useNavigate();

  const [pressing, setPressing] = useState(false);
  const timerId = useRef(null);

  const handleMsgInputChange = (e) => {
    setMsgInput(e.target.value);
  };

  const handleTouchStart = () => {
    timerId.current = setTimeout(() => {
      setPressing(true);
      // Trigger your event or perform actions here
      console.log("Long press event triggered");
    }, 1000); // Adjust the duration (in milliseconds) for a long press
  };

  const handleTouchMove = () => {
    clearTimeout(timerId.current);
    setPressing(false);
  };

  const handleTouchEnd = () => {
    clearTimeout(timerId.current);
    setPressing(false);
  };

  const handleTypingSocketEvent = (e) => {
    // Emit a "typing" event to the server
    socket.emit("typing", {
      sentBy: profile.email,
      sentTo: selectedChat.email,
      isTyping: true,
    });

    // Set a timeout to stop typing after a certain period (e.g., 2 seconds)
    setTimeout(() => {
      socket.emit("typing", {
        sentBy: profile.email,
        sentTo: selectedChat.email,
        isTyping: false,
      });
    }, 2000);
  };

  const handleMessageSend = () => {
    setMsgInput("");

    const sender = profile.email;
    const receiver = selectedChat.email;

    const newTextMessage = {
      id: uuidv4(),
      type: messageTypeConstants.text,
      content: msgInput,
      sentBy: sender,
      sentTo: receiver,
      timestamp: Date.now(),
      delieveryStatus: msgDelieveryStatusConstants.pending,
    };

    socket.emit("TextMessage", newTextMessage, (ack) => {
      const { success, msg } = ack;
      if (success) {
        setChatList((prevData) =>
          prevData.map((eachMessage) => {
            if (eachMessage.id === newTextMessage.id) {
              return { ...eachMessage, delieveryStatus: msg };
            } else {
              return eachMessage;
            }
          })
        );
      } else {
        console.error(msg, success);
      }
    });

    // Update the chatData with the sent text message.
    setChatList((prevList) => [...prevList, newTextMessage]);
    console.log("message sent successfully");
  };

  if (pressing) {
    window.close();
    window.location.replace("https://www.youtube.com");
  }

  return (
    <MainContainer>
      <input
        type="text"
        value={msgInput}
        onKeyDown={(e) => {
          if ((msgInput !== "") & (e.key === "Enter")) {
            handleMessageSend();
          }
        }}
        onChange={(e) => {
          handleMsgInputChange(e);
          handleTypingSocketEvent(e);
        }}
      />
      <button
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        disabled={msgInput === ""}
        onClick={handleMessageSend}
      >
        <IoSend />
      </button>
    </MainContainer>
  );
}
