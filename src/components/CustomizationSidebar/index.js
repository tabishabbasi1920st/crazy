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
    icon: <MdOutlinePermMedia fontSize={25} />,
  },
  {
    id: "OPTIONS",
    name: "Options",
    icon: <IoOptionsOutline fontSize={25} />,
  },
];

const tileIdConstants = {
  media: "MEDIA",
  options: "OPTIONS",
};

export default function CustomizationSidebar({ isOpenInSmall }) {
  const { selectedChat, senderActivity, onlineUsersList } =
    useContext(ChatContext);
  const imageUrl = selectedChat.imageUrl;
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
    <MainContainer isOpenInSmall={isOpenInSmall}>
      <BannerImgContainer backgroundimage={BannerImageUrl} />
      <BodyContainer>
        <DpUserNameAndStatusContainer>
          <DpContainer>
            <DpBgContainer backgroundimage={imageUrl} />
          </DpContainer>
          <Username>{selectedChat.name}</Username>
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
              {eachTile.icon}
              {eachTile.name}
            </MediaTile>
          ))}
        </TilesContainer>
      </BodyContainer>
      {renderAppropriateContainersView()}
    </MainContainer>
  );
}
