import React from "react";
import Btn from "../../components/Button/Button";

const BtnProdList = ({ handleOnClickBtn }) => {
  return (
    <div className="shadow bg-white rounded m-3 d-flex flex-row">
      <Btn
        type="new"
        gridType="PRODUCTS"
        title="Nuevo"
        classes="btn btn-dark m-2"
        onclick={handleOnClickBtn}
        styles={{ width: "100px" }}
      />
      <Btn
        gridType="PRODUCTS"
        type="update"
        title="Modificar"
        classes="btn btn-dark m-2"
        onclick={handleOnClickBtn}
        styles={{ width: "100px" }}
      />
      <Btn
        gridType="PRODUCTS"
        type="delete"
        title="Borrar"
        classes="btn btn-dark m-2"
        onclick={handleOnClickBtn}
        styles={{ width: "100px" }}
      />
    </div>
  );
};

export default BtnProdList;
