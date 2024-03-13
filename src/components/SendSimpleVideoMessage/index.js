import {
  MainContainer,
  VideoWrapper,
  Video,
  SelectBtn,
  SendBtn,
  ButtonsContainer,
} from "./styledComponents";
import { useState, useRef, useContext } from "react";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { ChatContext } from "../Context/ChatContext";
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

export default function SendSimpleVideoMessage({ onClose }) {
  const [video, setVideo] = useState(null);
  const [base64Video, setBase64Video] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const toastOptions = {
    autoClose: 2000,
    style: {
      background: "#0f172a",
      color: "#fff",
    },
  };

  const { profile, setChatList, selectedChat, socket } =
    useContext(ChatContext);

  const videoInputRef = useRef(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith("video/")) {
        if (file.size <= 100 * 1024 * 1024) {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onloadend = () => {
            console.log("loading completed ");
            setVideo(reader.result);
            setBase64Video(reader.result.split(",")[1]);
          };
        } else {
          toast.error("File size should not exceed 100MB", toastOptions);
        }
      } else {
        toast.error("Please select video file only.", toastOptions);
      }
    }
  };

  const uploadVideo = async () => {
    if (!base64Video) {
      console.error("No base64 video in simple video sender");
      return;
    }

    const newMessage = {
      id: uuidv4(),
      type: messageTypeConstants.video,
      content: video,
      sentBy: profile.email,
      sentTo: selectedChat.email,
      timestamp: Date.now(),
      delieveryStatus: msgDelieveryStatusConstants.pending,
    };

    setChatList((prevList) => [...prevList, newMessage]);
    onClose();

    try {
      // Send the audio message to the server.
      const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/upload/simple-video-message`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video: base64Video }),
      };

      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const { savedVideoUrl } = fetchedData;
        console.log("savedVideoUrl", savedVideoUrl);
        setApiStatus(apiConstants.success);

        // Emit the  RecordedVideoMessage event to the server.
        socket.emit(
          "SimpleVideoMessage",
          { ...newMessage, content: savedVideoUrl },
          (ack) => {
            console.log("send record msg ack: ", ack);
            const { success, message, actualMsg } = ack;
            if (success) {
              // Update the chatData with the sent recordedVideoMessage message.
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
        setApiStatus(apiConstants.failure);
      }
    } catch (err) {
      setApiStatus(apiConstants.failure);
    }
  };

  return (
    <MainContainer className="App">
      <VideoWrapper>
        <Video src={video} controls />
      </VideoWrapper>
      <input
        ref={videoInputRef}
        style={{ display: "none" }}
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
      />
      <ButtonsContainer>
        <SelectBtn onClick={() => videoInputRef.current.click()}>
          Select
        </SelectBtn>
        {base64Video !== null && (
          <SendBtn onClick={uploadVideo}>
            <MdSend />
          </SendBtn>
        )}
      </ButtonsContainer>
      <ToastContainer />
    </MainContainer>
  );
}
