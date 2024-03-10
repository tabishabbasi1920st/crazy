import {
  MainContainer,
  Video,
  VideoWrapper,
  Tag,
  TimeAndStatusCotainer,
} from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import Loader from "../Loader";

const msgDelieveryStatusConstants = {
  pending: "PENDING",
  sent: "SENT",
  seen: "SEEN",
};

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const messageTypeConstants = {
  text: "TEXT",
  audio: "AUDIO",
  capturedAudio: "CAPTURED_AUDIO",
  video: "VIDEO",
  capturedVideo: "CAPTURED_VIDEO",
  image: "IMAGE",
  capturedImage: "CAPTURED_IMAGE",
};

export default function RecordedAudioMessageUi({ eachRecordedVideoMessage }) {
  const { content, timestamp, sentBy, delieveryStatus } =
    eachRecordedVideoMessage;

  const dt = new Date(timestamp);
  const hour = dt.getHours();
  const formattedHours = hour % 12 || 12; // convert to 12-hour format.
  const amOrPm = hour < 12 ? "AM" : "PM";
  const minutes = dt.getMinutes().toLocaleString();
  const formattedMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

  const { profile } = useContext(ChatContext);

  let videoUrl = null;
  if (content.startsWith("blob")) {
    videoUrl = content;
  } else {
    videoUrl = `http://localhost:${process.env.REACT_APP_PORT}/${content}`;
  }

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
      <Tag>
        <i>Recorded</i>
      </Tag>

      <VideoWrapper>
        <Video controls src={videoUrl} />
      </VideoWrapper>
      <TimeAndStatusCotainer>
        <span className="msg-time">{`${formattedHours}:${formattedMinutes} ${amOrPm} `}</span>
        <span className="status">
          {sentBy === profile.email && renderAppropritateIcon()}
        </span>
      </TimeAndStatusCotainer>
    </MainContainer>
  );
}
