import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <p>
        Welcome to the EduPortal, a dedicated platform crafted to streamline the
        educational process for teachers and students alike. Developed using
        modern web technologies like React.js for the front-end and Node.js for
        the back-end, this portal offers a seamless and intuitive interface for
        managing student data efficiently.
      </p>
      <br />
      <p>
        Teachers can easily log in, view, edit, and manage student records,
        ensuring all information is current and precise. With features such as
        inline editing, instant updates, and easy navigation, EduPortal aims to
        reduce administrative burdens, enabling educators to concentrate more on
        teaching. Secure, scalable, and developed with best practices, EduPortal
        is your reliable partner in fostering a well-organized educational
        setting.
      </p>
      <Link style={{ textDecoration: "none" }} to="/login">
        <Button id="login-btn" className="btn" variant="contained" color="primary">
          Sign In
        </Button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/register">
        <Button id="register-btn" className="btn" variant="outlined" color="secondary">
          Sign Up
        </Button>
      </Link>
      <br />
      <div
        className="note"
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
          color: "blue",
          padding: "12px",
          border: "1px solid blue",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          width: "350px",
          margin: "20px auto",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)",
          fontFamily: "Arial, sans-serif",
          maxWidth: "600px",
          overflow: "auto",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          lineHeight: "1.6",
        }}
      >
        <p>
          <b>**Important Notice:-</b> You can test the app using the following credentials or sign up as a new user**
        </p>
        <br />
        <p>Username:{"  test"}</p>
        <p>Password:{"  test"}</p>
      </div>
    </div>
  );
};
