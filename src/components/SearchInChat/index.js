import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MainContainer, InnerContainer } from "./styledComponents";
import { useState, useContext } from "react";
import { ChatContext } from "../Context/ChatContext";

export default function SearchInChat() {
  const [searchInput, setSearchInput] = useState("");
  const [isChatSearchFocus, setIsChatSearchFocus] = useState(false);
  const { setSearchInChat } = useContext(ChatContext);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleCloseButtonClick = () => {
    setSearchInChat(false);
    setSearchInput("");
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
          value={searchInput}
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
