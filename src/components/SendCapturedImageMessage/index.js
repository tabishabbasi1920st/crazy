import React, { useRef, useState, useEffect, useContext } from "react";
import {
  MainContainer,
  ControllPanel,
  CameraAndImgContainer,
  SendBtn,
  CaptureBtn,
} from "./styledComponents";
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

export default function SendCapturedImageMessage({ onClose }) {
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [imgSize, setImgSize] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const { profile, selectedChat, socket, setChatList } =
    useContext(ChatContext);

  useEffect(() => {
    let stream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    // Cleanup function to stop the media stream when the component is unmounted
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const capture = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const capturedImageSrc = canvas.toDataURL("image/jpeg");
    const base64Data = capturedImageSrc.split(",")[1];
    setBase64Image(base64Data);
    setImageSrc(capturedImageSrc);

    // Calculate the size of the captured image in bytes
    const binaryData = atob(base64Data);
    const imageSizeInBytes = binaryData.length;

    // conver the size to mb
    const imageSizeInMB = imageSizeInBytes / (1024 * 1024).toFixed(2);
    setImgSize(imageSizeInMB);

    console.log(imageSrc, base64Data);
  };

  // const handleUpload = async () => {
  //   if (!imageSrc) {
  //     console.log("Not captured image");
  //     return;
  //   }

  //   const newMessage = {
  //     id: uuidv4(),
  //     type: messageTypeConstants.capturedImage,
  //     content: imageSrc,
  //     sentBy: profile.email,
  //     sentTo: selectedChat.email,
  //     timestamp: Date.now(),
  //     delieveryStatus: msgDelieveryStatusConstants.pending,
  //   };

  //   setChatList((prevList) => {
  //     const newList = [...prevList, newMessage];
  //     return newList;
  //   });

  //   onClose();

  //   try {
  //     setApiStatus(apiConstants.inProgress);
  //     const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/upload/captured-image`;
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ capturedImage: base64Image }),
  //     };

  //     const response = await fetch(apiUrl, options);
  //     if (response.ok) {
  //       const fetchedData = await response.json();
  //       const { savedCapturedImageUrl } = fetchedData;
  //       console.log("savedCapturedImageUrl", savedCapturedImageUrl);
  //       setApiStatus(apiConstants.success);

  //       // // Emit the privateAudio event to the server.
  //       socket.emit(
  //         "CapturedImageMessage",
  //         { ...newMessage, content: savedCapturedImageUrl },
  //         (ack) => {
  //           console.log("send record msg ack: ", ack);
  //           const { success, message, actualMsg } = ack;
  //           if (success) {
  //             // Update the chatData with the sent audio message.
  //             console.log(success, message, actualMsg);
  //             setChatList((prevList) =>
  //               prevList.map((eachMsg) => {
  //                 if (eachMsg.id === actualMsg.id) {
  //                   return { ...eachMsg, ...actualMsg };
  //                 } else {
  //                   return eachMsg;
  //                 }
  //               })
  //             );
  //           } else {
  //             console.error(
  //               "Error while getting audio acknowledgment",
  //               success,
  //               message
  //             );
  //           }
  //         }
  //       );
  //     } else {
  //       console.log(
  //         "Response is not Ok while sending audio file to backend by api"
  //       );
  //       setApiStatus(apiConstants.failure);
  //     }
  //   } catch (err) {
  //     console.error(
  //       "Error while sending audio file to backend to make its url: ",
  //       err
  //     );
  //     setApiStatus(apiConstants.failure);
  //   }
  // };

  // handle upload on cloudinary...

  const handleUpload = async () => {
    if (!imageSrc) {
      console.log("Not captured image");
      return;
    }

    const newMessage = {
      id: uuidv4(),
      type: messageTypeConstants.capturedImage,
      content: imageSrc,
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
      const data = new FormData();
      data.append("file", imageSrc);
      data.append("upload_preset", "captured_image_preset");

      setApiStatus(apiConstants.inProgress);
      const cloudName = "dctfbwk0m";
      const resourceType = "image";
      const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const options = {
        method: "POST",
        body: data,
      };

      const response = await fetch(apiUrl, options);

      if (response.ok) {
        const fetchedData = await response.json();
        const { secure_url } = fetchedData;
        console.log("savedCapturedImageUrl", secure_url);
        setApiStatus(apiConstants.success);

        // // Emit the privateAudio event to the server.
        socket.emit(
          "CapturedImageMessage",
          { ...newMessage, content: secure_url },
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
  };

  return (
    <MainContainer>
      <CameraAndImgContainer>
        <video className="video" ref={videoRef} autoPlay playsInline />

        {imgSize > 0 && <img src={imageSrc} alt="Captured" />}
      </CameraAndImgContainer>
      <ControllPanel>
        <CaptureBtn onClick={capture}>Capture</CaptureBtn>
        {imgSize > 0 && (
          <SendBtn onClick={handleUpload}>
            <MdSend />
          </SendBtn>
        )}
      </ControllPanel>
    </MainContainer>
  );
}
