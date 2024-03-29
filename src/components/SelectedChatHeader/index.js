import {
  MainContainer,
  ExitButton,
  UserInfoContainer,
  Dp,
  InfoContainer,
  SearchChatBtn,
  OptionsContainer,
  WindowButton,
} from "./styledComponents";
import {
  FaArrowCircleLeft,
  FaSearch,
  FaRegWindowMaximize,
} from "react-icons/fa";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useEffect, useState } from "react";

export default function SelectedChatHeader() {
  const {
    selectedChat,
    setSelectedChat,
    setSearchInChat,
    onlineUsersList,
    senderActivity,
    customizationSidebar,
    setCustomizationSidebar,
  } = useContext(ChatContext);

  const { imageUrl, name } = selectedChat;

  const handleExitButtonClick = () => {
    setSelectedChat(null);
  };

  const isActive = onlineUsersList.includes(selectedChat.email);

  const getAppropSenderActivity = () => {
    let event = null;

    if (senderActivity.typing !== undefined) {
      event = senderActivity.typing ? "Typing" : "";
    } else if (senderActivity.recordingAudio !== undefined) {
      event = senderActivity.recordingAudio ? "Recording audio..." : "";
    } else if (senderActivity.recordingVideo !== undefined) {
      event = senderActivity.recordingVideo ? "Recording video..." : "";
    }

    return event;
  };

  const handleWindowButtonClick = () => {
    setCustomizationSidebar((prevState) => !prevState);
  };

  return (
    <MainContainer>
      <ExitButton onClick={handleExitButtonClick}>
        <FaArrowCircleLeft />
      </ExitButton>
      <UserInfoContainer>
        <Dp backgroundimage={imageUrl}></Dp>
        <InfoContainer>
          <p className="name">{name}</p>
          <p className="active-status">{isActive ? "Online" : "Offline"}</p>
          <p className="active-status">{getAppropSenderActivity()}</p>
        </InfoContainer>
      </UserInfoContainer>
      <OptionsContainer>
        <SearchChatBtn onClick={() => setSearchInChat(true)}>
          <FaSearch />
        </SearchChatBtn>
        <WindowButton
          isOpen={customizationSidebar}
          onClick={handleWindowButtonClick}
        >
          <FaRegWindowMaximize />
        </WindowButton>
      </OptionsContainer>
    </MainContainer>
  );
}
