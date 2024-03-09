import {
  MainContainer,
  CloseButton,
  StatusContainer,
  ButtonContainer,
  SendButton,
  StartButton,
  RecordingIcon,
  AudioPlayerContainer,
} from "./styledComponents";

import React, { useEffect, useRef, useState, useContext } from "react";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { ChatContext } from "../Context/ChatContext";

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

export default function SendRecordedAudioMessage({ onClose }) {
  // State variables to manage recording and audio playback
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [base64Audio, setBase64Audio] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const { profile, selectedChat, socket, setChatList } =
    useContext(ChatContext);

  // Ref to interact with the <audio> element
  const audioRef = useRef();

  // useEffect to initialize MediaRecorder and access the user's microphone
  useEffect(() => {
    const initializeMediaRecorder = async () => {
      try {
        // Request access to the user's microphone
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Create a MediaRecorder instance with the microphone stream
        const recorder = new MediaRecorder(stream);

        // Event listener for the availability of recorded data
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            // Add the recorded data chunk to the array
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };

        // Event listener for when recording is stopped
        recorder.onstop = () => {
          // Update the recording state
          setIsRecording(false);
        };

        // Set the MediaRecorder instance in the state
        setMediaRecorder(recorder);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    // Initialize MediaRecorder when the component mounts
    initializeMediaRecorder();
  }, []);

  // useEffect to start/stop MediaRecorder based on the recording state
  useEffect(() => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.start();
    } else if (!isRecording && mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [isRecording, mediaRecorder]);

  // useEffect to process recorded data after recording stops
  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      // Create a Blob from the recorded chunks
      const blob = new Blob(recordedChunks, { type: "audio/wav" });

      // Create a URL for the Blob and set it as the audio URL
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      blobToBase64(blob);
    }
  }, [isRecording, recordedChunks]);

  // Function to start recording
  const startRecording = () => {
    socket.emit("recordingAudio", {
      sentBy: profile.email,
      sentTo: selectedChat.email,
      isRecordingAudio: true,
    });
    // Clear the recorded chunks array
    setRecordedChunks([]);
    // Update the recording state
    setIsRecording(true);
  };

  // Function to stop recording
  const stopRecording = () => {
    socket.emit("recordingAudio", {
      sentBy: profile.email,
      sentTo: selectedChat.email,
      isRecordingAudio: false,
    });
    // Update the recording state
    setIsRecording(false);
  };

  // Helper function to convert Blob to base64
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      setBase64Audio(reader.result.split(",")[1]);
    };
  };

  const handleAudioSent = async () => {
    try {
      if (recordedChunks.length === 0) {
        console.error("No recorded data available");
        return;
      }

      const newMessage = {
        id: uuidv4(),
        type: messageTypeConstants.capturedAudio,
        content: audioURL,
        sentBy: profile.email,
        sentTo: selectedChat.email,
        timestamp: Date.now(),
        delieveryStatus: msgDelieveryStatusConstants.pending,
      };

      setChatList((prevList) => [...prevList, newMessage]);

      try {
        // Send the audio message to the server
        setApiStatus(apiConstants.inProgress);
        const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/upload/recorded-audio-message`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recordedAudio: base64Audio }),
        };

        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          const { savedAudioUrl } = fetchedData;
          console.log("savedAudioUrl", savedAudioUrl);

          // Emit the privateAudio event to the server
          socket.emit(
            "RecordedAudioMessage",
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

          setApiStatus(apiConstants.success);
        } else {
          setApiStatus(apiConstants.failure);
        }
      } catch (err) {
        setApiStatus(apiConstants.failure);
      }

      // Reset the audio recording state
      setRecordedChunks([]);
      setAudioURL("");
      onClose();
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  return (
    <MainContainer>
      {/* <CloseButton onClick={onClose}>&times;</CloseButton> */}
      {/* Display recording status */}
      <StatusContainer style={{ fontSize: "2rem" }}>
        {isRecording ? (
          <p>
            <RecordingIcon />
            Recording . . .
          </p>
        ) : (
          <p>Ready to record</p>
        )}
      </StatusContainer>

      {/* Button to start/stop recording */}
      <ButtonContainer>
        <StartButton
          title="Start Recording"
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop" : "Start"}
        </StartButton>
        {recordedChunks.length > 0 && (
          <SendButton
            onClick={() => {
              handleAudioSent();
            }}
          >
            <MdSend />
          </SendButton>
        )}
      </ButtonContainer>

      {/* Display audio player if there is an audio URL */}
      <AudioPlayerContainer>
        {audioURL && <audio ref={audioRef} src={audioURL} controls />}
      </AudioPlayerContainer>
    </MainContainer>
  );
}
