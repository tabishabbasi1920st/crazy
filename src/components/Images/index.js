import { MainContainer, ImageItem } from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader";
import Cookies from "js-cookie";
import CustomizationSidebarImageUi from "../CustomizationSidebarImagesUi";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function Images() {
  const [imageList, setImageList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const { profile, selectedChat } = useContext(ChatContext);

  useEffect(() => {
    const getImages = async () => {
      try {
        setApiStatus(apiConstants.inProgress);
        const apiUrl = `http://localhost:${process.env.REACT_APP_PORT}/all-image-messages?me=${profile.email}&to=${selectedChat.email}`;
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
          setImageList(fetchedData);
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

    getImages();
  }, [selectedChat, profile]);

  const renderSuccessView = () => {
    return (
      <>
        {imageList.map((eachImage) => (
          <CustomizationSidebarImageUi eachImage={eachImage} />
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

  const renderAppropView = () => {
    switch (apiStatus) {
      case apiConstants.initial:
        return null;
      case apiConstants.inProgress:
        return <Loader />;
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return <MainContainer>{renderAppropView()}</MainContainer>;
}
