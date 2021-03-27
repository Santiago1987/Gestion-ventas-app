import React from "react";
import { useSelector } from "react-redux";

const withStyleAndSelect = (WrapComponent) => {
  const newComponent = (props) => {
    return <WrapComponent {...props} />;
  };

  return newComponent;
};

export default withStyleAndSelect;
