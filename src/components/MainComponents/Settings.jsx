import React, { useState } from "react";
import SettingsList from "../../containers/Settings/SettingsList";
import Btn from "../Button/Button";

const Settings = () => {
  const [enableBTN, setEnableBTN] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);

  const handleOnClickSave = () => {
    setSaveChanges(true);
    setEnableBTN(false);
  };
  const setEnable = () => {
    setEnableBTN(true);
  };

  return (
    <div className="container">
      <SettingsList
        setEnable={setEnable}
        saveChanges={saveChanges}
        setSaveChanges={setSaveChanges}
      />
      <div className="d-flex justify-content-end">
        <Btn
          title="Guardar cambios"
          onclick={handleOnClickSave}
          type="save"
          classes={
            !enableBTN
              ? "btn btn-secondary btn-lg mt-1"
              : "btn btn-dark active btn-lg mt-1"
          }
        />
      </div>
    </div>
  );
};

export default Settings;
