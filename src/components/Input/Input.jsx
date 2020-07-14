import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchInput } from "../../actions/index";

const Input = () => {
  const Search = useSelector((state) => state.Search);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleOnchange = (event) => {
    dispatch(searchInput(event.target.value));
  };

  return (
    <div className="input-group mb-2 shadow bg-white rounded mt-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          Search
        </span>
      </div>
      <input
        className="form-control"
        type="text"
        value={Search}
        placeholder="insertar descripción"
        onChange={handleOnchange}
      />
    </div>
  );
};

export default Input;
