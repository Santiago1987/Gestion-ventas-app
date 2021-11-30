import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../../containers/hooks/http";

import ProductView from "../../containers/ProducsView/ProductsList";
import Sales from "../../containers/SalesView/Sales";
import { setSettings } from "../../actions";

const { REACT_APP_BACKEND_URL, REACT_APP_SETTINGS } = process.env;

const Main = () => {
  const dispatch = useDispatch();

  const [isLoadding, response] = useHttp(
    `${REACT_APP_BACKEND_URL}${REACT_APP_SETTINGS}`,
    [],
    "GET"
  );

  useEffect(() => {
    if (response !== null) {
      let { data } = response;
      dispatch(setSettings(data));
    }
  }, [isLoadding]);

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
