import { MainContainer, BodyContainer } from "./styledComponents";
import Header from "../Header";
import AllChat from "../AllChats";

export default function Home() {
  return (
    <MainContainer>
      <Header />
      <BodyContainer>
        <AllChat />
      </BodyContainer>
    </MainContainer>
  );
}
