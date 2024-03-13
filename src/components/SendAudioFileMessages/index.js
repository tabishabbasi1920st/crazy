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
import { ToastContainer, toast } from "react-toastify";

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

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function SendAudioFileMessages({ onClose }) {
  const [audio, setAudio] = useState(null);
  const [base64Audio, setBase64Audio] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const toastOptions = {
    autoClose: 2000,
    style: {
      background: "#0f172a",
      color: "#fff",
    },
  };

  const { setChatList, socket, selectedChat, profile, chatList } =
    useContext(ChatContext);

  const AudioFileInputRef = useRef(null);

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith("audio/")) {
        if (file.size <= 100 * 1024 * 1024) {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onloadend = () => {
            console.log("loading completed...");
            setAudio(reader.result);
            setBase64Audio(reader.result.split(",")[1]);
          };
        } else {
          toast.error("File size should not exceed 100MB");
        }
      } else {
        toast.error("Please select audio file only.", toastOptions);
      }
    }
  };

  const uploadAudio = async () => {
    if (!audio) {
      console.log("Not audio");
      return;
    }

    const newMessage = {
      id: uuidv4(),
      type: messageTypeConstants.audio,
      content: audio,
      sentBy: profile.email,
      sentTo: selectedChat.email,
      timestamp: Date.now(),
      delieveryStatus: msgDelieveryStatusConstants.pending,
    };

    setChatList((prevList) => {
      const newList = [...prevList, newMessage];
      return newList;
    });

    onClose();

    try {
      setApiStatus(apiConstants.inProgress);
      const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/upload/audio`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ audio: base64Audio }),
      };

      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const { savedAudioUrl } = fetchedData;
        console.log("savedAudioUrl", savedAudioUrl);
        setApiStatus(apiConstants.success);

        // // Emit the privateAudio event to the server.
        socket.emit(
          "AudioFileMessage",
          { ...newMessage, content: savedAudioUrl },
          (ack) => {
            console.log("send record msg ack: ", ack);
            const { success, message, actualMsg } = ack;
            if (success) {
              // Update the chatData with the sent audio message.
              console.log(success, message, actualMsg);
              setChatList((prevList) =>
                prevList.map((eachMsg) => {
                  if (eachMsg.id === actualMsg.id) {
                    return { ...eachMsg, ...actualMsg };
                  } else {
                    return eachMsg;
                  }
                })
              );
            } else {
              console.error(
                "Error while getting audio acknowledgment",
                success,
                message
              );
            }
          }
        );
      } else {
        console.log(
          "Response is not Ok while sending audio file to backend by api"
        );
        setApiStatus(apiConstants.failure);
      }
    } catch (err) {
      console.error(
        "Error while sending audio file to backend to make its url: ",
        err
      );
      setApiStatus(apiConstants.failure);
    }

    console.log(chatList);
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
      <ToastContainer />
    </MainContainer>
  );
}
