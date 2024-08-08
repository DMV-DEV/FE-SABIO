import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Profile from "../pages/profile/Profile";
import Classes from "../pages/MyClasses/Classes";
import AIChecker from "../pages/AIChecker/AIChecker";
import Dashboard from "../pages/Dash/Dashboard";
import Chatbot from "../pages/chatbot/Chatbot";
import Authentication from "../pages/authentication/Authentication";
import ClassesDocuments from "../pages/classesDocuments/ClassesDocuments";
import StudentsList from "../pages/studentsList/StudentsList";
import Auth from "../pages/studentInterface/login/Authentication";
import ClassesStudents from "../pages/studentInterface/classes/ClassesStudents";
import PrivateRoute from "../HOC/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Classes /> },
      { path: "/documents", element: <ClassesDocuments /> },
      { path: "/accountsettings", element: <Profile /> },
      { path: "/checker", element: <AIChecker /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/students", element: <StudentsList /> },
      { path: "/chatbot", element: <Chatbot /> },

      //student interface
      { path: "/student", element: <ClassesStudents /> },
      { path: "/student/accountsettings", element: <Profile /> },
      { path: "/student/chatbot", element: <Chatbot /> },
    ],
  },
  {
    path: "/authentication",
    element: (
        <Authentication />
    ),
  },
  {
    path: "/student/authentication",
    element: <Auth />,
  },
]);
