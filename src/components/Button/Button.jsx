import React from "react";

const Btn = ({ title, func, classes, styles }) => {
  return (
    <button className={classes} onClick={() => func(true)} style={styles}>
      {title}
    </button>
  );
};

export default Btn;
