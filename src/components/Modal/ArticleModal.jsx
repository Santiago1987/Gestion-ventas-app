import React, { useState } from "react";

const ArticleModal = () => {
  const [Description, setDescription] = useState("");
  const [Precio, setPrecio] = useState(0);
  const [Stock, setStock] = useState(0);

  const handleOnChange = (event) => {
    if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "precio") {
      setPrecio(event.target.value);
    } else if (event.target.name === "stock") {
      setStock(event.target.value);
    }
  };

  let content = <p>Error...</p>;

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
    </form>
  );

  return content;
};

export default ArticleModal;
