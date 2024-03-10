import styled, { keyframes } from "styled-components";
import { MdFiberManualRecord, MdSend } from "react-icons/md";

export const MainContainer = styled.div`
  height: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media screen and (min-width: 768px) {
    width: 720px;
    height: 320px;
  }

  .video {
    height: 175px;
    width: 100%;
    @media screen and (min-width: 768px) {
      height: 250px;
    }
  }

  img {
    height: 175px;
    width: 100%;

    @media screen and (min-width: 768px) {
      height: 250px;
    }
  }
`;

export const CameraAndImgContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
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

export const CaptureBtn = styled.button`
  font-family: sans-serif;
  height: 50px;
  width: 100px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #203047;
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
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
