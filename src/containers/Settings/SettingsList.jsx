import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http";
import Table from "../../components/Table/Table";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSettings } from "../../actions";

const SettingsList = ({ setEnable, saveChanges, setSaveChanges }) => {
  const [list, setList] = useState({});
  const [refresh, setRefresh] = useState(false);

  const { REACT_APP_BACKEND_URL, REACT_APP_SETTINGS, REACT_APP_SETTINGS_SAVE } =
    process.env;

  const [isLoadding, response] = useHttp(
    `${REACT_APP_BACKEND_URL}${REACT_APP_SETTINGS}`,
    [refresh],
    "GET"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (response !== null) {
      let { data } = response;

      setList(data);
    }

    if (saveChanges) saveSettings();
  }, [isLoadding, saveChanges]);

  //--------------------------------------------------------------------------------
  const handleRowSelect = () => {};
  const handleOnDobleClick = () => {};
  const handleKeyPress = () => {};

  const handleOnChange = (e) => {
    let { value, id } = e.target;

    let regex = new RegExp("^([0-9])*$");
    if (value.length > 5 || !regex.test(value)) return;

    let set = {};
    set[id] = value;
    setList({ ...list, ...set });
    setEnable();
  };

  const saveSettings = async () => {
    await axios
      .post(`${REACT_APP_BACKEND_URL}${REACT_APP_SETTINGS_SAVE}`, { ...list })
      .then((res) => {
        let { data } = res;
        dispatch(setSettings(data));
        setList({ ...list, ...data });
        setSaveChanges(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  //--------------------------------------------------------------------------------

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
    id: "id",
    setting: "Name",
    value: "Value",
  };

  let items = [];

  if (list !== {}) {
    let names = Object.keys(list);
    let values = Object.values(list);
    let cont = -1;
    names.map((name) => {
      cont++;
      let title = "";
      if (name === "dolar") title = "Dolar de Referencia";
      else if (name === "porcLocal") title = "Porcentaje de aumento local";
      else if (name === "porcNerd") title = "Porcentaje del nerd";
      else title = "Porcentaje de aumento Mercado Libre";

      items.push({ id: name, name: title, value: values[cont] });
    });

    content = (
      <Table
        type="SETTINGS"
        items={items}
        handleRowSelect={handleRowSelect}
        handleOnDobleClick={handleOnDobleClick}
        handleKeyPress={handleKeyPress}
        handleOnChange={handleOnChange}
      />
    );
  }

  return (
    <div className="shadow bg-white rounded m-1">
      <Table type="SETTINGS" titles={titles} />
      <div className="shadow bg-white rounded">{content}</div>
    </div>
  );
};

export default SettingsList;
