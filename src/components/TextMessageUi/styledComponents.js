import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
  display: flex;
  /* border: 2px solid red; */
  /* Aligning sent messages at right side of the chat container */
  margin-left: ${(props) => {
    const { profile, sentBy } = props;
    const { email } = profile;
    return sentBy === email ? "auto" : "";
  }};
  /* Aligning received messages at left side of the chat container */
  margin-right: ${(props) => {
    const { profile, sentBy } = props;
    const { email } = profile;
    return sentBy !== email ? "auto" : "";
  }};
  /* Setting background-color for sent and received message */
  background-color: ${(props) => {
    const { profile, sentBy } = props;
    const { email } = profile;
    return sentBy === email ? "#2563eb" : "";
  }};

  .msg-container {
    /* border: 2px solid green; */
    padding: ${(props) => {
      const { profile, sentBy } = props;
      const { email } = profile;
      return sentBy === email ? "" : "10px";
    }};
    word-wrap: break-word;
    border-radius: 10px;
    background-color: ${(props) => {
      const { profile, sentBy } = props;
      const { email } = profile;
      return sentBy === email ? "" : "#132036";
    }};
  }

  .status-icon {
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    align-self: flex-end;
    /* border: 2px solid red; */
  }

  .msg {
    color: #ffffff;
    font-size: 14px;
  }

  .msg-time {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 5px;
  }
`;

export const SenderProfileContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  align-self: flex-end;
  flex-shrink: 0;
  margin-right: 5px;
  background-image: url(${({ backgroundimage }) => backgroundimage});
  background-size: cover;
  background-position: center;
`;
