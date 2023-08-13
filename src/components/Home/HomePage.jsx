import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userDetails = useSelector((state) => state.USER_DETAILS);
  const getDetails = () => {
    console.log("userDetails", userDetails);
  };
  return (
    <div>
      <div>
        <button onClick={getDetails}>Get User Details</button>
      </div>
    </div>
  );
};

export default HomePage;
