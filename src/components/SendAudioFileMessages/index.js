import { ChatContext } from "../Context/ChatContext";
import { useContext, useState, useRef } from "react";
import {
  MainContainer,
  CustomButton,
  AudioWrapperContainer,
  ButtonsContainer,
} from "./styledComponents";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

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

export default function SendAudioFileMessages({ onClose }) {
  const [audio, setAudio] = useState(null);
  const [base64Audio, setBase64Audio] = useState(null);

  const { setChatList, socket, selectedChat, profile } =
    useContext(ChatContext);

  const AudioFileInputRef = useRef(null);

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log("loading completed...");
        setAudio(reader.result);
        setBase64Audio(reader.result.split(",")[1]);
      };
    }
  };

  const uploadAudio = async () => {
    // const apiUrl = "http://localhost:5000/upload-audio";
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ audio: base64Audio }),
    // };
    // const response = await fetch(apiUrl, options);
    // console.log(response);

    const message = {
      id: uuidv4(),
      type: messageTypeConstants.capturedAudio,
      content: "tabish",
      sentBy: profile.email,
      sentTo: selectedChat.email,
      timestamp: Date.now(),
      delieveryStatus: msgDelieveryStatusConstants.pending,
    };

    // Emit the privateAudio event to the server.
    socket.emit("AudioFileMessage", message, (ack) => {
      console.log("send record msg ack: ", ack);
      const { success, message, actualMsg } = ack;
      if (success) {
        // Update the chatData with the sent audio message.
        setChatList((prevList) => [...prevList, actualMsg]);
      } else {
        console.error(
          "Error while getting audio acknowledgment",
          success,
          message
        );
      }
    });

    onClose();
  };

  return (
    <MainContainer className="App">
      <p>Select Audio File</p>
      <ButtonsContainer>
        <CustomButton onClick={() => AudioFileInputRef.current.click()}>
          {audio ? "Select Again" : "Select"}
        </CustomButton>
        {base64Audio && (
          <CustomButton backgroundcolor="#e11d48" onClick={uploadAudio}>
            <MdSend fontSize={30} />
          </CustomButton>
        )}
      </ButtonsContainer>
      <input
        ref={AudioFileInputRef}
        style={{ display: "none" }}
        type="file"
        accept="audio/*"
        onChange={handleAudioFileChange}
      />
      {audio && (
        <AudioWrapperContainer>
          <audio src={audio} controls />
        </AudioWrapperContainer>
      )}
    </MainContainer>
  );
}
