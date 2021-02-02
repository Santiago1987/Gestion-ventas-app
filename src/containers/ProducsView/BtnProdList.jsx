import React from "react";
import Btn from "../../components/Button/Button";

const BtnProdList = ({ handleOnClickBtn, disable }) => {
  return (
    <div className="shadow bg-white rounded mt-3 d-flex flex-row justify-content-around">
      <Btn
        type="new"
        gridType="PRODUCTS"
        title="Nuevo"
        classes="btn btn-dark active m-2"
        onclick={handleOnClickBtn}
        styles={{ width: "150px" }}
      />
      <Btn
        gridType="PRODUCTS"
        type="update"
        title="Modificar"
        classes={disable ? "btn btn-secondary m-2" : "btn btn-dark active m-2"}
        onclick={handleOnClickBtn}
        styles={{ width: "150px" }}
      />
      <Btn
        gridType="PRODUCTS"
        type="delete"
        title="Borrar"
        classes={disable ? "btn btn-secondary m-2" : "btn btn-dark active m-2"}
        onclick={handleOnClickBtn}
        styles={{ width: "150px" }}
      />
    </div>
  );
};

export default BtnProdList;
