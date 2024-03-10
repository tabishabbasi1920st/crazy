import styled, { keyframes } from "styled-components";
import { MdFiberManualRecord, MdSend } from "react-icons/md";

export const MainContainer = styled.div`
  height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* border: 2px solid red; */

  .video {
    height: 290px;
    width: 100%;
    /* border: 2px solid red; */
  }

  .playback-video {
    height: 290px;
    width: 100%;
  }
`;

export const ControllPanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 20px;

  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const StartOrStopBtn = styled.button`
  font-family: sans-serif;
  height: 50px;
  width: 100px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #203047;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const blinkAnimation = keyframes`
  0%, 50%, 100%{
    opacity:1;
  }
  25%, 75%{
    opacity: 0;
  }
`;

export const RecordingIcon = styled(MdFiberManualRecord)`
  font-size: 24px;
  color: #ff0000;
  animation: ${blinkAnimation} 3s infinite;
`;

export const SendBtn = styled.button`
  font-family: sans-serif;
  height: 50px;
  width: 100px;
  border: none;
  border-radius: 5px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e11d48;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
