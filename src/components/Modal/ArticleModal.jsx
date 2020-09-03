import React, { useState } from "react";
import { useSelector } from "react-redux";

const ArticleModal = ({ btnType, gridType, handleOnSubmit }) => {
  const [Description, setDescription] = useState("");
  const [Precio, setPrecio] = useState(0);
  const [Stock, setStock] = useState(0);
  const [article, setArticle] = useState({});

  const selectedProd = useSelector((state) => state.selectedProd);
  const Products = useSelector((state) => state.Products);

  const handleOnChange = (event) => {
    if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "precio") {
      setPrecio(event.target.value);
    } else if (event.target.name === "stock") {
      setStock(event.target.value);
    }
  };

  if (selectedProd.id !== "") {
    let prod = Products.find((p) => p.id === selectedProd.id);
    if (prod.id !== null) {
      setArticle(prod);
      let { descripcion, precio, stock } = prod;
      setPrecio(precio);
      setDescription(descripcion);
      setStock(stock);
    }
  }

  let content = <p>Error...</p>;

  if (gridType === "PRODUCTS") {
    content = (
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
        <button className="btn btn-dark m-2" onClick={() => handleOnSubmit()}>
          {btnType === "new" ? "Crear" : "Modificar"}
        </button>
      </form>
    );
  }
  return content;
};

export default ArticleModal;
