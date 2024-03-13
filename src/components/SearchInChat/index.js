import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MainContainer, InnerContainer } from "./styledComponents";
import { useState, useContext } from "react";
import { ChatContext } from "../Context/ChatContext";

export default function SearchInChat() {
  const [isChatSearchFocus, setIsChatSearchFocus] = useState(false);
  const { setSearchInChat, searchInChatTerm, setSearchInChatTerm } =
    useContext(ChatContext);

  const handleSearchInputChange = (e) => {
    setSearchInChatTerm(e.target.value);
  };

  const handleCloseButtonClick = () => {
    setSearchInChat(false);
    setSearchInChatTerm("");
  };

  return (
    <MainContainer>
      <InnerContainer isChatSearchFocus={isChatSearchFocus}>
        <button className="lens-btn">
          <FaSearch />
        </button>
        <input
          type="search"
          placeholder="Search in this chat"
          value={searchInChatTerm}
          onFocus={() => setIsChatSearchFocus(true)}
          onBlur={() => setIsChatSearchFocus(false)}
          onChange={handleSearchInputChange}
        />
      </InnerContainer>

      <button
        onClick={handleCloseButtonClick}
        className="arrow-btn"
        style={{ backgroundColor: "#203047" }}
      >
        <IoMdClose />
      </button>
    </MainContainer>
  );
}
