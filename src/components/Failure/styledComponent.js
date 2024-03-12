import styled from "styled-components";

export const MainContainer = styled.div`
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 10px;

  p {
    color: #fff;
  }

  button {
    height: 40px;
    width: 100px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
    background-color: #203047;
    cursor: pointer;
  }
`;
