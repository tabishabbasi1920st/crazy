import styled, { ServerStyleSheet } from "styled-components";

export const MainContainer = styled.div`
  /* border: 2px solid red; */
  height: 100%;

  .logout-btn {
    height: 100%;
    width: 40px;
    background-color: #203047;
    border: none;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ConfirmationContainer = styled.div`
  width: 275px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 5px;
  background-color: #132036;

  p {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }

  .btn-container {
    /* border: 2px solid green; */
    display: flex;
    justify-content: space-around;
  }

  .btn {
    height: 40px;
    padding: 5px 10px;
    border: none;
    font-size: 14px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
  }
`;
