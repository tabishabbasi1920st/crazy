import styled from "styled-components";

export const MainContainer = styled.div`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  gap: 10px;

  input {
    /* flex-grow: 1; */
    background-color: #0f172a;
    border: none;
    color: #fff;
    padding: 10px;
    outline: none;
    border-radius: 5px;
    width: 100%;
  }

  button {
    height: 100%;
    width: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #203047;
    border: none;
    color: #fff;
    border-radius: 5px;
    &:disabled {
      color: #4e5d73;
    }
    @media screen and (min-width: 768px) {
      display: none;
    }
  }
`;
