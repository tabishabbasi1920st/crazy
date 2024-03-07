import { MainContainer } from "./styledComponents";
import LoggedInUserProfile from "../LoggedInUserProfile";

export default function Header() {
  return (
    <MainContainer>
      <LoggedInUserProfile />
    </MainContainer>
  );
}
