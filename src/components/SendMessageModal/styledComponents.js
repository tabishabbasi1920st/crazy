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
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
`;
