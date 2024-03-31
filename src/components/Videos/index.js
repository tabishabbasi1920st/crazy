import { MainContainer, EmptyListContainer } from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader";
import Cookies from "js-cookie";
import CustomizationSidebarVideoUi from "../CustomizationSidebarVideoUi";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function Images() {
  const [videoList, setVideoList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const { profile, selectedChat } = useContext(ChatContext);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setApiStatus(apiConstants.inProgress);
        const me = profile.email;
        const to = selectedChat.email;
        const apiUrl = `https://crazychat.onrender.com/all-video-messages?me=${me}&to=${to}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("chatToken")}`,
          },
        };

        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          setVideoList(fetchedData);
          setApiStatus(apiConstants.success);
        }
      } catch (err) {
        console.error(
          "Erro while fetching images in customization sidebar.",
          err
        );
        setApiStatus(apiConstants.failure);
      }
    };

    getVideos();
  }, [selectedChat, profile]);

  const renderSuccessView = () => {
    return (
      <>
        {videoList.map((eachVideo) => (
          <CustomizationSidebarVideoUi eachVideo={eachVideo} />
        ))}
      </>
    );
  };

  const renderFailureView = () => {
    return (
      <>
        <p>Failure view</p>
      </>
    );
  };

  const renderEmptyListView = () => {
    return (
      <EmptyListContainer style={{ color: "#fff" }}>
        No Videos
      </EmptyListContainer>
    );
  };

  const renderAppropView = () => {
    switch (apiStatus) {
      case apiConstants.initial:
        return null;
      case apiConstants.inProgress:
        return <Loader height="25px" width="25px" color="white" />;
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.success && videoList.length === 0:
        return renderEmptyListView();
      case apiConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return <MainContainer>{renderAppropView()}</MainContainer>;
}
