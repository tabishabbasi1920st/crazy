import { MainContainer } from "./styledComponent";

export default function Failure({ apiFuncToReq }) {
  return (
    <MainContainer>
      <p>Something went wrong</p>
      <button onClick={() => apiFuncToReq()}>Try again</button>
    </MainContainer>
  );
}
