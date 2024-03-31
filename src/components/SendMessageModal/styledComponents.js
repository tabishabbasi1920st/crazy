import styled from "styled-components";

export const MainContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #132036;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  /* background-color: transparent; */
  border: none;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 30px;
  color: #fff;
  align-self: flex-end;
  border-radius: 10px;
  cursor: pointer;
`;
