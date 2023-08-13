import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { userDetails } from "../../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
const Login = () => {
  const initialState = {
    email: "",
    token: "",
  };

  const [mail, setMail] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const reduxDispatch = useDispatch();

  const setEmail = () => {
    let payload = {
      email: mail,
      token: "eYnuciegfufheowforhedboij9ey8ry38fdgcufr9ycedhchd",
    };

    dispatch({
      type: "Login",
      payload: payload,
    });

    reduxDispatch(userDetails(payload));
  };
  return (
    <div>
      <div>
        <input
          type="email"
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <button onClick={setEmail}>Login</button>
        <h2>{state.email}</h2>
      </div>
    </div>
  );
};

export default Login;
