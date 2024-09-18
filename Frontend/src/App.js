import "./App.css";
import { Loginpage } from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { Layout } from "./Components/Layout";
import { UserContextProvider } from "./Context/UserContext";
import { RegisterPage } from "./Pages/RegisterPage";
import { TeacherPortalPage } from "./Pages/TeacherPortalPage";
import DeleteStudent from "./Pages/DeleteStudent";
import UpdateStudent from "./Pages/UpdateStudent";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={"/login"} element={<Loginpage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/teacherPortalPage"} element={<TeacherPortalPage />} />
          <Route path={"/logout"} element={<HomePage />} />
          <Route path="/students/delete/:id" element={<DeleteStudent />} />
          <Route path="/students/edit/:id" element={<UpdateStudent />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
