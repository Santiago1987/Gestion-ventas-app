import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SalesTop = ({ dolar }) => {
  const [val, setVal] = useState(dolar);

  const handleOnChange = (e) => {
    let { value } = e.target;
    let regex = new RegExp("^([0-9])*$");

    if (value.length > 3 || !regex.test(value)) return;
    setVal(value);
    return;
  };

  const handleOnkeyPress = (e) => {
    let { key } = e;
    let { value } = e.target;
    let response = null;

    //hacer un obejeto settings con dolar adentro
  };

  return (
    <div
      className="input-group mb-2 shadow bg-white rounded mt-2"
      style={{ width: "15%" }}
    >
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          Dolar:
        </span>
      </div>
      <input
        className="form-control"
        style={{ textAlign: "right" }}
        type="text"
        value={val}
        onChange={handleOnChange}
        onKeyPress={handleOnkeyPress}
      />
    </div>
  );
};

export default React.memo(SalesTop);
