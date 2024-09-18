import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <p>
        Welcome to the Tailwebs - Teacher Portal, a comprehensive platform
        designed to streamline and enhance the educational experience for both
        teachers and students. Built with modern web technologies such as
        React.js for the front-end and Node.js for the back-end, our portal
        provides a robust and user-friendly interface for managing student
        information.
      </p>
      <br />
      <p>
        Teachers can effortlessly log in, view, edit, and manage student
        records, ensuring that every detail is up-to-date and accurate. With
        features like inline editing, real-time updates, and intuitive
        navigation, our portal aims to simplify administrative tasks, allowing
        educators to focus more on teaching and less on paperwork. Secure,
        scalable, and built with best practices in mind, the Teacher Portal is
        your reliable partner in fostering an efficient and organized
        educational environment.
      </p>
      <Link style={{ textDecoration: "none" }} to="/login">
        <Button id="login-btn" className="btn" variant="contained">
          Login
        </Button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/register">
        <Button id="register-btn" className="btn" variant="outlined">
          Register
        </Button>
      </Link>
      <br />
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
