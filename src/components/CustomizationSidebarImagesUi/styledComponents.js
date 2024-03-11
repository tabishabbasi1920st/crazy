import styled from "styled-components";

export const ImageItem = styled.li`
  /* border: 2px solid green; */
  border-radius: 5px;
  background-image: url(${(props) => props.backgroundimage});
  height: 100px;
  width: 100px;
  background-size: cover;
  background-position: center;
`;