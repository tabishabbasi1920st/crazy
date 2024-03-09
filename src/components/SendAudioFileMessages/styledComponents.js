import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  min-width: 150px;
  gap: 15px;

  p {
    color: #fff;
    font-size: 18px;
  }
`;

export const ButtonsContainer = styled.div`
  /* border: 2px solid red; */
  display: flex;
  gap: 15px;
  justify-content: center;
`;

export const CustomButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #203047;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 50px;
  width: 125px;
  cursor: pointer;
  background-color: ${({ backgroundcolor }) => backgroundcolor};
`;

export const AudioWrapperContainer = styled.div`
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  audio {
    max-width: 100%;
  }
`;
