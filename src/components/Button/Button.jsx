import React from "react";

const Btn = ({ title, onclick, classes, styles, type, gridType }) => {
  return (
    <button
      className={classes}
      onClick={() => onclick(type, gridType)}
      style={styles}
    >
      {title}
    </button>
  );
};

export default Btn;
