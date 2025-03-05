import { useState, useRef } from "react";

// useRef is very similar to useState
// But useRef doesn't causes re-render
// useRef contains an object with current property
// which can be used to store the count the particular component re-rendered
// each element in react has ref property
const OTPInput = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    if (e.target.value.match(/^\d+$/)) {
      const newOtp = [...otp];
      newOtp[index] = e.target.value;
      setOtp(newOtp);

      if (index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key == "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div>
      {otp.map((_, index) => (
        <input
          value={otp[index]}
          maxLength="1"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          style={{
            margin: "5px",
            width: "50px",
            height: "50px",
            padding: "5px",
            fontSize: "40px",
            textAlign: "center",
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
