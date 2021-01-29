import React, { useState, useEffect } from "react";
import Btn from "../Button/Button";

const SalesModal = ({ btnType, handleOnSubmit, handleOnCancel }) => {
  let content = (
    <div>
      <h3>Estas seguro?</h3>
      <div className="d-flex flex-md-row justify-content-around">
        <Btn
          type={btnType}
          gridType="SALES"
          title="Si"
          classes="btn btn-success m-2"
          onclick={handleOnSubmit}
          styles={{ width: "50px" }}
        />

        <Btn
          type={btnType}
          gridType="SALES"
          title="No"
          classes="btn btn-danger m-2"
          onclick={handleOnCancel}
          styles={{ width: "50px" }}
        />
      </div>
    </div>
  );
  return content;
};

export default SalesModal;
