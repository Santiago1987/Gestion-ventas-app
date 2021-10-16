import React from "react";

import TR from "./TR";

const TBody = ({
  columns,
  type,
  handleRowSelect,
  handleOnDobleClick,
  handleKeyPress,
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
          handleKeyPress={handleKeyPress}
          handleOnDobleClick={handleOnDobleClick}
          handleOnChange={handleOnChange}
        />
      ))}
    </tbody>
  );
};

export default TBody;
