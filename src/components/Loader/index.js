import { Oval } from "react-loader-spinner";
import { MainContainer } from "./styledComponents";

export default function Loader({ height, width, color }) {
  return (
    <MainContainer>
      <Oval
        visible={true}
        height={height}
        width={width}
        color={color}
        ariaLabel="oval-loading"
        secondaryColor="rgba(0,0,0,0.5)"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </MainContainer>
  );
}
