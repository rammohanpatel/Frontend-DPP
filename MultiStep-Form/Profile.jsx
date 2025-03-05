import React, { useState } from "react";

export default Profile = ({ data, updatedValue }) => {
  //console.log(data);
  const [profile, setProfile] = useState(data.profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedProfile = { ...profile, [name]: value };
    setProfile(updatedProfile);
    updatedValue(updatedProfile);
  };

  return (
    <div className="profile">
      <div className="profile-label">
        <label htmlFor="" name="name">
          Name :{" "}
        </label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>

      <div className="profile-label">
        <label htmlFor="" name="age">
          Age :{" "}
        </label>
        <input
          type="number"
          name="age"
          value={profile.age}
          onChange={handleChange}
        />
      </div>

      <div className="profile-label">
        <label htmlFor="" name="email">
          Email :{" "}
        </label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
