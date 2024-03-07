import { MainContainer, Header, Main, Footer } from "./styledComponents";
import SelectedChatHeader from "../SelectedChatHeader";
import SelectedChatMain from "../SelectedChatMain";
import SelectedChatFooter from "../SelectedChatFooter";

export default function SelectedChatContainer() {
  return (
    <MainContainer>
      <Header>
        <SelectedChatHeader />
      </Header>
      <Main>
        <SelectedChatMain />
      </Main>
      <Footer>
        <SelectedChatFooter />
      </Footer>
    </MainContainer>
  );
}
