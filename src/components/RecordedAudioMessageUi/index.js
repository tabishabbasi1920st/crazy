import {
  MainContainer,
  Audio,
  AudioWrapper,
  Tag,
  TimeAndStatusCotainer,
} from "./styledComponents";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";

const msgDelieveryStatusConstants = {
  pending: "PENDING",
  sent: "SENT",
  seen: "SEEN",
};

export default function RecordedAudioMessageUi({ eachRecordedAudioMessage }) {
  const { content, timestamp, sentBy, delieveryStatus } =
    eachRecordedAudioMessage;

  const dt = new Date(timestamp);
  const hour = dt.getHours();
  const formattedHours = hour % 12 || 12; // convert to 12-hour format.
  const amOrPm = hour < 12 ? "AM" : "PM";
  const minutes = dt.getMinutes().toLocaleString();
  const formattedMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

  const { profile, selectedChat } = useContext(ChatContext);

  const audioUrl = `http://localhost:${process.env.REACT_APP_PORT}/${content}`;
  console.log(audioUrl);

  const renderAppropritateIcon = () => {
    switch (delieveryStatus) {
      case msgDelieveryStatusConstants.sent:
        return <BsCheck />;
      case msgDelieveryStatusConstants.seen:
        return <BsCheckAll color="#fff" />;
      case msgDelieveryStatusConstants.pending:
        return <BiErrorCircle color="red" />;
    }
  };

  return (
    <MainContainer sentBy={sentBy} profile={profile}>
      <Tag>
        <i>Recorded</i>
      </Tag>
      <AudioWrapper>
        <Audio controls src={audioUrl} />
      </AudioWrapper>
      <TimeAndStatusCotainer>
        <span className="msg-time">{`${formattedHours}:${formattedMinutes} ${amOrPm} `}</span>

        <span>{sentBy === profile.email && renderAppropritateIcon()}</span>
      </TimeAndStatusCotainer>
    </MainContainer>
  );
}
