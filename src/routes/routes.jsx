import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/shared/Login/Login";
import Register from "../Pages/shared/Register/Register";
import Admin from "../Pages/AdminDashboard/Admin";
import Home from "../Pages/Home/Home";
import UserProfile from "../Pages/shared/UserProfile/UserProfile";
import BookList from "../Components/BookList";
import AllUsers from "../Pages/AdminDashboard/AllUsers/AllUsers";
import Coaching from "../Pages/Home/LibrayCoaching/Coaching";
import AdminHome from "../Pages/AdminDashboard/AdminHome";
import BooksDetails from "../Pages/Home/Books/BooksDetails";
// import ManageClasses from "../Pages/AdminDashboard/CoachingManagement/ManageClasses/ManageClasses";
import ManageStudents from "../Pages/AdminDashboard/CoachingManagement/ManageStudent/ManageStudent";
import ManageSubjects from "../Pages/AdminDashboard/CoachingManagement/ManageSubject/ManageSubjects";
import ManageTutor from "../Pages/AdminDashboard/CoachingManagement/ManageTutor/ManageTutor";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "bookList",
        element: <BookList />,
      },
      {
        path:"book-details/:id",
        element:<BooksDetails />
      },
      {
        path:"coaching",
        element : <Coaching />
      }
    ],
  },

  {
    path:"admin",
    element:<Admin />,
    children:[
      {
        index:true,
        element:<AdminHome />
      },
    
      {
        path:"allusers",
        element:<AllUsers />
      },
      // {
      //   path:"class-management",
      //   element:<ManageClasses />
      // },
      {
        path:"student-management",
        element:<ManageStudents />
      },
      {
        path:"subject-management",
        element:<ManageSubjects />
      },
      {
        path:"tutor-management",
        element:<ManageTutor />
      }
    ]
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default routes;
