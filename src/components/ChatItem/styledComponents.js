import styled from "styled-components";

export const MainContainer = styled.li`
  background-color: ${({ isSelected }) => (isSelected ? "#0f172a" : "")};
  /* border:2px solid red; */
  position: relative;
  left: 0px;
  padding: 10px 10px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #0f172a;
    padding: 10px 12px;
  }

  p {
    color: #cbd5e1;
  }
`;

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
