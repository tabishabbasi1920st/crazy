import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 80%;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
  display: flex;
  position: relative;
  margin-right: 5px;
  margin-left: 5px;

  right: ${(props) => {
    const { profile, sentBy } = props;
    const { email } = profile;
    return sentBy === email ? "0%" : "";
  }};

  left: ${(props) => {
    const { profile, sentBy } = props;
    const { email } = profile;
    return sentBy === email ? "" : "0%";
  }};

  @keyframes rightToInitial {
    0% {
      right: -80%;
    }
    100% {
      right: 0px;
    }
  }

  @keyframes leftToInitial {
    0% {
      left: -80%;
    }
    100% {
      left: 0px;
    }
  }

  animation: ${(props) => {
    const { profile, sentBy } = props;
    const { email } = profile;
    return sentBy === email
      ? "rightToInitial 0.2s ease-in-out"
      : "leftToInitial 0.2s ease-in-out";
  }};

  /* Aligning sent messages at right side of the chat container */
  margin-left: ${(props) => {
    const { profile, sentBy } = props;
    const { email } = profile;
    return sentBy === email ? "auto" : "";
  }};

  /* Aligning sent messages at right side of the chat container */
  padding: ${(props) => {
    const { profile, sentBy } = props;
    const { email } = profile;
    return sentBy === email ? "10px" : "";
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
    word-break: break-all;
  }

  .msg-time {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 5px;
  }
`;
