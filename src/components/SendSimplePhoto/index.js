import {
  MainContainer,
  ChooseImageBtn,
  SendImageBtn,
  ButtonsContainer,
  ImageContainer,
} from "./styledComponents";
import { useState, useRef, useEffect, useContext } from "react";
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

export default function SendSimplePhoto({ onClose }) {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const { profile, selectedChat, setChatList, socket } =
    useContext(ChatContext);

  useEffect(() => {
    return () => {
      setImage(null);
      setBase64Image(null);
    };
  }, []);

  const inputRef = useRef(null);

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // it is used to read files asyncronously
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log(`File loaded completely`);
        setImage(reader.result);
        setBase64Image(reader.result.split(",")[1]);
      };
    }
  };

  const handleSend = async () => {
    if (!image) {
      console.log("Not image");
      return;
    }

    const newMessage = {
      id: uuidv4(),
      type: messageTypeConstants.image,
      content: image,
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
      const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/upload/simple-image`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      };

      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        const { savedImageUrl } = fetchedData;
        console.log("savedImageUrl", savedImageUrl);
        setApiStatus(apiConstants.success);

        // // Emit the privateAudio event to the server.
        socket.emit(
          "SimpleImageMessage",
          { ...newMessage, content: savedImageUrl },
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
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={handleImageInputChange}
      />
      <ImageContainer backgroundimage={image}></ImageContainer>
      <ButtonsContainer>
        <ChooseImageBtn onClick={() => inputRef.current.click()}>
          Select
        </ChooseImageBtn>

        {base64Image !== null && (
          <SendImageBtn onClick={handleSend}>
            <MdSend />
          </SendImageBtn>
        )}
      </ButtonsContainer>
    </MainContainer>
  );
}
