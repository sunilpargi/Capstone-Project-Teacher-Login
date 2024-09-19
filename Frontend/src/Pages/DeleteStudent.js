import { useNavigate, useParams } from "react-router-dom";

export default function DeleteStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteStudent = async () => {
    fetch(`https://teacherportal-backend-r7my.onrender.com/students/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Student deleted successfully");
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
      <h1>Delete Student</h1>
      <p>Are you sure you want to delete this student?</p>
      <button onClick={deleteStudent}>Yes, Delete</button>
    </div>
  );
}
