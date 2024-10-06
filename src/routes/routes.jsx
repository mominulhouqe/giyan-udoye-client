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
import ManageStudents from "../Pages/AdminDashboard/CoachingManagement/ManageStudent/ManageStudent";
import ManageSubjects from "../Pages/AdminDashboard/CoachingManagement/ManageSubject/ManageSubjects";
import ManageTutor from "../Pages/AdminDashboard/CoachingManagement/ManageTutor/ManageTutor";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LibraryMemberList from "../Pages/AdminDashboard/LibraryManagement/LibraryMemberList";
import PaymentManagement from "../Pages/AdminDashboard/LibraryManagement/PaymentManagement";
import ReportView from "../Pages/AdminDashboard/LibraryManagement/ReportView";
import ErrorPage from "../Pages/shared/ErrorMassage/ErrorPage";
import BlogsPage from "../Pages/AdminDashboard/MainHomePage/BlogsPage";
import QuotesPage from "../Pages/AdminDashboard/MainHomePage/QuotesPage";
import BlogsAll from "../Pages/Home/Blogs/BlogsAll";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        element: (
          <AuthenticatedRoute>
            <BookList />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "book-details/:id",
        element: <BooksDetails />,
      },
      {
        path: "coaching",
        element: <Coaching />,
      },
      {
        path: "blogs",
        element: <BlogsAll />,
      },
    ],
  },

  {
    path: "admin",
    element: (
      <AuthenticatedRoute>
        <Admin />
      </AuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
      },

      {
        path: "allusers",
        element: <AllUsers />,
      },
      // For homepage
      {
        path: "blogs",
        element: <BlogsPage />,
      },

      {
        path: "quotes",
        element: <QuotesPage />,
      },
      // For Library management
      {
        path: "Library-member",
        element: <LibraryMemberList />,
      },
      {
        path: "payment-member",
        element: <PaymentManagement />,
      },
      {
        path: "payment-report",
        element: <ReportView />,
      },
      // {
      //   path:"class-management",
      //   element:<ManageClasses />
      // },

      // For coaching center
      {
        path: "student-management",
        element: <ManageStudents />,
      },
      {
        path: "subject-management",
        element: <ManageSubjects />,
      },
      {
        path: "tutor-management",
        element: <ManageTutor />,
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
