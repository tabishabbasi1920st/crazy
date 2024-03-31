import { MainContainer } from "./styledComponents";
import LoggedInUserProfile from "../LoggedInUserProfile";
import Logout from "../Logout";

export default function Header() {
  return (
    <MainContainer>
      <LoggedInUserProfile />
      <Logout />
    </MainContainer>
  );
}
