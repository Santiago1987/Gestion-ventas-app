import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { useSelector, useDispatch } from "react-redux";
import { selectProd } from "../../actions";
import axios from "axios";

const VentasDetalles = ({ url, params }) => {
  //const [datos, setDatos] = useState([]);

  //SELECT PARA VER CUANDO SE SELECCIONAN LINEAS
  const [select, setSelect] = useState(false);

  //DETALLE DE VENTAS
  const [datVentas, setdatVentas] = useState([]);
  const [data, setData] = useState([]);
  const [datos, setDatos] = useState([]);

  const selectedProd = useSelector((state) => state.selectedProd);
  const dispatch = useDispatch();

  const {
    REACT_APP_BACKEND_URL,
    REACT_APP_ESTADISTICAS_VENTAS_DETALLE,
  } = process.env;

  useEffect(() => {
    if (url && !select) {
      getVentas(url, params);
    }

    //EVALUA SELECT PARA NO TENER QUE RECARGAR LA TABLA CADA VEZ QUE SE SELECCIONA
    if (data.length > 0 && !select) {
      setDatos(
        data
          .map((dat) => {
            let { id, fecha, time, reference, totalPesos, totalDolares } = dat;
            return { id, fecha, time, reference, totalPesos, totalDolares };
          })
          .sort((a, b) => {
            let fecha1 = parseInt(
              `${a.fecha.slice(6, 10)}${a.fecha.slice(3, 5)}${a.fecha.slice(
                0,
                2
              )}`
            );
            let fecha2 = parseInt(
              `${b.fecha.slice(6, 10)}${b.fecha.slice(3, 5)}${b.fecha.slice(
                0,
                2
              )}`
            );
            return fecha1 < fecha2;
          })
      );
    }

    let { id, table } = selectedProd;
    if (table !== "DET_VENTAS") {
      setdatVentas([]);
      return;
    }
    getDatos(id);
    setSelect(false);
  }, [selectedProd, data]);

  //VENTAS
  const getVentas = async (url, params) => {
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

  //OBTIENE LOS DETALLES DE LAS VENTAS
  const getDatos = async (id) => {
    await axios
      .get(
        `${REACT_APP_BACKEND_URL}${REACT_APP_ESTADISTICAS_VENTAS_DETALLE}${id}`
      )
      .then((res) => {
        let { data } = res;

        setdatVentas(
          data.map((dat) => {
            let {
              id,
              descripcion,
              cantidad,
              precioPesos,
              precioDolar,
              total,
            } = dat;

            return {
              id,
              descripcion,
              cantidad,
              precioPesos,
              precioDolar,
              total,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setdatVentas([]);
      });
    return;
  };

  //TITULOS DE LAS TABLAS
  let titles = {
    id: "ID",
    fecha: "Fecha",
    time: "Hora",
    reference: "Num. Referencia",
    totalPesos: "Total Pesos",
    totalDolares: "Total Dolares",
  };

  let titleDet = {
    id: "ID",
    descripcion: "Descripcion",
    cantidad: "Cantidad",
    precioPesos: "Precio Pesos",
    precioDolar: "Precio Dolar",
    total: "Total",
  };

  /*-------------------------------------------------------------------------------*/
  const handleRowSelect = (id, table) => {
    if (table !== "DET_VENTAS") return;
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
        <h3 className="p-2">Detalle de Ventas</h3>
        <div className="d-flex">
          <div className="shadow bg-white rounded m-1 stockTable w-50">
            <Table
              type={"DET_VENTAS"}
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
              type={"DET_VENTAS_DET"}
              titles={titleDet}
              items={datVentas}
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

export default VentasDetalles;
