import { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { ChatContext } from "../Context/ChatContext";
import TextMessageUi from "../TextMessageUi";
import Loader from "../Loader";
import Failure from "../Failure";
import RecordedAudioMessageUi from "../RecordedAudioMessageUi";
import SimpleAudioMessageUi from "../SimpleAudioMessageUi";
import RecordedVideoMessageUi from "../RecordedVideoMessageUi";
import SimpleImageMessageUi from "../SimpleImageMessageUi";
import SimpleVideoMessageUi from "../SimpleVideoMessageUi";
import CapturedImageMessageUi from "../CapturedImageMessageUi";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const messageTypeConstants = {
  text: "TEXT",
  audio: "AUDIO",
  capturedAudio: "CAPTURED_AUDIO",
  video: "VIDEO",
  capturedVideo: "CAPTURED_VIDEO",
  image: "IMAGE",
  capturedImage: "CAPTURED_IMAGE",
};

export default function SelectedChatMain() {
  const { chatList, profile, selectedChat, setChatList } =
    useContext(ChatContext);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const mainChatContainerRef = useRef(null);

  const gettingChats = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const apiUrl = `https://crazychat.onrender.com/my-chats?me=${profile.email}&to=${selectedChat.email}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("chatToken")}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const chatData = await response.json();
        setChatList(chatData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    if (profile !== null && selectedChat !== null) {
      gettingChats();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (mainChatContainerRef.current) {
      const scrollHeight = mainChatContainerRef.current.scrollHeight;
      mainChatContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatList]);

  const renderSuccessView = () => {
    return (
      <>
        {chatList.map((eachMsg) => {
          const { type } = eachMsg;
          switch (type) {
            case messageTypeConstants.text:
              return <TextMessageUi eachTextMessage={eachMsg} />;
            case messageTypeConstants.capturedAudio:
              return (
                <RecordedAudioMessageUi eachRecordedAudioMessage={eachMsg} />
              );
            case messageTypeConstants.audio:
              return (
                <SimpleAudioMessageUi eachRecordedAudioMessage={eachMsg} />
              );
            case messageTypeConstants.capturedVideo:
              return (
                <RecordedVideoMessageUi eachRecordedVideoMessage={eachMsg} />
              );
            case messageTypeConstants.image:
              return <SimpleImageMessageUi eachSimpleImageMessage={eachMsg} />;
            case messageTypeConstants.video:
              return <SimpleVideoMessageUi eachSimpleVideoMessage={eachMsg} />;
            case messageTypeConstants.capturedImage:
              return (
                <CapturedImageMessageUi eachCapturedImageMessage={eachMsg} />
              );
            default:
              return null;
          }
        })}
      </>
    );
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return null;
      case apiStatusConstants.inProgress:
        return <Loader height="40px" width="40px" color="white" />;
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return <Failure apiFuncToReq={gettingChats} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={mainChatContainerRef}
      style={{
        width: "100%;",
        // paddingRight: "10px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "100%",
        transition: "all  .3s ease-in-out",
        scrollbarWidth: "thin",
        scrollbarColor: "#070b15 transparent",
        // borderWidth: "2px",
        // borderColor: "red",
        // borderStyle: "solid",
      }}
    >
      {renderAppropriateView()}
    </div>
  );
}
