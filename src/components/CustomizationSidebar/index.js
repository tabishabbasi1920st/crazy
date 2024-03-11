import {
  MainContainer,
  BannerImgContainer,
  DpUserNameAndStatusContainer,
  DpContainer,
  DpBgContainer,
  Username,
  ActiveStatus,
  TilesContainer,
  MediaTile,
  BodyContainer,
} from "./styledComponents";
import { MdOutlinePermMedia } from "react-icons/md";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useState } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import MediaTabs from "../MediaTabs";

const BannerImageUrl = "https://connectme-html.themeyn.com/images/cover/1.jpg";

const tileOptions = [
  {
    id: "MEDIA",
    name: "Media",
  },
  {
    id: "OPTIONS",
    name: "Options",
  },
];

const tileIdConstants = {
  media: "MEDIA",
  options: "OPTIONS",
};

export default function CustomizationSidebar() {
  const { selectedChat, senderActivity, onlineUsersList } =
    useContext(ChatContext);
  const imageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${selectedChat.imageUrl}`;
  const [selectedTileId, setSelectedTileId] = useState(tileOptions[0].id);

  const isActive = onlineUsersList.includes(selectedChat.email);

  const getAppropSenderActivity = () => {
    let event = null;

    if (senderActivity.typing !== undefined) {
      event = senderActivity.typing ? "Typing" : "";
    } else if (senderActivity.recordingAudio !== undefined) {
      event = senderActivity.recordingAudio ? "Recording audio..." : "";
    } else if (senderActivity.recordingVideo !== undefined) {
      event = senderActivity.recordingVideo ? "Recording video..." : "";
    }

    return event;
  };

  const renderAppropriateContainersView = () => {
    switch (selectedTileId) {
      case tileIdConstants.media:
        return <MediaTabs />;
      case tileIdConstants.options:
        return null;
      default:
        return null;
    }
  };

  return (
    <MainContainer>
      <BannerImgContainer backgroundimage={BannerImageUrl} />
      <BodyContainer>
        <DpUserNameAndStatusContainer>
          <DpContainer>
            <DpBgContainer backgroundimage={imageUrl} />
          </DpContainer>
          <Username>KalaBassa</Username>
          <ActiveStatus>{isActive ? "Online" : "Offline"}</ActiveStatus>
          <ActiveStatus>{getAppropSenderActivity()}</ActiveStatus>
        </DpUserNameAndStatusContainer>
        <TilesContainer>
          {tileOptions.map((eachTile) => (
            <MediaTile
              onClick={() => setSelectedTileId(eachTile.id)}
              isselected={selectedTileId === eachTile.id}
              key={eachTile.id}
            >
              <MdOutlinePermMedia fontSize={25} />
              {eachTile.name}
            </MediaTile>
          ))}
        </TilesContainer>
      </BodyContainer>
      {renderAppropriateContainersView()}
    </MainContainer>
  );
}
