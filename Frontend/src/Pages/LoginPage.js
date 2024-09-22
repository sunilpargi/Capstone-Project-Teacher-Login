import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State for error message

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  async function login(e) {
    e.preventDefault();
    setError(""); 

    if (username === "test" && password === "test") {
      console.log("Logging in with test credentials."); 
      setRedirect(true); 
      return;
    }

    console.log("Attempting login with username:", username); 

    try {
      const response = await fetch(
        "https://teacherportal-backend-r7my.onrender.com/login",
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      console.log("Response status:", response.status); 

      if (response.ok) {
        const userInfo = await response.json();
        console.log("Login successful:", userInfo); 
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        const errorData = await response.json();
        console.log("Login failed:", errorData);
        setError(errorData.error || "Wrong credentials");
      }
    } catch (error) {
      console.error("Login error:", error); 
      setError("Failed to connect to the server. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to={"/teacherPortalPage"} />;
  }

  return (
    <div>
      <form action="" className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          id="username"
          required
          autoFocus
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div style={{ display: "flex" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id="togglePassword" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {error}
          </div>
        )}

        <button type="submit">Login</button>
      </form>
      <div
        className="note"
        style={{
          textAlign: "center",
          fontSize: "15px",
          fontWeight: "bold",
          color: "red",
          padding: "10px",
          border: "1px solid red",
          borderRadius: "5px",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          width: "300px",
          margin: "0 auto",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          fontFamily: "sans-serif",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "500px",
          overflow: "auto",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          lineHeight: "1.5",
          textIndent: "0",
        }}
      >
        <p>
          <b>**Note:-</b> To test out the app use the following credentials or register yourself as a new user**
        </p>
        <br />
        <p>Username:{"  test"}</p>
        <p>Password:{"  test"}</p>
      </div>
    </div>
  );
};
