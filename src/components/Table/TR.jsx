import React from "react";
import TH from "./TH";
import TD from "./TD";

const TR = ({
  columns = null,
  headers = null,
  type,
  handleRowSelect,
  //selectedProd,
  handleOnDobleClick,
  handleKeyPress,
  handleOnChange,
}) => {
  let Hcol = headers ? Object.keys(headers) : [];
  let Bcol = columns ? Object.keys(columns) : [];

  let coln = 0;

  return (
    <tr>
      {Hcol.length > 0
        ? Hcol.map((col) => (
            <TH key={coln++} column={col} text={headers[col]} type={type} />
          ))
        : null}
      {Bcol.length > 0
        ? Bcol.map((col) => (
            <TD
              key={coln++}
              column={col}
              text={columns[col]}
              type={type}
              id={columns["id"]}
              selected="false"
              handleRowSelect={handleRowSelect}
              //selectedProd={selectedProd}
              handleKeyPress={handleKeyPress}
              handleOnDobleClick={handleOnDobleClick}
              handleOnChange={handleOnChange}
            />
          ))
        : null}
    </tr>
  );
};

export default TR;
