import styled from "styled-components";

export const MainContainer = styled.div`
  position: relative;
  top: -15px;

  flex-grow: 1;
`;

export const TabContainer = styled.ul`
  height: 50px;
  border-left: 1px solid #2a364b;
  border-bottom: 1px solid #2a364b;
  display: flex;
  align-items: flex-start;
  max-width: 320px;
  gap: 10px;
  /* border: 2px solid red; */
  padding: 0px 0px 0px 10px;
`;

export const TabItem = styled.li`
  flex-shrink: 0;
  font-size: 14px;
  padding: 5px;
  border-bottom: ${({ isselected }) => (isselected ? "2px solid #2563eb" : "")};
  color: ${({ isselected }) => (isselected ? "#2563eb" : "#94a3b8")};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BodyContainer = styled.div`
  height: 100px;
  flex-grow: 1;
`;
