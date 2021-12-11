import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ArticleModal = ({ btnType, handleOnSubmit, handleOnCancel }) => {
  const [Description, setDescription] = useState("");
  const [Precio, setPrecio] = useState(0);
  const [Stock, setStock] = useState(0);
  const [Ingreso, setIngreso] = useState(0);
  //const [article, setArticle] = useState({});

  const selectedProd = useSelector((state) => state.selectedProd);
  const Products = useSelector((state) => state.Products);

  useEffect(() => {
    if (selectedProd.id !== {} && btnType === "update") {
      let prod = Products.find((p) => p.id === selectedProd.id);
      if (prod !== undefined) {
        //setArticle(prod);
        let { descripcion, prDolar, stock, ingreso } = prod;
        setPrecio(prDolar);
        setDescription(descripcion);
        setStock(stock);
        setIngreso(ingreso);
      }
    }
  }, []);

  const handleOnChange = (event) => {
    if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "precio") {
      setPrecio(event.target.value);
    } else if (event.target.name === "stock") {
      if (btnType === "new") setStock(event.target.value);
      return;
    }
  };

  let content = <p>Error...</p>;

  btnType === "new" || btnType === "update"
    ? (content = (
        <form>
          <h2>Nuevo articulo</h2>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={Description}
              onChange={handleOnChange}
              className="form-control"
              id="description"
            />
          </div>
          <div className="form-group">
            <label>Precio en dolares</label>
            <input
              type="number"
              name="precio"
              value={Precio}
              className="form-control"
              onChange={handleOnChange}
              id="precio"
            />
          </div>
          <div className="form-group">
            <label>Stock inicial</label>
            <input
              type="number"
              name="stock"
              value={Stock}
              className="form-control"
              onChange={handleOnChange}
              id="stock"
            />
          </div>
          <div className="d-flex flex-md-row justify-content-around">
            <button
              type="button"
              className="btn btn-success w-50 m-2"
              onClick={() =>
                handleOnSubmit(btnType, {
                  id: selectedProd.id,
                  descripcion: Description,
                  prDolar: Precio,
                  stock: Stock,
                  ingreso: Ingreso,
                })
              }
            >
              {btnType === "new" ? "Crear" : "Modificar"}
            </button>
            <button
              type="button"
              className="btn btn-danger w-50 m-2"
              onClick={() => handleOnCancel(btnType, { id: selectedProd.id })}
            >
              Cancelar
            </button>
          </div>
        </form>
      ))
    : (content = (
        <div>
          <h3>Esta seguro de querer borrar el producto?</h3>
          <div className="d-flex flex-md-row justify-content-around">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleOnSubmit(btnType, { id: selectedProd.id })}
            >
              Continuar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleOnCancel()}
            >
              Cancelar
            </button>
          </div>
        </div>
      ));

  return content;
};

export default React.memo(ArticleModal);
