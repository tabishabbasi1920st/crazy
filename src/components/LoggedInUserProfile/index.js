import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { ChatContext } from "../Context/ChatContext";
import Loader from "../Loader";

import {
  FailureContainer,
  ImageContainer,
  MainConatainer,
} from "./styledComponents";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function Profile() {
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const { profile, setProfile } = useContext(ChatContext);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setApiStatus(apiConstants.inProgress);
        const apiurl = "http://localhost:5000/user-info";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("chatToken")}`,
          },
        };

        const response = await fetch(apiurl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          const profile = fetchedData.message[0];
          const updatedProfile = {
            id: profile._id,
            name: profile.name,
            email: profile.email,
            password: profile.password,
            imageUrl: `http://localhost:${process.env.REACT_APP_PORT}/${profile.imageUrl}`,
          };

          setProfile(updatedProfile);
          setApiStatus(apiConstants.success);
        } else {
          setApiStatus(apiConstants.failure);
        }
      } catch (err) {
        console.log("Error while fetching user profile info:", err);
        setApiStatus(apiConstants.failure);
      }
    };
    getUserProfile();
  }, []);

  const renderFailureView = () => {
    return (
      <FailureContainer>
        <p>Error</p>
      </FailureContainer>
    );
  };

  const renderSuccessView = () => {
    return <ImageContainer backgroundimage={profile.imageUrl}></ImageContainer>;
  };

  const renderAppropriateView = () => {
    switch (apiStatus) {
      case apiConstants.success:
        return renderSuccessView();
      case apiConstants.inProgress:
        return <Loader height="25px" width="25px" color="white" />;
      default:
        return renderFailureView();
    }
  };

  return <MainConatainer>{renderAppropriateView()}</MainConatainer>;
}
