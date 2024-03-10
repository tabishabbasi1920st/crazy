import {
  MainContainer,
  ControllPanel,
  SendBtn,
  StartOrStopBtn,
  RecordingIcon,
} from "./styledComponents";
import { useEffect, useRef, useState, useContext } from "react";
import { MdSend } from "react-icons/md";
import { ChatContext } from "../Context/ChatContext";
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

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function CameraRecording({ onClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [base64Video, setBase64Video] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const videoRef = useRef(null);
  const playbackRef = useRef(null);

  const { profile, selectedChat, setChatList, socket } =
    useContext(ChatContext);

  useEffect(() => {
    let stream;
    try {
      const initializeVideoRecorder = async () => {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;

        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setRecordedChunks((prevData) => [...prevData, e.data]);
          }
        };

        recorder.onstop = () => {
          setIsRecording(false);
        };

        setMediaRecorder(recorder);
      };

      initializeVideoRecorder();
    } catch (error) {
      console.error("Error while accessing permission to record video.");
    }

    // Cleanup function to stop the media stream when the component is unmounted
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.start();
    } else if (!isRecording && mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [isRecording, mediaRecorder]);

  const blobToBase64 = (blob) => {
    const reader = new FileReader(blob);
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      setBase64Video(reader.result.split(",")[1]);
    };
  };

  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      blobToBase64(blob);

      // Automatically start playback when recording is complete
      playbackRef.current.src = url;
    }
  }, [isRecording, recordedChunks]);

  const startRecording = () => {
    setVideoUrl(null);
    setRecordedChunks([]);
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const uploadVideo = async () => {
    if (recordedChunks.length === 0) {
      console.error("No recorded data available");
      return;
    }
    try {
      const newMessage = {
        id: uuidv4(),
        type: messageTypeConstants.capturedVideo,
        content: videoUrl,
        sentBy: profile.email,
        sentTo: selectedChat.email,
        timestamp: Date.now(),
        delieveryStatus: msgDelieveryStatusConstants.pending,
      };

      setChatList((prevList) => [...prevList, newMessage]);

      try {
        // Send the audio message to the server.
        const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/upload/recorded-video-message`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recordedVideo: base64Video }),
        };

        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          const { savedVideoUrl } = fetchedData;
          console.log("savedVideoUrl", savedVideoUrl);
          setApiStatus(apiConstants.success);

          // Emit the  RecordedVideoMessage event to the server.
          socket.emit(
            "RecordedVideoMessage",
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
    } catch (err) {
      console.error("Error sending recorded video:", err);
    }
  };

  return (
    <MainContainer>
      <video
        className="video"
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        playsInline
        muted
        style={{ display: videoUrl ? "none" : "block" }}
      />
      <video
        className="playback-video"
        ref={playbackRef}
        width="640"
        height="480"
        playsInline
        controls
        style={{ display: videoUrl ? "block" : "none" }}
      />

      <ControllPanel>
        <StartOrStopBtn onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop" : "Start"}
          {isRecording && <RecordingIcon />}
        </StartOrStopBtn>

        {base64Video !== null && (
          <SendBtn
            onClick={() => {
              uploadVideo();
              onClose();
            }}
          >
            <MdSend />
          </SendBtn>
        )}
      </ControllPanel>
    </MainContainer>
  );
}
