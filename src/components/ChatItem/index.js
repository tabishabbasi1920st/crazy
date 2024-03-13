import {
  MainContainer,
  DescriptionContainer,
  BackgroundImageContainer,
} from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";

export default function ChatItem({ eachChat }) {
  const { id, name } = eachChat;
  const imageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${eachChat.imageUrl}`;
  const { setSelectedChat } = useContext(ChatContext);

  return (
    <MainContainer key={id} onClick={() => setSelectedChat(eachChat)}>
      <BackgroundImageContainer
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <DescriptionContainer>
        <p>{name}</p>
      </DescriptionContainer>
    </MainContainer>
  );
}
