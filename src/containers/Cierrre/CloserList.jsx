import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http";
import Table from "../../components/Table/Table";
import moment from "moment";
import { useSelector } from "react-redux";

const CloserList = () => {
  const [data, setData] = useState({});
  const [header, setHeader] = useState({});
  const settings = useSelector((state) => state.settings);
  const { porcNerd } = settings;
  const [totalNerd, setTotalNerd] = useState(0);

  const { REACT_APP_BACKEND_URL, REACT_APP_CLOSER_LIST } = process.env;

  const [isLoadding, response] = useHttp(
    `${REACT_APP_BACKEND_URL}${REACT_APP_CLOSER_LIST}`,
    [],
    "GET"
  );

  useEffect(() => {
    if (response !== null) {
      let { data } = response;
      console.log("data", data);
      let { fromDate, toDate, totalDol, totalN, totalPes, artList, totalCant } =
        data;
      setHeader({ fromDate, toDate, totalDol, totalN, totalPes, totalCant });
      setData(artList);

      setTotalNerd(parseFloat((totalN * porcNerd) / 100));
    }
  }, [isLoadding]);

  const handleRowSelect = () => {};
  const handleOnDobleClick = () => {};
  const handleKeyPress = () => {};

  const handleOnChange = () => {};

  let content = (
    <div
      className="d-flex justify-content-center"
      style={{ width: "1300px", height: "600px", verticalAlign: "center" }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

  let titles = {
    articulo: "Articulo",
    cantitdad: "Cantidad total",
    precioPesos: "Total pesos",
    precioDolar: "Total dolares",
    precioNerd: "Total sin adicional",
  };

  let items = [];

  if (data.length > 0) {
    items = data.map((d) => {
      let { cantidad, descripcion, precioPesos, precioDolar, precioNerd } = d;
      return {
        articulo: descripcion,
        cantidad,
        precioPesos,
        precioDolar,
        precioNerd,
      };
    });
  }

  content = (
    <Table
      type="CLOSER"
      items={items}
      handleRowSelect={handleRowSelect}
      handleOnDobleClick={handleOnDobleClick}
      handleKeyPress={handleKeyPress}
      handleOnChange={handleOnChange}
    />
  );

  return (
    <div className="container">
      <div className="shadow bg-white rounded m-1">
        <Table type="CLOSER" titles={titles} />
        <div className="shadow bg-white rounded closerTable">{content}</div>
      </div>
      <div className="shadow closerFooter">
        <label className="closerFooterComponents closerFooterTitle">
          Totales
        </label>
        <label className="closerFooterComponents closerFooterCant">
          {header.totalCant}
        </label>
        <label className="closerFooterComponents closerFooterTotP">
          {header.totalPes}
        </label>
        <label className="closerFooterComponents closerFooterTotD">
          {header.totalDol}
        </label>
        <label className="closerFooterComponents closerFooterTotN">
          {header.totalN}
        </label>
      </div>
      <div className="shadow closerFooter">
        <label className="closerFooterComponents closerFooterTitle">
          Total para proveedor
        </label>
        <label className="closerFooterComponents closerFooterTotNerd">
          {totalNerd}
        </label>
      </div>
    </div>
  );
};

export default React.memo(CloserList);
