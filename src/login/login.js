import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      navigate("/home");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-danger"
      style={{ height: "100vh" }}
    >
      <form
        className="p-3 rounded-2 shadow-lg d-flex flex-column bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="fw-bolder text-center mb-3">Iniciar Sesión</h2>
        <label htmlFor="username">
          <FontAwesomeIcon
            icon={faUser}
            className="fw-bolder me-2 text-danger"
          />
          <input
            className="mb-2 border border-danger border-top-0 border-end-0 border-bottom-3 border-start-0"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ outline: "none" }}
          />
        </label>

        <label className="mt-3" htmlFor="password">
          <FontAwesomeIcon
            icon={faLock}
            className="fw-bolder me-2 text-danger"
          />
          <input
            className="mb-2 border border-danger border-top-0 border-end-0 border-bottom-3 border-start-0"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ outline: "none" }}
            maxLength="8"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="ms-2 text-danger"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          />
        </label>

        {error && <div style={{ color: "red" }}>{error}</div>}
        <button className="btn btn-danger mt-3" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
