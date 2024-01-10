import React, { useState } from "react";

const Captcha = () => {
  const [code, setCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleRefresh = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/codes");
      const data = await response.json();
      setCode(data.code);
    } catch (error) {
      console.error("Error refreshing code:", error);
    }
  };

  const handleSubmit = async () => {
    // sending user input to the server
    try {
      const response = await fetch("http://localhost:3001/api/codes/use", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: userInput }),
      });

      const data = await response.json();
      setVerificationResult(data.message || data.error);
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div>
      {/* Code Display and Refresh Button */}
      <div className="flex  flex-col m-10">
        <div className=" mt-20 flex flex-row justify-center">
          <p>Code: {code}</p>
          <button className="ml-20 rounded-2xl" onClick={handleRefresh}>
            Refresh
          </button>
        </div>

        {/* Input Field and Submit Button */}
        <div className="flex flex-row justify-center">
          <label>
            Enter Code:
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        {/* Verification Result */}
        <div className="flex flex-row justify-center">
          {verificationResult && <p>{verificationResult}</p>}
        </div>
      </div>
    </div>
  );
};

export default Captcha;
