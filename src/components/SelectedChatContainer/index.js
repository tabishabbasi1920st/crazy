import { MainContainer, Header, Main, Footer } from "./styledComponents";
import SelectedChatHeader from "../SelectedChatHeader";
import SelectedChatMain from "../SelectedChatMain";
import SelectedChatFooter from "../SelectedChatFooter";
import SearchInChat from "../SearchInChat";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useEffect } from "react";

export default function SelectedChatContainer() {
  const { searchInChat } = useContext(ChatContext);

  return (
    <MainContainer>
      <Header>
        <SelectedChatHeader />
      </Header>
      {/* {searchInChat && <SearchInChat />} */}
      <Main>
        <SelectedChatMain />
      </Main>
      <Footer>
        <SelectedChatFooter />
      </Footer>
    </MainContainer>
  );
}
