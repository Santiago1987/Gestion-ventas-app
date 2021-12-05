import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http";
import Table from "../../components/Table/Table";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "react-modal";

const CloserList = () => {
  const [prodModalOpen, setprodModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [header, setHeader] = useState({});
  const settings = useSelector((state) => state.settings);
  const { porcNerd } = settings;
  const [totalNerd, setTotalNerd] = useState(0);
  const [fullData, setFullData] = useState({});

  const {
    REACT_APP_BACKEND_URL,
    REACT_APP_CLOSER_LIST,
    REACT_APP_CLOSER_SAVE,
  } = process.env;

  const [isLoadding, response] = useHttp(
    `${REACT_APP_BACKEND_URL}${REACT_APP_CLOSER_LIST}`,
    [],
    "GET"
  );

  useEffect(() => {
    if (response !== null) {
      let { data } = response;

      if (data.length === 0) return;
      setFullData(data);
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

  const handleOnClick = () => {
    if (data.length === 0) return;
    setprodModalOpen(true);
  };

  const handleOnSubmit = async () => {
    await axios
      .post(`${REACT_APP_BACKEND_URL}${REACT_APP_CLOSER_SAVE}`, fullData)
      .then((res) => {
        setData([]);
        setHeader({});
        setTotalNerd(0);
        setFullData({});
      })
      .catch((err) => {
        console.log("error", err);
      })
      .finally(setprodModalOpen(false));
  };

  const handleOnCancel = () => {
    setprodModalOpen(false);
  };

  let content = (
    <div style={{ width: "100%", height: "500px", textAlign: "center" }}>
      <label className="noData">NO DATA</label>
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
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="container">
      <div className="closerTop">
        <div>
          <label className="closerDesde">Desde:</label>
          <label className="closerDesdeDate">
            {moment(header.fromDate).format("DD/MM/YY")}
          </label>
        </div>
        <div>
          <label className="closerDesde">Hasta:</label>
          <label className="closerDesdeDate">
            {moment.parseZone(header.toDate).local().format("DD/MM/YY")}
          </label>
        </div>
        <button
          type="button"
          className={
            data.length > 0 ? "btn btn-dark btn-lg" : "btn btn-secondary btn-lg"
          }
          onClick={handleOnClick}
        >
          Cerrar periodo
        </button>
      </div>
      <div className="bg-white rounded m-1">
        <Table type="CLOSER" titles={titles} />
        <div className="shadow bg-white rounded closerTable">{content}</div>
      </div>
      <div className="closerFooter">
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
      <div className="closerFooter">
        <label className="closerFooterComponents closerFooterTitle">
          Total para proveedor
        </label>
        <label className="closerFooterComponents closerFooterTotNerd">
          {totalNerd}
        </label>
      </div>
      <div className="closerFooter">
        <label className="closerFooterComponents closerFooterTitle">
          Ganancias totales
        </label>
        <label className="closerFooterComponents closerFooterTotNerd">
          {header.totalPes ? header.totalPes - totalNerd : 0}
        </label>
      </div>
      <Modal
        isOpen={prodModalOpen}
        onRequestClose={() => setprodModalOpen(false)}
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={200}
        style={customStyles}
      >
        <div className="closerModal">
          <label>
            {`Cierre de periodo entre ${moment(header.fromDate).format(
              "DD/MM/YY"
            )}
              
           y ${moment.parseZone(header.toDate).local().format("DD/MM/YY")}`}
          </label>
          <label>Estas seguro?</label>
          <div className="closerModalButton">
            <button
              type="button"
              className="btn btn-dark btn-lg"
              onClick={handleOnSubmit}
            >
              Acepar
            </button>
            <button
              type="button"
              className="btn btn-dark btn-lg"
              onClick={handleOnCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(CloserList);
