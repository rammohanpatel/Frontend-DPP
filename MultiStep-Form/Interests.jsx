import React, { useState } from "react";

export default Interests = ({ data, updatedValue }) => {
  const [interests, setInterests] = useState(data.Interests);

  const handleChange = (e) => {
    const { value } = e.target;

    const updatedInterests = interests.includes(value)
      ? interests.filter((interest) => interest !== value)
      : [...interests, value];

    setInterests(updatedInterests);
    updatedValue(updatedInterests);
  };

  return (
    <div className="Interests">
      <input
        type="checkbox"
        name="Coding"
        value="Coding"
        onChange={handleChange}
        checked={interests.includes("Coding")}
      />
      <label>Coding </label>
      <input
        type="checkbox"
        name="Reading"
        value="Reading"
        onChange={handleChange}
        checked={interests.includes("Reading")}
      />
      <label>Reading </label>
      <input
        type="checkbox"
        name="Music"
        value="Music"
        onChange={handleChange}
        checked={interests.includes("Music")}
      />
      <label>Music </label>
    </div>
  );
};
