import { MainContainer } from "./styledComponents";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";

const messageTypeConstants = {
  text: "TEXT",
  audio: "AUDIO",
  capturedAudio: "CAPTURED_AUDIO",
  video: "VIDEO",
  capturedVideo: "CAPTURED_VIDEO",
  image: "IMAGE",
  capturedImage: "CAPTURED_IMAGE",
};

export default function SendTextMessages() {
  const [msgInput, setMsgInput] = useState("");
  const { profile, selectedChat, socket } = useContext(ChatContext);

  const sender = profile.email;
  const receiver = selectedChat.email;

  const handleMsgInputChange = (e) => {
    setMsgInput(e.target.value);
  };

  const handleMessageSend = () => {
    setMsgInput("");

    const newTextMessage = {
      type: messageTypeConstants.text,
      content: msgInput,
      sentBy: sender,
      sentTo: receiver,
      timestamp: Date.now(),
    };

    socket.emit("TextMessage", newTextMessage, (ack) => {
      console.log("server ack", ack);
    });
  };

  return (
    <MainContainer>
      <input type="text" value={msgInput} onChange={handleMsgInputChange} />
      <button disabled={msgInput === ""} onClick={handleMessageSend}>
        <IoSend />
      </button>
    </MainContainer>
  );
}
