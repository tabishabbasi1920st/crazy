import { MainContainer, BodyContainer } from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
import Header from "../Header";
import AllChat from "../AllChats";
import SelectedChatContainer from "../SelectedChatConatainer";

export default function Home() {
  const { selectedChat } = useContext(ChatContext);

  return (
    <MainContainer>
      <Header />
      <BodyContainer>
        {selectedChat === null ? <AllChat /> : <SelectedChatContainer />}
      </BodyContainer>
    </MainContainer>
  );
}
