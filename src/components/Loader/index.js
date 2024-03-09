import { Oval } from "react-loader-spinner";

export default function Loader({ height, width, color }) {
  return (
    <Oval
      visible={true}
      height={height}
      width={width}
      color={color}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
