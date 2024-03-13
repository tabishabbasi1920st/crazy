import {
  MainContainer,
  DescriptionContainer,
  BackgroundImageContainer,
} from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";

export default function ChatItem({ eachChat }) {
  const { _id, name } = eachChat;
  console.log(eachChat);
  const imageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${eachChat.imageUrl}`;
  const { setSelectedChat, selectedChat } = useContext(ChatContext);

  return (
    <MainContainer
      isSelected={
        selectedChat !== null && selectedChat.email === eachChat.email
      }
      key={_id}
      onClick={() => setSelectedChat(eachChat)}
    >
      <BackgroundImageContainer
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <DescriptionContainer>
        <p>{name}</p>
      </DescriptionContainer>
    </MainContainer>
  );
}
