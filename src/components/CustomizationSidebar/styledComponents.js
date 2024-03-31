import styled from "styled-components";

export const MainContainer = styled.div`
  position: ${({ isOpenInSmall }) => (isOpenInSmall ? "absolute" : "")};
  left: ${({ isOpenInSmall }) => (isOpenInSmall ? "0" : "")};
  flex-shrink: 0;
  background-color: #132036;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100vh - 70px);
  width: 300px;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #070b15;
  }
`;

export const BannerImgContainer = styled.div`
  height: 140px;
  width: 100%;
  border-bottom: 1px solid #234d6a;
  background-image: url(${({ backgroundimage }) => backgroundimage});
  background-size: cover;
  background-position: center;
  z-index: 100;
  /* border: 2px solid red; */
  flex-shrink: 0;
`;

export const BodyContainer = styled.div`
  position: relative;
  top: -15px;
  /* flex-grow: 1; */
  border-left: 1px solid #2a364b;
`;

export const DpUserNameAndStatusContainer = styled.div`
  height: 115px;
  width: 100%;

  background-color: #132036;
  /* border: 2px solid red; */
`;

export const DpContainer = styled.div`
  /* border: 2px solid blue; */
  height: 60px;
  display: flex;
  justify-content: center;
`;

export const DpBgContainer = styled.div`
  /* border: 2px solid red; */
  height: 56px;
  width: 56px;
  background-image: url(${({ backgroundimage }) => backgroundimage});
  background-size: cover;
  background-position: center;
  border: 2px solid #132036;
  border-radius: 5px;
  z-index: 100000;
`;

export const Username = styled.p`
  text-align: center;
  font-weight: 600;
  color: #fff;
`;

export const ActiveStatus = styled.p`
  text-align: center;
  font-size: 14px;
  color: #fff;
`;

export const TilesContainer = styled.div`
  /* border: 2px solid green; */
  height: 90px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const MediaTile = styled.button`
  background-color: ${({ isselected }) => (isselected ? "#bfdbfe" : "#203047")};
  color: ${({ isselected }) => (isselected ? "#2563eb" : "#64748b")};
  width: 80px;
  height: 70px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  &:hover {
    background-color: #bfdbfe;
    color: #2563eb;
  }
  &:active {
    background-color: #bfdbfe;
    color: #2563eb;
  }
`;
