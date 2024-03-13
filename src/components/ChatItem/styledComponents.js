import styled from "styled-components";

export const MainContainer = styled.li``;

export const BackgroundImageContainer = styled.div`
  height: 50px;
  width: 55px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  h1 {
    margin: 0px;
    padding: 0px;
    line-height: 0.6;
    color: green;
    font-weight: bold;
    font-size: 50px;
  }
`;

export const DescriptionContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
