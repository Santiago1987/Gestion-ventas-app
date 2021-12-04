import React from "react";

import ProductView from "../../containers/ProducsView/ProductsList";
import Sales from "../../containers/SalesView/Sales";

const Main = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm">
          <ProductView />
        </div>
        <div className="col-sm">
          <Sales />
        </div>
      </div>
    </div>
  );
};

export default Main;
