const useTDStyles = () => {
  return (table, column) => {
    if (table === "PRODUCTS") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "ingreso":
          return { width: "10%", textAlign: "center", verticalAlign: "middle" };
        case "stock":
          return { width: "10%", textAlign: "center", verticalAlign: "middle" };
        case "descr":
          return {
            width: "24%",
            textAlign: "start",
            verticalAlign: "middle",
            fontWeight: "bold",
          };
        case "PUS":
        case "PP":
        case "PL":
        case "PML":
          return { width: "14%", textAlign: "right", verticalAlign: "middle" };
        default:
          return undefined;
      }
    }
    if (table === "SALES") {
      switch (column) {
        case "id":
          return {
            width: "5%",
            textAlign: "center",
            display: "none",
            verticalAlign: "middle",
          };
        case "descr":
          return { width: "44%", textAlign: "start", verticalAlign: "middle" };
        case "precio":
        case "cant":
        case "total":
          return { width: "14%", textAlign: "center", verticalAlign: "middle" };
        default:
          return undefined;
      }
    }
    if (table === "ESTVENTAS") {
      switch (column) {
        case "fecha":
          return { textAlign: "center" };
        case "totalPesos":
          return { textAlign: "center" };
        case "totalDolares":
          return { textAlign: "center" };
        default:
          return undefined;
      }
    }
    if (table === "STOCK") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "descripcion":
          return { textAlign: "left", verticalAlign: "middle", width: "75%" };
        case "stock":
          return { textAlign: "center", verticalAlign: "middle", width: "25%" };
        default:
          return undefined;
      }
    }
    if (table === "STKHIS") {
      switch (column) {
        case "fecha":
          return { textAlign: "center", verticalAlign: "middle", width: "20%" };
        case "motivo":
          return { textAlign: "left", verticalAlign: "middle", width: "50%" };
        case "cant":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "stkfin":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        default:
          return undefined;
      }
    }
    if (table === "DET_VENTAS") {
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
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        case "totalDolares":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        default:
          return undefined;
      }
    }
    if (table === "DET_VENTAS_DET") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "descripcion":
          return { textAlign: "left", verticalAlign: "middle", width: "40%" };
        case "cantidad":
          return { textAlign: "center", verticalAlign: "middle", width: "15%" };
        case "precioPesos":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        case "precioDolar":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        case "total":
          return { textAlign: "right", verticalAlign: "middle", width: "15%" };
        default:
          return undefined;
      }
    }
    if (table === "SETTINGS") {
      switch (column) {
        case "id":
          return { display: "none" };
        case "setting":
          return {
            textAlign: "left",
            verticalAlign: "middle",
            width: "80%",
            fontWeight: "bold",
          };
        case "value":
          return {
            textAlign: "center",
            verticalAlign: "middle",
            width: "20%",
            fontWeight: "bold",
          };
        default:
          return undefined;
      }
    }

    if (table === "CLOSER") {
      switch (column) {
        case "articulo":
          return {
            textAlign: "left",
            verticalAlign: "middle",
            width: "30%",
            fontWeight: "bold",
          };
        case "cantidad":
          return {
            textAlign: "center",
            verticalAlign: "middle",
            width: "10%",
            fontWeight: "bold",
          };
        case "precioPesos":
          return {
            textAlign: "center",
            verticalAlign: "middle",
            width: "20%",
            fontWeight: "bold",
          };
        case "precioDolar":
          return {
            textAlign: "center",
            verticalAlign: "middle",
            width: "20%",
            fontWeight: "bold",
          };
        case "precioNerd":
          return {
            textAlign: "center",
            verticalAlign: "middle",
            width: "20%",
            fontWeight: "bold",
            backgroundColor: "Cyan",
          };
        default:
          return undefined;
      }
    }
    return undefined;
  };
};

export default useTDStyles;
