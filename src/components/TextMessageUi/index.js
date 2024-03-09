import { MainContainer, SenderProfileContainer } from "./styledComponents";
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

export default function TextMessageUi({ eachTextMessage }) {
  const { id, type, content, sentBy, sentTo, delieveryStatus, timestamp } =
    eachTextMessage;

  const dt = new Date(timestamp);
  const hour = dt.getHours();
  const formattedHours = hour % 12 || 12; // convert to 12-hour format.
  const amOrPm = hour < 12 ? "AM" : "PM";
  const minutes = dt.getMinutes().toLocaleString();
  const formattedMinutes = minutes.length < 2 ? `0${minutes}` : minutes;

  const { profile, selectedChat } = useContext(ChatContext);

  const imageUrl = `http://localhost:${process.env.REACT_APP_PORT}/${selectedChat.imageUrl}`;

  const renderAppropritateIcon = () => {
    switch (delieveryStatus) {
      case msgDelieveryStatusConstants.sent:
        return <BsCheck />;
      case msgDelieveryStatusConstants.seen:
        return <BsCheckAll color="#fff" />;
      case msgDelieveryStatusConstants.pending:
        // return <BiErrorCircle color="red" />;
        return <Loader height="15px" width="15px" color="white"/>;
    }
  };

  const renderSenderUserDp = () => {
    return (
      <SenderProfileContainer
        backgroundimage={imageUrl}
      ></SenderProfileContainer>
    );
  };

  return (
    <MainContainer sentBy={sentBy} profile={profile}>
      {/* rendering user dp with its message */}
      {sentBy === selectedChat.email && renderSenderUserDp()}
      <div className="msg-container">
        <p className="msg">{content}</p>
        <p className="msg-time">{`${formattedHours}:${formattedMinutes} ${amOrPm} `}</p>
      </div>
      {sentBy === profile.email && (
        <p className="status-icon">{renderAppropritateIcon()}</p>
      )}
    </MainContainer>
  );
}
