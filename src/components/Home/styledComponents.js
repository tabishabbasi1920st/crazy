import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

export const BodyContainer = styled.div`
  height: calc(100vh - 70px); // 70px is the height of header
  border: 2px solid green;
  display: flex;
`;
