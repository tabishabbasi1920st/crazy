import { ChatContext } from "../Context/ChatContext";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function SelectedChatHeader() {
  const { chatList, profile, selectedChat, setChatList } =
    useContext(ChatContext);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    const gettingChats = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      const apiUrl = `http://localhost:5000/my-chats?me=${profile.email}&to=${selectedChat.email}`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("chatToken")}`,
        },
      };

      try {
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const chatData = await response.json();
          console.log("main>>>>>>>", chatData);
          setChatList(chatData);
          setApiStatus(apiStatusConstants.success);
        } else {
          setApiStatus(apiStatusConstants.failure);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setApiStatus(apiStatusConstants.failure);
      }
    };

    if (profile !== null && selectedChat !== null) {
      gettingChats();
    }

    return () => {};
  }, []);



  return (
    <>
      {chatList.map((eachMsg) => (
        <>
          <p>{eachMsg.content}:</p>
          <p>{eachMsg.delieveryStatus}</p>
        </>
      ))}
    </>
  );
}
