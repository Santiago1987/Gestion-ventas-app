import React from "react";
import { useSelector } from "react-redux";

import Btn from "../../components/Button/Button";

const SalesFoot = ({ handleOnClickBtn }) => {
  const salesProducts = useSelector((state) => state.salesProducts);

  let total = 0;
  if (salesProducts.length > 0) {
    total += parseFloat(salesProducts.map((s) => s.precio * s.cant));
  }

  return (
    <div className="shadow bg-white rounded mt-3 d-flex flex-row justify-content-between">
      <div>
        <Btn
          type="cancel"
          gridType="SALES"
          title="Cancel"
          classes="btn btn-danger m-2"
          onclick={handleOnClickBtn}
          styles={{ width: "100px" }}
        />
        <Btn
          type="remove"
          gridType="SALES"
          title="Remover"
          classes="btn btn-dark m-2"
          onclick={handleOnClickBtn}
          styles={{ width: "100px" }}
        />
        <Btn
          type="finish"
          gridType="SALES"
          title="Finalizar"
          classes="btn btn-success m-2"
          onclick={handleOnClickBtn}
          styles={{ width: "100px" }}
        />
      </div>
      <div className="d-flex flex-row">
        <label
          style={{
            fontWeight: "bold",
            padding: "5px",
            margin: "auto",
            fontSize: "30px",
          }}
        >
          Total:
        </label>
        <input
          type="number"
          style={{
            margin: "auto",
            marginRight: "10px",
            width: "100px",
            border: "1px solid black",
            borderRadius: "5px",
            boxShadow: "5px 10px 8px #888888",
            fontSize: "20px",
            MozAppearance: "textfield",
            textAlign: "right",
            paddingRight: "5px",
          }}
          value={total}
          readOnly
        />
      </div>
    </div>
  );
};

export default React.memo(SalesFoot);
