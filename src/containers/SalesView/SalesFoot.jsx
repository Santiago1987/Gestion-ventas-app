import React from "react";
import Btn from "../../components/Button/Button";

const SalesFoot = (handleOnClickBtn) => {
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
        <h3 style={{ fontWeight: "bold", padding: "5px", margin: "auto" }}>
          Total:
        </h3>
        <h4
          style={{
            margin: "auto",
            marginRight: "10px",
          }}
        >
          10.532
        </h4>
      </div>
    </div>
  );
};

export default SalesFoot;
