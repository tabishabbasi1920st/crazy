import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const BodyContainerSm = styled.div`
  height: calc(100vh - 70px); // 70px is the height of header
  display: flex;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const BodyContainerLg = styled.div`
  height: calc(100vh - 70px); // 70px is the height of header
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

export const FirstContainer = styled.div`
  width: 320px;
  display: flex;
`;

export const SecondContainer = styled.div`
  flex-grow: 1;
  display: flex;
`;
