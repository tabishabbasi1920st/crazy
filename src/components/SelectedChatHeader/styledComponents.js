import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #132036;
  display: flex;
  overflow: hidden;
  /* border: 2px solid red; */
  padding: 10px 10px 10px 0px;
  @media screen and (min-width: 768px) {
    padding: 10px 10px 10px 10px;
  }
`;

export const ExitButton = styled.button`
  height: 100%;
  width: 50px;
  font-size: 20px;
  color: #475569;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  &:hover {
    color: #bfdbfe;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  /* border: 2px solid green; */
`;

export const Dp = styled.div`
  background-image: url(${({ backgroundimage }) => backgroundimage});
  height: 100%;
  width: 55px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 2px solid black; */

  .name {
    color: #cbd5e1;
    font-size: 11px;
    @media screen and (min-width: 330px) {
      font-size: 12px;
    }
    @media screen and (min-width: 350px) {
      font-size: 14px;
    }
  }

  .active-status {
    color: #94a3b8;
    font-size: 12px;
  }
`;

export const OptionsContainer = styled.div`
  /* border: 2px solid white; */
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

export const SearchChatBtn = styled.button`
  height: 40px;
  width: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #203047;
  border: none;
  color: #4e5d73;
  border-radius: 5px;

  &:hover {
    background-color: #bfdbfe;
    color: #326dec;
  }
`;

export const WindowButton = styled.button`
  height: 40px;
  width: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #203047;
  border: none;
  color: #4e5d73;
  border-radius: 5px;
  transform: rotate(90deg);

  &:hover {
    background-color: #bfdbfe;
    color: #326dec;
  }
`;
