import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDolar } from "../../actions";
import axios from "axios";
import { useHttpMeth } from "../hooks/HttpMeth";

const SalesTop = () => {
  const { REACT_APP_BACKEND_URL, REACT_APP_SAVE_DOLAR } = process.env;
  const [value, setValue] = useState(0);

  const dolar = useSelector((state) => state.dolar);
  const dispatch = useDispatch();

  const [isLoading, http] = useHttpMeth();

  useEffect(() => {
    let { value } = dolar;
    setValue(value);
  }, []);

  //console.log("isLoading",isLoading)
  //console.log("http", http("https://www.dolarsi.com/api/api.php?type=valoresprincipales","GET",null))

  const handleOnChange = (e) => {
    let { value } = e.target;
    let regex = new RegExp("^([0-9])*$");

    if (value.length > 3 || !regex.test(value)) return;
    setValue(value);
    return;
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
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default React.memo(SalesTop);
