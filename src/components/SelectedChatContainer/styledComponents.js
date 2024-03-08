import styled from "styled-components";

export const MainContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  height: 70px;
  flex-shrink: 0;
`;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  padding: 0px 10px 0px 10px;
  background-color: #0f172a;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #070b15;
  }
`;
export const Footer = styled.div`
  height: 70px;
  flex-shrink: 0;
`;
