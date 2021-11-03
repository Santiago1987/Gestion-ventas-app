import React from "react";

const Input = ({ value, placeholder, title, handleOnchangeSearch }) => {
  const handleOnChange = (e) => {
    handleOnchangeSearch(e.target.value);
  };

  return (
    <div className="input-group mb-2 shadow bg-white rounded mt-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          {title}
        </span>
      </div>
      <input
        className="form-control"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default Input;
