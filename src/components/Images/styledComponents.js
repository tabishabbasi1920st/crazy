import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 4px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  max-width: 320px;
  border-left: 1px solid #2a364b;
  min-height: calc(100vh - 436px);
`;

export const EmptyListContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
