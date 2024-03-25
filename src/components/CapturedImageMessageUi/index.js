import {
  MainContainer,
  Image,
  ImageWrapper,
  Tag,
  TimeAndStatusCotainer,
} from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import Loader from "../Loader";

const msgDelieveryStatusConstants = {
  pending: "PENDING",
  sent: "SENT",
  seen: "SEEN",
};

export default function RecordedAudioMessageUi({ eachCapturedImageMessage }) {
  const { content, timestamp, sentBy, delieveryStatus } =
    eachCapturedImageMessage;

  const dt = new Date(timestamp);
  const hour = dt.getHours();
  const formattedHours = hour % 12 || 12; // convert to 12-hour format.
  const amOrPm = hour < 12 ? "AM" : "PM";
  const minutes = dt.getMinutes().toLocaleString();
  const formattedMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

  const { profile } = useContext(ChatContext);

  const imageUrl = content;

  const renderAppropritateIcon = () => {
    switch (delieveryStatus) {
      case msgDelieveryStatusConstants.sent:
        return <BsCheck />;
      case msgDelieveryStatusConstants.seen:
        return <BsCheckAll color="#fff" />;
      case msgDelieveryStatusConstants.pending:
        // return <BiErrorCircle color="red" />;
        return <Loader height="15px" width="15px" color="white" />;
    }
  };

  return (
    <MainContainer sentBy={sentBy} profile={profile}>
      <Tag>Captured</Tag>
      <ImageWrapper>
        <Image src={imageUrl} />
      </ImageWrapper>
      <TimeAndStatusCotainer>
        <span className="msg-time">{`${formattedHours}:${formattedMinutes} ${amOrPm} `}</span>
        <span className="status">
          {sentBy === profile.email && renderAppropritateIcon()}
        </span>
      </TimeAndStatusCotainer>
    </MainContainer>
  );
}
