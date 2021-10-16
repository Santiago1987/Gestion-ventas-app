import React from "react";
import useTHStyles from "../../containers/hooks/THStyles";

const TH = ({ text, type, column }) => {

  const style = useTHStyles()

  return (
    <th style={style(type, column)} scope="col">
      {text}
    </th>
  );
};

export default TH;