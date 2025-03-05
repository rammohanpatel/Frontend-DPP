import React, { useState } from "react";

import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";

export default TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);

  const data = {
    profile: {
      name: "Ram",
      age: 21,
      email: "mram41614@gmail.com",
    },
    Interests: [],
    Settings: "",
  };

  const [info, setInfo] = useState(data);
  const handleDataUpdate = (key, updatedValue) => {
    setInfo((prev) => ({ ...info, [key]: updatedValue }));
  };

  const tabs = [
    {
      name: "Profile",
      component: (
        <Profile
          data={info}
          updatedValue={(value) => handleDataUpdate("profile", value)}
        />
      ),
    },
    {
      name: "Interests",
      component: (
        <Interests
          data={info}
          updatedValue={(value) => handleDataUpdate("Interests", value)}
        />
      ),
    },
    {
      name: "Settings",
      component: (
        <Settings
          data={info}
          updatedValue={(value) => handleDataUpdate("Settings", value)}
        />
      ),
    },
  ];

  console.log(info);

  const handleSubmit = () => {
    console.log("Data Submitted : ", info);
  };

  return (
    <div className="container">
      <div className="tabs">
        {tabs.map((item, index) => (
          <div key={index} className="activeTab">
            <button onClick={() => setActiveTab(index)}>{item.name}</button>
          </div>
        ))}
      </div>

      <div>{tabs[activeTab].component}</div>
      {activeTab == tabs.length - 1 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};
