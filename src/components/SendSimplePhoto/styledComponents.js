import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ImageContainer = styled.div`
  border-radius: 5px;
  max-height: 280px;
  max-width: 270px;
  min-height: 300px;
  min-width: 270px;
  overflow: hidden;
  background-image: url(${({ backgroundimage }) => backgroundimage});
  background-size: cover;
  background-position: center;
`;

export const ButtonsContainer = styled.div`
  /* border: 2px solid red; */
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const ChooseImageBtn = styled.button`
  height: 50px;
  width: 120px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #203047;
  color: #fff;
  padding: 10px;
  cursor: pointer;
`;

export const SendImageBtn = styled.button`
  height: 50px;
  width: 120px;
  font-size: 25px;
  border-radius: 5px;
  border: none;
  background-color: #e11d48;
  color: #fff;
  padding: 10px;
  cursor: pointer;
`;
