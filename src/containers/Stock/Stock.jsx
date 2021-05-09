import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { selectProd } from "../../actions";
import moment from "moment";
import axios from "axios";

const Stock = ({ url, params, refresh }) => {
  const [data, setData] = useState([]);
  const [datos, setDatos] = useState([]);

  //SELECT PARA VER CUANDO SE SELECCIONAN LINEAS
  const [select, setSelect] = useState(false);

  //DATOS HISTORICOS DE STOCK
  const [dataHis, setDataHis] = useState([]);

  const selectedProd = useSelector((state) => state.selectedProd);
  const dispatch = useDispatch();

  const {
    REACT_APP_BACKEND_URL,
    REACT_APP_ESTADISTICAS_STOCK_HIS,
  } = process.env;

  useEffect(() => {
    if (url && !select) {
      getStk(url, params);
      return;
    }
    //EVALUA SELECT PARA NO TENER QUE RECARGAR LA TABLA CADA VEZ QUE SE SELECCIONA
    if (!select) {
      setDatos(
        data.map((dat) => {
          let { _id, descripcion, stock } = dat;
          return { id: _id, descripcion, stock };
        })
      );
    }

    let { id, table } = selectedProd;
    if (table !== "STOCK") {
      setDataHis([]);
      return;
    }

    getDatos(id);
    setSelect(false);
  }, [data, selectedProd, refresh]);

  const getStk = async (url, params) => {
    await axios
      .get(url, params)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  };

  //OBTIENE DATOS HISTORICOS DE STOCK
  const getDatos = async (id) => {
    await axios
      .get(`${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_STOCK_HIS}${id}`)
      .then((res) => {
        let { data } = res;

        setDataHis(
          data
            .map((dat) => {
              let { variacion, razon, fecha, stkFinal } = dat;
              fecha = moment(fecha).format("DD/MM/YYYY");
              return { fecha, razon, variacion, stkFinal };
            })
            .sort((a, b) => a.fecha < b.fecha)
        );
      })
      .catch((err) => {
        console.log(err);
        setDataHis([]);
      });
    return;
  };

  //TITULOS DE LAS TABLAS
  let titles = {
    id: "ID",
    descripcion: "Descripcion",
    stock: "Stock",
  };

  let titleHis = {
    fecha: "Fecha",
    razon: "Motivo",
    variacion: "Cantidad",
    stkFinal: "Stock final",
  };
  /*-------------------------------------------------------------------------------*/
  const handleRowSelect = (id, table) => {
    if (table !== "STOCK") return;
    dispatch(selectProd({ id, table }));
    setSelect(true);
  };

  const handleOnDobleClick = () => null;

  const handleOnChange = (e) => {};

  const handleKeyPress = (id, column, text) => null;
  /*-------------------------------------------------------------------------------*/

  let content = <h2>Loading....</h2>;

  if (datos.length > 0) {
    content = (
      <>
        <h3 className="p-2">Historico de Stock</h3>
        <div className="d-flex">
          <div className="shadow bg-white rounded m-1 stockTable w-50">
            <Table
              type={"STOCK"}
              titles={titles}
              items={datos}
              handleRowSelect={handleRowSelect}
              handleOnDobleClick={handleOnDobleClick}
              handleOnChange={handleOnChange}
              handleKeyPress={handleKeyPress}
            />
          </div>
          <div className="shadow bg-white rounded m-1 stockTable w-50">
            <Table
              type={"STKHIS"}
              titles={titleHis}
              items={dataHis}
              handleRowSelect={handleRowSelect}
              handleOnDobleClick={handleOnDobleClick}
              handleOnChange={handleOnChange}
              handleKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </>
    );
  }
  return content;
};

export default Stock;
