import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
      <Bars
        height="120"
        width="90"
        color="#1a90ff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
  );
};

export default Loader;
