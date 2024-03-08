import { MainContainer } from "./styledComponents";
import SendTextMessages from "../SendTextMessages";
import ShareMedia from "../ShareMedia";

export default function SelectedChatFooter() {
  return (
    <MainContainer>
      <ShareMedia />
      <SendTextMessages />
    </MainContainer>
  );
}
