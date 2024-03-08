import styled from "styled-components";

export const MainContainer = styled.div``;

export const MediaButton = styled.button`
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

export const DropUpContainer = styled.ul`
  position: absolute;
  background-color: #132036;
  border-radius: 5px;
  border: 1px solid #333a4a;
  width: 200px;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  bottom: 75px;
  overflow: hidden;

  li {
    padding: 10px 10px 10px 10px;
    color: #cbd5e1;
    font-size: 22px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.15s ease-in-out;
    position: relative;
    right: 0px;
    cursor: pointer;
    animation: rightToInitial 0.5s ease-in-out;

    @keyframes rightToInitial {
      0% {
        right: -100%;
      }
      50% {
        right: 15px;
      }
      100% {
        right: 0px;
      }
    }

    &:hover {
      background-color: #0f172a;
      padding: 10px 5px 10px 5px;
    }

    p {
      font-size: 16px;
    }
  }
`;
