import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  background-color: #132036;
  display: flex;
  align-items: center;
  padding: 5px 10px 5px 10px;
  gap: 10px;
  height: 70px;
  position: relative;
  bottom: 0px;
  animation: topToInitial 0.2s ease-in-out;
  /* border: 2px solid red; */
  justify-content: center;

  @keyframes topToInitial {
    0% {
      bottom: 200px;
    }
    50% {
      bottom: -20px;
    }
    100% {
      bottom: 0px;
    }
  }

  button {
    height: 100%;
    min-width: 40px;
    max-width: 40px;
    flex-shrink: 0;
    font-size: 18px;
    border: none;
    background-color: transparent;
    color: #94a3b8;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
  }

  input {
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    width: 90%;
    font-size: 15px;
    padding: 0px 10px 0px 5px;
    color: #94a3b8;
    &::placeholder {
      color: #94a3b8;
      font-weight: 400;
    }
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  width: 87%;
  height: 40px;
  border-radius: 5px;
  border: ${({ isChatSearchFocus }) =>
    isChatSearchFocus ? "none" : "1px solid #203047"};
  background-color: ${({ isChatSearchFocus }) =>
    isChatSearchFocus ? "#0f172a" : "transparent"};
  transition: border 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0.2s;
  /* border: 2px solid green; */
`;
