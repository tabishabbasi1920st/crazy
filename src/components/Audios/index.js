import { MainContainer, EmptyListContainer } from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader";
import Cookies from "js-cookie";
import CustomizationSidebarAudioUi from "../CustomizationSidebarAudioUi";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function Images() {
  const [audioList, setAudioList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const { profile, selectedChat } = useContext(ChatContext);

  useEffect(() => {
    const getAudios = async () => {
      try {
        setApiStatus(apiConstants.inProgress);
        const me = profile.email;
        const to = selectedChat.email;
        const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/all-audio-messages?me=${me}&to=${to}`;
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
          setAudioList(fetchedData);
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

    getAudios();
  }, [selectedChat, profile]);

  const renderSuccessView = () => {
    return (
      <>
        {audioList.map((eachAudio) => (
          <CustomizationSidebarAudioUi eachAudio={eachAudio} />
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
      <EmptyListContainer>
        <p>No Audio</p>
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
      case apiConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      {renderAppropView()}
      {audioList.length <= 0 && renderEmptyListView()}
    </MainContainer>
  );
}
