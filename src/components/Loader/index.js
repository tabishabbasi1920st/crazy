import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <Oval
      visible={true}
      height="100%"
      width="25"
      color="#fff"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
