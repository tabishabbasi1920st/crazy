import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const VideoWrapper = styled.div`
  max-width: 500px;
`;

export const Video = styled.video`
  border: 2px solid white;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const SelectBtn = styled.button`
  height: 50px;
  width: 120px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #203047;
  color: #fff;
  cursor: pointer;
`;
export const SendBtn = styled.button`
  height: 50px;
  width: 120px;
  border: none;
  border-radius: 5px;
  font-size: 25px;
  background-color: #e11d48;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
