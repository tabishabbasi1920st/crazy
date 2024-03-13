import styled from "styled-components";

export const MainContainer = styled.div`
  max-width: 30%;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0px 10px 0px;
  position: relative;

  @media screen and (max-width: 576px) {
    max-width: 50%;
  }

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
    return sentBy === email ? "#2563eb" : "#132036";
  }};
`;

export const Tag = styled.span`
  color: #fff;
  font-style: italic;
`;

export const ImageWrapper = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  flex-grow: 1;
`;

export const Image = styled.img`
  min-width: 80px;
  max-width: 100%;
`;

export const TimeAndStatusCotainer = styled.div`
  /* border: 2px solid red; */
  display: flex;
  justify-content: space-between;

  .msg-time {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 5px;
  }

  .status {
    align-self: flex-end;
  }
`;
