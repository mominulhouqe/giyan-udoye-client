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
