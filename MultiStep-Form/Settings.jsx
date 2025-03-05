import React, { useState } from "react";

export default Settings = ({ data, updatedValue }) => {
  const [settings, setSettings] = useState(data.Settings);
  console.log(settings);

  const handleChange = (e) => {
    const updatedSetting = e.target.value;

    const newSetting = settings === updatedSetting ? "" : updatedSetting;
    setSettings(newSetting);
    updatedValue(newSetting);
  };
  return (
    <div>
      <input
        type="radio"
        name="light"
        value="light"
        onChange={handleChange}
        checked={settings === "light"}
      />
      <label>Light </label>
      <input
        type="radio"
        name="dark"
        value="dark"
        onChange={handleChange}
        checked={settings === "dark"}
      />
      <label>Dark </label>
    </div>
  );
};
