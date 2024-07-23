import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Admin from "../Pages/AdminDashboard/Admin";
import Home from "../Pages/Home/Home";
import UserProfile from "../Pages/UserProfile/UserProfile";
import BookList from "../Components/BookList";
import AllUsers from "../Pages/AdminDashboard/AllUsers";


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
        path: "admin",
        element: <Admin />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "allusers",
        element: <AllUsers  />,
      },
      {
        path: "bookList",
        element: <BookList />,
      },
    ],
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
