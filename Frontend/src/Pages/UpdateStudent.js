import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateStudent() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://teacherportal-backend-r7my.onrender.com/students/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setSubject(data.subject);
        setMarks(data.marks);
      });
  }, []);

  const updateStudent = () => {
    fetch(`https://teacherportal-backend-r7my.onrender.com/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, subject, marks }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => {
        alert("Student updated successfully");
        navigate("/teacherPortalPage");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
        navigate("/teacherPortalPage");
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Update Student</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        type="text"
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />
      <button onClick={updateStudent}>Update</button>
    </div>
  );
}
