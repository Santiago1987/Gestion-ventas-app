import React from "react";

import TR from "./TR";

const TBody = ({
  columns,
  type,
  handleRowSelect,
  //selectedProd,
  handleOnDobleClick,
  handleOnChange,
}) => {
  let rown = 0;

  return (
    <tbody>
      {columns.map((col) => (
        <TR
          key={rown++}
          columns={col}
          type={type}
          handleRowSelect={handleRowSelect}
          //selectedProd={selectedProd}
          handleOnDobleClick={handleOnDobleClick}
          handleOnChange={handleOnChange}
        />
      ))}
    </tbody>
  );
};

export default TBody;
