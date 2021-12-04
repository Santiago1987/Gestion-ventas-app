const useTHStyles = () => {
  return (type, column) => {
    if (type === "PRODUCTS") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "ingreso":
          return { width: "10%", textAlign: "center" };
        case "stock":
          return { width: "10%", textAlign: "center" };
        case "descr":
          return { width: "24%", textAlign: "start" };
        case "PUS":
        case "PP":
        case "PL":
        case "PML":
          return { width: "14%", textAlign: "start" };
        default:
          return null;
      }
    }
    if (type === "SALES") {
      switch (column) {
        case "id":
          return { width: "5%", textAlign: "center", display: "none" };
        case "descr":
          return { width: "44%", textAlign: "start" };
        case "precio":
        case "cant":
        case "total":
          return { width: "14%", textAlign: "center" };
        default:
          return null;
      }
    }
    if (type === "STOCK") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "descripcion":
          return { textAlign: "center", verticalAlign: "middle", width: "75%" };
        case "stock":
          return { textAlign: "center", verticalAlign: "middle", width: "25%" };
        default:
          return null;
      }
    }
    if (type === "STKHIS") {
      switch (column) {
        case "fecha":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "razon":
          return { textAlign: "center", verticalAlign: "middle", width: "50%" };
        case "variacion":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "stkFinal":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        default:
          return null;
      }
    }
    if (type === "DET_VENTAS") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "fecha":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "time":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "reference":
          return { textAlign: "center", verticalAlign: "middle", width: "30%" };
        case "totalPesos":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "totalDolares":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        default:
          return null;
      }
    }
    if (type === "DET_VENTAS_DET") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "descripcion":
          return { textAlign: "center", verticalAlign: "middle", width: "40%" };
        case "cantidad":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "precioPesos":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "precioDolar":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "total":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        default:
          return null;
      }
    }
    if (type === "SETTINGS") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "setting":
          return { textAlign: "center", verticalAlign: "middle", width: "80%" };
        case "value":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        default:
          return undefined;
      }
    }

    if (type === "CLOSER") {
      switch (column) {
        case "articulo":
          return { textAlign: "center", verticalAlign: "middle", width: "30%" };
        case "cantitdad":
          return { textAlign: "center", verticalAlign: "middle", width: "10%" };
        case "precioPesos":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "precioDolar":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "precioNerd":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        default:
          return undefined;
      }
    }
  };
};

export default useTHStyles;
