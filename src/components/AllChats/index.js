import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { FaSearch } from "react-icons/fa";
import Loader from "../Loader";
import Failure from "../Failure";
import ChatItem from "../ChatItem";

import {
  SearchContainer,
  SearchLensBtn,
  BackgroundImageContainer,
  DescriptionContainer,
  MainContainer,
  TopContainer,
} from "./styledComponents";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function AllChat() {
  const { setSelectedChat, profile } = useContext(ChatContext);
  const [chatList, setChatList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const getAllChats = async () => {
    try {
      setApiStatus(apiConstants.inProgress);
      const apiUrl = "http://localhost:5000/all-chats";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: profile.email }),
      };
      const response = await fetch(apiUrl, options);
      const fetchedData = await response.json();
      if (response.ok) {
        const chatList = fetchedData.allChats;
        setChatList(chatList);
        setApiStatus(apiConstants.success);
      } else {
        setApiStatus(apiConstants.failure);
      }
    } catch (err) {
      console.log("Error while fetching chatlist:", err);
      setApiStatus(apiConstants.failure);
    }
  };

  useEffect(() => {
    profile !== null && getAllChats();
  }, [profile]);

  const getFilteredListBySearch = () => {
    const filteredList = chatList.filter((eachChat) => {
      return eachChat.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    return filteredList;
  };

  const renderSearch = () => {
    return (
      <SearchContainer isSearchFocus={isSearchFocus}>
        <SearchLensBtn>
          <FaSearch />
        </SearchLensBtn>
        <input
          type="search"
          value={searchInput}
          placeholder="Search contact / chat"
          onFocus={() => setIsSearchFocus(true)}
          onBlur={() => setIsSearchFocus(false)}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </SearchContainer>
    );
  };

  const renderSuccessView = () => {
    return (
      <ul>
        {getFilteredListBySearch().map((eachChat) => (
          <ChatItem key={eachChat._id} eachChat={eachChat} />
        ))}
      </ul>
    );
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.inProgress:
        return <Loader height="40px" width="40px" color="white" />;
      default:
        return <Failure apiFuncToReq={getAllChats} />;
    }
  };

  return (
    <MainContainer>
      <TopContainer>
        <p>Chats</p>
        {renderSearch()}
      </TopContainer>
      {renderAppropriateView()}
    </MainContainer>
  );
}
