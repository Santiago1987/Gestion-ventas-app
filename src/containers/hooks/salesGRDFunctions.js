import { useDispatch, useSelector } from "react-redux";
import { selectProd, updateSalesProduct } from "../../actions";

const useSalesGRDFunctions = () => {
  // List of products in sales grid
  const salesProducts = useSelector((state) => state.salesProducts);

  const dispatch = useDispatch();

  const handleRowSelect = (id, table) => {
    dispatch(selectProd({ id, table }));
  };

  // Function not used in sales grid
  const handleOnDobleClick = () => {};

  const handleOnChange = (e) => {
    let { value, id } = e.target;
    let regex = new RegExp("^([0-9])*$");

    if (value.length > 5 || !regex.test(value)) return;
    let product = salesProducts.find((pr) => pr.id === id);
    product.cant = value;

    dispatch(updateSalesProduct(product));
  };

  const handleKeyPress = () => null;

  return [handleRowSelect, handleOnDobleClick, handleOnChange, handleKeyPress];
};

export default useSalesGRDFunctions;
