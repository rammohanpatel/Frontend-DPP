// https://www.greatfrontend.com/questions/user-interface/like-button?language=js&tab=coding

import { HeartIcon, SpinnerIcon } from "./icons";
import React, { useState } from "react";

export default function App() {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);

  const postReqForLike = async () => {
    try {
      const currState = liked === true ? "unlike" : "like";
      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: currState }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(
         data.message
        );
      }
      
      if (data.message == "Success!") {
        setLiked(!liked);
        setLoading(false);
        setError("");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleClick = () => {
    setLoading(true);
    postReqForLike();
  };

  return (
    <div>
      <button
        disable = {loading}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          padding: "5px",
          border: `4px solid ${hover || liked ? "red" : "#888"}`,
          borderRadius: "9px",
          backgroundColor: liked ? "red" : "#fff",
        }}
        onClick={handleClick}
      >
        {loading ? <SpinnerIcon /> : <HeartIcon />} Like

      </button>
      {error.length > 0 && <>{error}</>}
    </div>
  );
}
