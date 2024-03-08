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
import { useContext } from "react";

export default function SelectedChatHeader() {
  const { selectedChat, setSelectedChat, setSearchInChat } =
    useContext(ChatContext);

  const { imageUrl, name } = selectedChat;
  const formattedImageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${imageUrl}`;

  const handleExitButtonClick = () => {
    setSelectedChat(null);
  };

  return (
    <MainContainer>
      <ExitButton onClick={handleExitButtonClick}>
        <FaArrowCircleLeft />
      </ExitButton>
      <UserInfoContainer>
        <Dp backgroundimage={formattedImageUrl}></Dp>
        <InfoContainer>
          <p className="name">{name}</p>
          <p className="active-status">Active</p>
        </InfoContainer>
      </UserInfoContainer>
      <OptionsContainer>
        <SearchChatBtn onClick={() => setSearchInChat(true)}>
          <FaSearch />
        </SearchChatBtn>
        <WindowButton>
          <FaRegWindowMaximize />
        </WindowButton>
      </OptionsContainer>
    </MainContainer>
  );
}
